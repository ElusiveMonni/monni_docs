# GDPR compliance plan

Internal planning document. Lives at the repo root so Docusaurus does not publish it
(`docs/` is the only built content root, see `docusaurus.config.js` `routeBasePath: '/'`).

Covers `monni_bot`, `monni_api`, `monni-tools`, `monni-website-frontend`,
`monni_external_api` and the public policy pages.

**Revision 3 — 28 Sep 2026.** Verified against `monni_bot@f6082f3`, `monni_api@eb53d31`,
`monni-tools@378bfe5`, `monni-website-frontend@efb0f63` and the production schema dump.
Revision 3 replaces the naive offboarding design in §3 with an observation-based one, adds
multi-bot tenancy as a second blocking decision, and adds the findings the schema exposed.
See §2.5 for the running delta.

---

## 1. Two decisions block the design

### 1.1 Controllership

Nothing else can be designed until this is settled, because it decides what a deletion
request is even allowed to delete.

Monni is a multi-tenant Discord bot. Three distinct relationships exist, with different
lawful bases and different rights obligations:

| Relationship | Data | Who is controller | What that means |
| --- | --- | --- | --- |
| **Monni ↔ end user** | `users` (incl. `email`), `discord_mappings`, `roblox_mappings`, `identity_account`, `identity_token`, `oauth2_login_token`, `jwt_refresh_token`, `user_2fa`, `paddle_customers`, `product_subscription`, `reminders`, `user_tags`, `user_localisation`, `command_argument_history` | **Monni, sole controller** | Full Art. 15–21 rights land on us. We can and must action them ourselves. |
| **Guild ↔ its members, Monni processing on the guild's behalf** | `moderation_cases` (+ cascaded `case_events`, `case_attachments`, `moderation_warns`), `moderation_mute_state`, `moderation_expirations`, `discord_user_points`, `point_system_history`, `user_inventory`, `transaction_history`, `guild_verification`, `guild_invites`, `member_invites`, `sticky_roles`, `first_interaction_claims`, logging output | **Guild is controller, Monni is processor** | We cannot unilaterally erase a guild's moderation record on a member's request. We must route the request to the guild and support it with tooling (Art. 28(3)(e)). |
| **Cross-guild sharing** (`guild_verification_passport`, `identity_ban_propagation`, `guild_identity_ban`, `cross_guild_moderation`, `cross_guild_connections`, `cross_guild_role_sync`) | Verification status and ban records crossing between independent guilds | **Ambiguous today — the largest legal exposure** | Guild A's ban causing an automatic ban in Guild B is a disclosure to a third-party controller. Needs an explicit basis, a disclosure record, and member-facing transparency. |

**Recommendation:** adopt the processor model for guild-scoped data, publish a Data
Processing Addendum, and have guild owners accept it when they add the bot. It is the only
defensible reading — the guild decides purposes and means of moderation, we supply the
tool — and it makes erasure tractable: user-scoped data we delete, guild-scoped data we
surface to the guild and delete on their instruction or on confirmed offboarding. Without a
DPA, Art. 28(3) is breached for every EU guild regardless of how good the code is.

### 1.2 Multi-bot tenancy — this one breaks the offboarding design

Branded builds of the bot run against **the same database** with a different
`application_id` (`src/monni/config.py:16`, set per deployment from env;
`standalone-compose.yml:53,68`). That creates a problem the schema cannot currently express:

**`growth_history.bot_id` is the only bot-scoped column in the entire schema.** Every other
guild table keys on `guild_id` alone. So if Bot A and Bot B share a database and both are
in guild G:

- G removes Bot A only → deleting "guild G's data" destroys Bot B's configuration.
- G removes Bot A and we skip deletion → data survives for a bot that is gone.
- There is no way to tell which rows belong to which bot, because the rows do not say.

Three resolutions, and this is a product decision, not just a technical one:

| | Approach | Cost | When it is right |
| --- | --- | --- | --- |
| **(a)** | Guild config is **shared** across all bots on one database. Offboarding triggers only when the *last* non-retired bot leaves. | Low — presence tracking keyed by bot, no change to existing tables | Same operator running multiple front-ends: one controller, so no isolation requirement |
| **(b)** | Each bot is a **separate tenant**: add `bot_id` to every guild-scoped table, backfill, change every query. | Very high — multi-month migration across ~40 tables | Only if a branded customer's guild config must be invisible to the main bot |
| **(c)** | Branded bots get their **own database**. `standalone-compose.yml` already provisions its own postgres and redis. | Already built | Third-party branded deployments |

**Recommendation: (a) for shared-database deployments, and formalise (c) as the answer for
third-party branded bots.** (a) is cheap and safe, and the shared-database case is genuinely
"one operator, several front-ends" — a single controller, so the isolation (b) buys is not
required. (b) would be a very large migration for a guarantee the schema was never designed
to give.

Two consequences of choosing (a) that must not be skipped:

- **A bot registry with explicit retirement is mandatory.** Under (a) the deletion test is
  "no non-retired bot is present in this guild". If Bot B is decommissioned and never
  returns, every guild it was in looks permanently occupied and *nothing is ever deleted* —
  silently reverting to today's behaviour, which is the exact failure being fixed. A
  `bot_registry` row with `retired_at` is what stops that.
- **The DPA and privacy policy must say the configuration is shared.** A guild owner who
  removes one Monni-family bot while keeping another reasonably believes they withdrew that
  bot's data. Under (a) they did not, and that has to be written down.

One operational hazard: `application_id` is a hand-set env var. A branded deployment with a
misconfigured value would write presence under another bot's identity and corrupt its
tracking. Record both `bot.user.id` (observed from Discord) and `config.application_id`
(configured), treat the observed one as authoritative, and alert on any mismatch.

---

## 2. Current state

### 2.1 What is already right

Worth stating so it does not get refactored away:

- **Pseudonymisation of analytics is real and deliberate.** `monni_tools/id_utils.py`
  mints a `usr_`-prefixed nanoid per person; `discord_mappings` is the only bridge back to
  the Discord ID. Almost every `posthog.capture` passes `monni_id` as `distinct_id`.
- **User free text is encrypted at rest** — reminders
  (`modules/user_commands/reminder.py:147`) and tags (`tag.py:55`, `:203`) both run through
  `monni_tools.crypto`. (But see G19: one path bypasses this entirely.)
- **2FA secrets are handled correctly** — `routers/security.py:109` encrypts the TOTP
  secret and stores only a `hash_data` digest of the backup code. `connector.secret_hash`
  is likewise hashed.
- **Unlinking already implements anonymise-don't-delete, correctly.**
  `routers/verify.py:328-377` deletes `identity_token` and every `guild_verification` row,
  then deletes `identity_account` **only if** no `guild_identity_ban` references it;
  otherwise it nulls `username`, `avatar_url` and `metadata`, sets `revoked_at`, and keeps
  the bare external id so unlinking cannot clear a ban. This is the pattern §3 generalises,
  and it should be the cited template rather than something reinvented.
- **The schema's FK cascades do much of the erasure work already.** `moderation_cases` →
  `case_attachments`, `case_events`, `moderation_warns`; `identity_account` →
  `identity_token`, `guild_identity_ban`, `identity_ban_propagation`, `guild_verification`;
  `logging_settings` → `logging_categories`, `logging_ignores`, `logging_types`;
  `guild_verification_settings` → `guild_verification_passport`,
  `guild_verification_provider`. The registry in §3.3 should lean on these, not duplicate
  them.
- **Migration tooling exists.** `standalone-compose.yml:34-36` runs a `schema_manager`
  service from `ElusiveMonni/schema_manager`. Revision 1 of this document wrongly claimed
  there was none. It does mean the registry's CI guard has something to reflect against.
- **Web analytics are genuinely consent-gated.** `opt_out_capturing_by_default`
  (`+layout.ts:60`), opted in only after the Zaraz consent cookie is read
  (`+layout.svelte:38-103`).
- **Message content logging is opt-in per guild** — gated at `message.py:108`, `:174`,
  `:241`, `:307`, with `Phrase.CONTENT_HIDDEN` substituted otherwise. Logs go to a Discord
  webhook rather than into our database.
- **Support-server analytics deliberately exclude content**, with a comment saying why.
- **Anonymous invite clicks are handled well** — `routers/invite.py:94-95` uses a throwaway
  UUID with `$process_person_profile: False`, no IP, 1h Redis TTL.
- **The Discord webhook receiver verifies signatures first** (`discord_events.py:39-45`).
- **Phantom removals are already understood.** `bot_leave_join.py:34-36` guards on
  `guild.unavailable` and names the problem in a comment. §3.1 builds on that instinct.
- **`bot_errors` already has `created_at`.** Revision 1 proposed adding it; only the purge
  job is missing.

### 2.2 Gaps, ranked

#### P0 — legal exposure, fix first

**G1. No data subject request mechanism exists anywhere in the codebase.**
`app/main.py:105-132` mounts nine routers; none is a privacy router. The frontend has
`settings/{accounts,billing,localisation,security}` and no data route. No bot command, no
staff tooling. The policy promises Art. 15/16/17/18/20 rights and the only implementation is
an email address. The promise is made, the capability is absent, and the one-month
Art. 12(3) deadline is unenforceable by hand at current scale.

**G2. The stated retention policy is not implemented.**
The policy says *"we will delete/anonymize your data within 30 days for guilds and 3 months
for users"*. Nothing implements this. Three `on_guild_remove` listeners exist —
`prometheus.py:235` (gauge), `posthog_statistics.py:41` (analytics),
`bot_leave_join.py:32` (counter) — and none touches guild data. The one `DELETE` that looks
like cleanup, `monni/invites.py:32`, is a cache refresh inside `snapshot()`. **No guild data
is ever deleted or scheduled for deletion.** Every guild that ever removed Monni still has
its moderation cases, points, verification records and invite history in production. A
published retention promise that is not kept is an Art. 5(1)(e) breach with our own
documentation as the evidence.

There is no `guilds` table anywhere in the schema, so there is no single row to cascade
from — offboarding has to enumerate roughly forty tables. That makes the registry in §3.3
necessary rather than merely tidy.

**G19. `command_argument_history` stores moderation reasons in plaintext, forever, with no
guild scope.** *(new — arguably the worst finding in this revision)*
`PastInputSuggest` (`monni/utils/transformers.py:212-236`) fires
`log_new_command_argument` on every transform, writing the raw argument to
`command_argument_history(user_id, command, value)` — plaintext, no `guild_id`, no
`created_at`-based pruning, no bound on row count. It is wired to the `reason` parameter of
**eight moderation commands** (`modules/moderation/moderation.py:2087` through `:2254`).
Three separate problems:

- **It defeats the encryption elsewhere.** Tags and reminders are carefully encrypted, then
  the same text is written here in the clear by the autocomplete path.
- **Moderation reasons describe third parties.** "alt of kestrel.9, ban evading" is personal
  data about the *target*, stored globally against the *moderator*, with no link to the
  case or guild it belongs to.
- **It leaks across controller boundaries.** `command_argument_history(user_id, name)` keys
  on user and command name only, so a moderator active in guilds A and B is offered guild
  A's reasons as autocomplete suggestions while moderating in guild B. Under the processor
  model that is a disclosure of one controller's data into another's interface.

Fix: scope the table by guild, add `created_at`-based retention, encrypt `value`, and
exclude free-text `reason` fields from suggestion history altogether — or make it opt-in per
guild. The autocomplete convenience does not justify any of the three.

**G3. The privacy policy names the wrong sub-processors.**
Unchanged, including through the 145d82b copy-edit. `privacy/+page.svx:63-65` still lists
**Microsoft Clarity** and **Stripe**. The code uses **PostHog** and **Paddle**. **Sentry**
(`monni_api/app/main.py:51`, `monni_bot/src/main.py:119`) is not disclosed at all.
Cloudflare and Discord are correct. Art. 13(1)(e) requires accurate recipient categories;
three of five are wrong.

**G4. `send_default_pii=True` on both Sentry SDKs, with 100% sampling.**
`monni_api/app/main.py:53` and `monni_bot/src/main.py:123`, plus
`traces_sample_rate=1.0` and `profile_session_sample_rate=1.0` at `main.py:55-56`. Ships
request headers, cookies, IPs and usernames on every event and transaction. Three
reinforcing leaks sit alongside it:

- `bot_errors` stores `traceback.format_exc()` verbatim and unbounded
  (`error_handler.py:141`, `:214`).
- `posthog.capture_exception` sends `short_error: str(error)` (`error_handler.py:178`,
  `:187`), which routinely embeds the argument the user typed.
- `enable_logs=True` (`main.py:54`) forwards application logs too.

**G5. Discord OAuth tokens are stored in plaintext.**
`oauth2_login_token.access_token` and `.refresh_token` are plain `text` columns, written at
`dependencies.py:257`, read at `:226`, `:316`, `:491`. The codebase knows — `verify.py:651`
carries the comment *"Encrypted at rest (monni_tools.crypto), rather than the plaintext the
current oauth2_login_token table keeps."* `identity_token` **is** encrypted
(`verify.py:660-661`), so the primitive and the pattern are both in place; only this path
was left behind. Art. 32(1)(a) names encryption explicitly.

#### P1 — important, fix in the same cycle

**G6. Cross-guild ban propagation has no transparency layer.**
`monni/verification_bans.py` bans a member in Guild B because a linked third-party account
was banned in Guild A. `identity_ban_propagation` is a good audit trail — its own table
comment says so — but the member is never told a ban followed them, which server caused it,
or how to contest it.

**G15. The invite attribution subsystem rests on a premise that does not hold.**
`routers/invite.py` states the goal: *"campaign tracking that does not rely on cookies
consent."* The anonymous path is genuinely good (§2.1). Two things need fixing:

- **Reading an essential cookie for a marketing purpose still needs consent.**
  `_logged_in_user` (`invite.py:51-66`) reads the `jwt_token` login cookie to attribute a
  click. ePrivacy Art. 5(3) attaches to the *access, judged by purpose*, not to what the
  cookie was originally set for. Attribution is not strictly necessary to serve the
  redirect, so the exemption does not reach it. The cookieless design is sound; the
  "therefore no consent needed" conclusion is the error.
- **Expiry is ignored on purpose.** `invite.py:61` passes `verify_exp: False`, documented as
  deliberate. A cookie that expired months ago still identifies a person for marketing.
  Either re-verify and accept the lost joins, or bound the window explicitly and document
  the basis.

**G7. Two `posthog.capture` calls still leak raw Discord IDs.**
`verification_bans.py:173` and `:225` pass `distinct_id=str(member.id)`. Still the only two
places in the bot, and still on ban-evasion events — the most sensitive category in the
product.

**G18. Four `distinct_id` conventions now coexist** — `monni_id`, `"guild_group_event"`,
`f"guild_{id}"` (`misc.py:215`), `f"invite_{uuid4()}"` (`invite.py:94`). Each is defensible
alone. Collectively they block Art. 17 inside PostHog: erasure requires enumerating one
person's ids, which is only possible if person-linked ones are distinguishable by
construction.

**G20. Departed-member data persists with no cleanup path.** *(new)*
`sticky_roles(guild_id, member_id, roles)` exists specifically to survive a member leaving,
and is only deleted when the roles are restored (`roles.py:60`). A member who leaves and
never returns keeps a row indefinitely. `member_invites(guild_id, member_id, inviter_id)` is
a who-invited-whom social graph with the same shape (`invites.py:133`).
`first_interaction_claims` and `transaction_history` are both unbounded, and
`transaction_history` has no primary key at all.

**G8. No RoPA (Art. 30), no DPA, no breach runbook.**
Art. 30 applies once processing is non-occasional, which this is. The RoPA must now also
cover `invite.py` and `discord_events.py`.

**G9. Several tables have no retention.** `bot_errors` (has `created_at`, no purge),
`growth_history`, `identity_ban_propagation`, `command_argument_history`,
`point_system_history`, `transaction_history`, `first_interaction_claims`.

#### P2 — correctness and polish

- **G21 (new).** `api_keys.api_key` appears to be stored raw while `connector.secret_hash`
  is hashed. Inconsistent; the hashed pattern is the right one.
- **G22 (new).** `roblox_mappings` is a second identity bridge alongside
  `discord_mappings`, and `roblox_cache` holds third-party personal data with a `max_age`.
  Both must be in the erasure registry; a Discord-only erasure would miss them.
- **G16.** `ANALYTICS_KEY_TTL = 400 * 24 * 3600` (`posthog_statistics.py:28`) — 400 days on
  Redis keys holding a `monni_id` against guild and campaign. Longest-lived personal data
  outside Postgres, and 400 days is a GA4 default rather than a chosen period.
- **G10.** `guild_verification_passport` shares verification status between guilds — a
  disclosure the member should be able to see.
- **G11.** IPs are read in `verify.py` (Turnstile) and `ratelimit.py`, and forwarded to
  Paddle as `customer_ip_address`. Legitimate and transient, but "Technical" in the policy's
  data-type table should say so.
- **G12 (revised).** Revision 1 advised deleting the policy's **Marketing Cookies**
  paragraph as over-disclosure. Now wrong — G15 means marketing attribution genuinely
  exists. Rewrite it to describe server-side cookieless attribution accurately.
- **G13.** `case_attachments` stores URLs and filenames. CDN URLs expire, but filenames can
  be personal data. Cascades correctly from `moderation_cases`, so low effort.
- **G14.** No staff access log, so the policy's "we employ data access limitations" claim is
  unevidenced.

### 2.3 `users.email` is stored directly

Minor but worth its own line because Revision 1 missed it: `users.email` is a column on the
root user table. The plan previously treated contact details as something held only by
Paddle. It is first-party data, in scope for export and erasure, and covered by the policy's
"Contact information" line.

### 2.4 The anonymise-don't-delete precedent already exists

`verify.py:328-377` is a complete, working instance of the hard case: a user asks for a link
to be removed, a competing legitimate interest (ban integrity) requires part of the record
to survive, and the code resolves it by stripping every identifying field while keeping the
minimum the interest needs.

That means §3.3's registry **formalises an existing pattern rather than introducing one**.
The remaining gap is transparency: nothing tells the user this happened, or that a
revoked-but-retained row exists. `GET /privacy/disclosures` (§3.4) is where that surfaces.

### 2.5 Running delta

**Revision 3 (28 Sep, schema + tenancy review)**

| | Change |
| --- | --- |
| **Design replaced** | §3.1 offboarding rebuilt around observed presence and multi-observation confirmation. The Revision 2 design — schedule on `on_guild_remove`, sweep 30 days later — was unsafe and is gone. |
| **New blocking decision** | §1.2 multi-bot tenancy. `growth_history.bot_id` is the only bot-scoped column in the schema, so per-bot offboarding is currently inexpressible. |
| **New** | G19 — `command_argument_history` stores plaintext moderation reasons, unscoped by guild, and leaks them across guilds via autocomplete. |
| **New** | G20 — `sticky_roles`, `member_invites`, `first_interaction_claims`, `transaction_history` all retain departed-member data with no cleanup path. |
| **New** | G21 (`api_keys` raw vs `connector.secret_hash` hashed), G22 (`roblox_mappings`/`roblox_cache` must be in the registry). |
| **Corrected** | Migration tooling **does** exist — `schema_manager`, wired into `standalone-compose.yml:34-36`. Revision 1 said there was none and made it a prerequisite. |
| **Corrected** | `bot_errors` already has `created_at`; only the purge job is missing. |
| **Corrected** | `users.email` is stored first-party (§2.3). |
| **Credited** | The schema's FK cascades already cover much of the erasure graph. |

**Revision 2 (28 Sep, code re-verification)**

| | Change |
| --- | --- |
| **Corrected** | G2 said four `on_guild_remove` listeners; there are three. |
| **Corrected** | G12 reversed — marketing attribution now exists, so the policy paragraph needs rewriting, not deleting. |
| **New** | G15 (invite attribution consent premise), G18 (`distinct_id` conventions), G16 (400-day Redis TTL). |
| **Credited** | Reminder/tag encryption, 2FA handling, the unlink anonymisation pattern. |

---

## 3. Implementation plan

### Phase 1 — Stop the bleeding (target: 2 weeks)

Self-contained, no schema work, no new endpoints. None of it waits on §1.

| # | Change | Repo | File |
| --- | --- | --- | --- |
| 1.1 | `send_default_pii=False`; `before_send` scrubber for `Authorization`, `Cookie`, tokens, Discord IDs; `traces_sample_rate` to `0.1`; reconsider `enable_logs` | `monni_api` | `app/main.py:51-63` |
| 1.2 | Same for the bot | `monni_bot` | `src/main.py:119-127` |
| 1.3 | `distinct_id` → `async_discord_id_to_monni_id(member.id)` | `monni_bot` | `src/monni/verification_bans.py:173`, `:225` |
| 1.4 | Drop or truncate `short_error` in `capture_exception` properties | `monni_bot` | `src/modules/global_handler/error_handler.py:178`, `:187` |
| 1.5 | **Stop logging `reason` arguments to suggestion history** (G19, first half) | `monni_bot` | `src/modules/moderation/moderation.py:2087-2254` |
| 1.6 | Truncate `bot_errors.error`; add a 90-day purge job (`created_at` already exists) | `monni_bot` / `monni_api` | `error_handler.py:141`, `:214`; `app/task.py` |
| 1.7 | Re-verify JWT expiry in `_logged_in_user`, or bound and document the window | `monni_api` | `app/routers/invite.py:61` |
| 1.8 | Policy rewrite: correct sub-processors; rewrite Marketing Cookies per G12; say free text is encrypted; add IP handling to "Technical"; bump "Last Updated" | `monni-website-frontend` | `src/routes/(markdown)/privacy/+page.svx:63-65` and the cookie section |

1.5 is the highest value-per-line change in the whole plan: one decorator argument removed
on eight commands stops the cross-guild leak at source. The existing rows still need the
retention and encryption work in Phase 3, but the bleeding stops here.

### Phase 1b — Consent-gate the attribution join (+1 week)

Separated because it changes product behaviour, not configuration. Gate the
`_logged_in_user` branch of `invite.py` on the same Zaraz signal `+layout.svelte` already
reads; leave the anonymous path alone. Expect a measurable drop in `exact`-matched
attribution, partly absorbed by the `time_window` fallback. Model the loss before it lands
so marketing is not surprised.

### Phase 2 — Presence tracking: the answer to Discord's uncertainty

This is the load-bearing phase and it must land before any deletion job does.

#### 3.1 The principle: events are hints, state is fact

`on_guild_remove` cannot be a deletion trigger. It fires for phantom removals (already
documented at `bot_leave_join.py:34-36`), during gateway resumes and outages, and it can be
followed by a re-invite nothing observed. The converse also holds: a guild can go silent
with **no** removal event at all — permissions revoked, guild deleted, long-term
unavailable.

The asymmetry that makes this tractable: **presence is directly observable and
authoritative; absence is not.** `bot.guilds` on an `AutoShardedBot`
(`src/main.py:49`, with the `guilds` intent) is a complete snapshot from Discord once READY
has completed. So build on positive observation only:

```
guild_presence(bot_id, guild_id)
  first_seen_at
  last_present_at        -- last POSITIVE confirmation. The only field that matters.
  absence_streak         -- consecutive independent sweeps that saw it missing
  last_absence_sweep     -- which sweep produced the current streak
  state                  -- present | suspected | confirmed_gone | scheduled | erased
  scheduled_for
```

Rules:

1. **On READY and hourly thereafter**, upsert `last_present_at = now()` for every guild in
   `bot.guilds`, and reset `absence_streak = 0`, `state = 'present'`. This single write is
   the foundation; everything else is derived.
2. **`on_guild_remove` sets `state = 'suspected'` and nothing else.** No schedule, no
   clock. It only makes the guild eligible for confirmation sooner.
3. **A daily confirmation sweep** increments `absence_streak` for guilds whose
   `last_present_at` is older than 24h. Each increment must come from a **distinct bot
   session** — record the session/boot id and refuse to increment twice from one process.
   That is what makes the observations independent rather than three reads of one stale
   cache.
4. **Require `absence_streak >= 3` spanning `>= 7 days`** before `state = 'confirmed_gone'`.
   This is the "check 2–3 times" instinct, made precise.
5. **Any single positive observation resets everything** — streak to zero, state to
   present, schedule cancelled. Re-invites are handled for free; there is no separate
   rejoin path to get wrong.
6. Only at `confirmed_gone` does the retention clock start.

#### 3.2 Shard gating and the circuit breaker

Three confirmations are **not** sufficient on their own, and this is the part most likely to
cause a disaster. During a multi-day shard outage, three independent sweeps would all agree
the guild is missing — and all three would be wrong.

- **Never record absence for an unhealthy shard.** Before a sweep counts a guild missing,
  check that the shard owning it (`(guild_id >> 22) % shard_count`) is connected and has
  completed READY. `AutoShardedBot` exposes per-shard status; a shard that is
  reconnecting makes its whole guild range unobservable, not absent.
- **Refuse to sweep at all** if the observed guild count is materially below the trailing
  median. `growth_history` already records `(guild_count, bot_id)` hourly
  (`startup.py:18-19`, on a `tasks.loop(hours=1)`) and is exactly the baseline needed.
  Incidentally its `has_run_24h` guard skips only the first iteration, not 24 hours as its
  comment claims — harmless here, and hourly is the better baseline anyway.
- **Circuit breaker.** If a sweep would move more than ~2% of known guilds to
  `confirmed_gone`, abort the sweep, alert, and require a human to release it. This catches
  the shard outage, the Discord outage and the logic bug with one control.

The circuit breaker is the single most valuable safeguard here. Getting deletion wrong is
unrecoverable, and every plausible failure mode shows up as an implausible spike.

#### 3.3 Reconciling with the published 30 days

Confirmation (7 days) plus grace (30 days) is ~37 days, which exceeds the policy's "within
30 days for guilds". Two options; take the second:

- Change the policy to "within 60 days of confirmed removal" — honest, but weakens a
  commitment unnecessarily.
- **Start the clock at first suspicion, not at confirmation.** Confirmation happens *inside*
  the 30 days: suspicion at day 0, confirmed by day 7, erased at day 30. A positive
  observation at any point resets it. This keeps the published promise and gives three
  weeks of margin after confirmation, and is what §4's `scheduled_for` assumes.

#### 3.4 Under tenancy option (a), presence is per-bot but deletion is per-guild

`guild_presence` is keyed `(bot_id, guild_id)`. The deletion test is:

```sql
-- erase guild G only when NO non-retired bot has been present recently
NOT EXISTS (
  SELECT 1 FROM guild_presence p
  JOIN bot_registry b USING (bot_id)
  WHERE p.guild_id = G AND b.retired_at IS NULL AND p.state <> 'confirmed_gone'
)
```

`bot_registry.retired_at` is what stops a decommissioned bot pinning every guild it ever
joined into "occupied" forever (§1.2).

#### 3.5 User dormancy needs derived liveness, not just recency

The same problem, harder: there is no `on_user_remove` at all, and the policy's "3 months
for users" is both unenforced and, taken literally, destructive. A user can be entirely
passive while remaining in fifty guilds that rely on their verification. Deleting their
`identity_account` would silently un-verify them everywhere — the bot would strip roles from
someone who did nothing wrong.

So dormancy must be a conjunction, not a timestamp:

```
dormant  =  no positive interaction for 12 months
         AND no live guild_verification row
         AND no non-zero discord_user_points balance
         AND no active product_subscription
         AND no unrevoked identity_account
```

`users.last_seen_at` has to be written from every surface — bot `on_interaction`, API
session refresh, dashboard load, verification completion — or the first condition is
meaningless. Anything failing the conjunction is not dormant and is kept under a documented
basis rather than deleted on a timer.

**Recommend revising the policy's 3 months upward to 12.** A longer period that is actually
enforced is far easier to defend than a short one that is either ignored (today) or
destroys live relationships (if implemented literally).

### Phase 3 — The erasure and export spine (6 weeks, overlaps Phase 2)

Everything hangs off one idea: **`monni_id` is the erasure anchor, and every table holding
personal data must be registered against it.**

#### 3.6 The personal-data registry

New module in `monni-tools`, since bot and API both need it:

```
monni_tools/gdpr/
  registry.py     # table -> (scope, key column, action, legal basis)
  export.py       # gather everything for one monni_id
  erase.py        # execute erasure honouring scope
  retention.py    # shared sweep primitives
```

Three scopes:

- `USER` — Monni is controller; erasure deletes the row.
- `GUILD` — the guild is controller; erasure **anonymises** and the guild is notified.
  **Model this on `verify.py:328-377`**, which already does exactly this: null the
  identifying columns, set a revocation timestamp, keep only what the surviving interest
  needs.
- `LEGAL_HOLD` — billing and tax records, retained for the statutory period (Finnish
  Accounting Act: 6 years from year end), erasure deferred and logged.

Register FK cascade roots rather than their children — `moderation_cases`,
`identity_account`, `logging_settings`, `guild_verification_settings` already pull their
dependents (§2.1). Encrypted columns are the easy cases and should be marked as such, since
crypto-shredding is the fallback wherever a row cannot be deleted.

Two anchors that a Discord-centric registry would miss: `roblox_mappings` (a second
identity bridge) and `roblox_cache` (third-party personal data).

#### 3.7 CI guards

- **Registry completeness.** Reflect the live schema via `schema_manager`, find every
  column named `user_id` / `discord_id` / `monni_id` / `member_id` / `author_id` /
  `target_id` / `inviter_id` / `sender` / `receiver` / `uploaded_by` / `claimed_by` /
  `created_by` / `actor_id`, and assert each owning table is registered. The schema uses at
  least twelve different names for "a person", so a narrow list would miss tables silently.
- **`distinct_id` discipline (G18).** Assert every `posthog.capture` passes a `monni_id` or
  an id matching the agreed non-person prefix. A grep-level test would have caught
  `verification_bans.py:173` at review time.

#### 3.8 Self-service endpoints

New router `monni_api/app/routers/privacy.py`, on the existing authenticated session, with
2FA re-auth for deletion:

| Endpoint | Right | Behaviour |
| --- | --- | --- |
| `GET /privacy/export` | Art. 15, 20 | Enqueues a job; returns a signed expiring link. JSON, one object per registry entry. Decrypts encrypted columns — an export of ciphertext is not portability. |
| `POST /privacy/delete` | Art. 17 | 2FA-gated. 14-day grace with cancel link, then `erase.py`. Returns the guild-scoped items it cannot delete, naming each guild. |
| `POST /privacy/delete/cancel` | — | Cancels within the grace window. |
| `GET /privacy/disclosures` | Art. 15(1)(c) | Passports applied, `identity_ban_propagation` rows, **and any revoked-but-retained `identity_account` with its reason**. Closes G6, G10 and §2.4's transparency gap. |
| `GET /privacy/restrict` | Art. 18 | Flags the `users` row; processing pauses, analytics suppressed. |

Frontend: a `settings/privacy` route beside `settings/security`.

#### 3.9 Bot-side entry point

`/privacy` slash command, ephemeral, deep-linking to the dashboard. Most users meet Monni
through Discord and never see the website; Art. 12(2) requires we *facilitate* the exercise
of rights, and a link they never encounter does not.

#### 3.10 Request register

`gdpr_requests`: `id`, `monni_id`, `type`, `received_at`, `completed_at`, `outcome`,
`actioned_by`. The policy already asserts we keep this record; G1 means we do not.

#### 3.11 Erasure must reach the processors

An Art. 17 erasure that stops at Postgres is incomplete. `erase.py` must also delete the
PostHog person (this is what G18 unblocks), delete matching Sentry events, drop the Redis
keys from G16 plus the `discord_id_to_monni_id_*` cache, and mark the Paddle customer as
under legal hold rather than deleted.

### Phase 4 — Retention (4 weeks, overlaps Phase 3)

#### 3.12 Guild offboarding

The executor is now trivial, because Phase 2 did the hard part: a daily job takes
`guild_presence` rows at `state = 'scheduled'` whose `scheduled_for` has passed and whose
guild satisfies §3.4's no-live-bot test, and runs them through `registry.py`.

**Re-verify immediately before deleting.** Even after confirmation and 30 days, check
`bot.guilds` one last time in the same transaction window. Cheap, and it closes the gap
between scheduling and execution.

`discord_events.py` gives an independent signal for *user* installs
(`APPLICATION_DEAUTHORIZED`) that nothing else covers. Wire user-install offboarding to it
in the same pass, with the same confirmation discipline.

**Backfill is the riskiest single operation in this plan.** Every already-departed guild is
absent from `guild_presence`. Do not treat "not in `guild_presence`" as "gone" — that is
every guild on day one. Instead: let presence tracking run for a full confirmation window
(≥ 7 days) so live guilds are all positively recorded, *then* reconcile
`logging_settings` / `moderation_settings` / `guild_premium` against `guild_presence`,
enqueue the orphans with staggered `scheduled_for`, dry-run the counts, and have a human
review them. This will be the largest deletion Monni has ever run; the circuit breaker in
§3.2 applies to the backfill too.

#### 3.13 Table-level retention

| Table | Retention | Note |
| --- | --- | --- |
| `bot_errors` | 90 days | `created_at` already present |
| `command_argument_history` | 90 days, guild-scoped, encrypted | G19; the row-level fix after Phase 1.5 stops new reasons |
| `growth_history` | 13 months | Year-on-year comparison; also the §3.2 baseline, so do not go shorter |
| `identity_ban_propagation` | Life of the ban + 90 days | Audit trail for contested bans |
| `oauth2_login_token` | Delete on expiry | `expires_at` already present |
| `sticky_roles`, `member_invites` | 12 months after the member leaves | G20 |
| `first_interaction_claims`, `transaction_history` | 12 months | G20; give `transaction_history` a PK |
| `point_system_history` | Guild-configurable, default 24 months | Guild is controller |
| `case_attachments` | Follows the parent case | Cascades already |
| `moderation_cases` | Guild-configurable, default indefinite | Guild is controller; give them the dial |
| `roblox_cache` | Honour `max_age` | Column exists; confirm it is enforced |
| Redis `analytics:*` | Justified period, not 400 days | G16 |

Put the guild-configurable dials beside the existing `moderation/privacy` dashboard page.
That page already frames "what do we tell people" as a guild-level decision; "how long do we
keep it" belongs in the same place.

### Phase 5 — Governance and hardening (ongoing)

- **5.1** Encrypt `oauth2_login_token`, mirroring `verify.py:660-661`. Dual-read (plaintext
  and `fernet.01|`), backfill, drop the plaintext path. Four sites to update:
  `dependencies.py:226`, `:316`, `:491`, insert at `:257`.
- **5.2** Hash `api_keys.api_key`, matching `connector.secret_hash` (G21).
- **5.3** Write the RoPA, including `invite.py` and `discord_events.py`. The registry
  generates most of it.
- **5.4** Publish the DPA, gate bot invites on owner acceptance, and state the shared-config
  consequence of tenancy option (a) (§1.2).
- **5.5** Art. 33 breach procedure: detection, 72-hour clock, templates, the Finnish
  supervisory authority (Tietosuojavaltuutetun toimisto).
- **5.6** Staff access logging, to evidence the access-limitation claim (G14).
- **5.7** Transfer assessment for PostHog and Sentry. Sentry is on the `.de.` ingest domain
  already; confirm PostHog's region and the SCC position for both.
- **5.8** Key rotation for `monni_tools.crypto`. The `fernet.01` prefix anticipates a second
  key but nothing rotates one, and the encrypted volume (reminders, tags, 2FA secrets,
  identity tokens, soon `command_argument_history`) is large enough that the procedure
  should exist before it is needed.
- **5.9** Age assurance. Discord's 13+ floor does most of the work, but several EU states
  set the Art. 8 digital-consent age at 16. Only web analytics and (post-1b) invite
  attribution rely on consent, and both are gated, so exposure is small — document the
  reasoning rather than changing the product.

---

## 4. Schema additions

```sql
-- Which bots share this database, and which are retired (§1.2, §3.4)
CREATE TABLE bot_registry (
    bot_id          bigint PRIMARY KEY,   -- observed bot.user.id, not the configured env var
    name            text NOT NULL,
    configured_id   bigint,               -- config.application_id; mismatch with bot_id = alert
    first_seen_at   timestamptz NOT NULL DEFAULT now(),
    retired_at      timestamptz           -- NULL = live; set to stop it pinning guilds forever
);

-- Observed presence. The only authoritative input is last_present_at. (§3.1)
CREATE TABLE guild_presence (
    bot_id              bigint NOT NULL REFERENCES bot_registry(bot_id),
    guild_id            bigint NOT NULL,
    first_seen_at       timestamptz NOT NULL DEFAULT now(),
    last_present_at     timestamptz NOT NULL DEFAULT now(),
    absence_streak      smallint NOT NULL DEFAULT 0,
    last_absence_session text,            -- boot id; blocks two increments from one process
    state               text NOT NULL DEFAULT 'present',
    scheduled_for       timestamptz,
    PRIMARY KEY (bot_id, guild_id),
    CONSTRAINT guild_presence_state_check
        CHECK (state = ANY (ARRAY['present','suspected','confirmed_gone','scheduled','erased']))
);

CREATE INDEX guild_presence_stale_idx ON guild_presence (last_present_at)
    WHERE state <> 'erased';
CREATE INDEX guild_presence_due_idx ON guild_presence (scheduled_for)
    WHERE state = 'scheduled';

-- Audit of every sweep, so a bad run can be reconstructed and the breaker justified (§3.2)
CREATE TABLE presence_sweep (
    id              bigserial PRIMARY KEY,
    bot_id          bigint NOT NULL,
    session_id      text NOT NULL,
    ran_at          timestamptz NOT NULL DEFAULT now(),
    guilds_observed integer NOT NULL,
    shards_healthy  integer NOT NULL,
    shards_expected integer NOT NULL,
    absences_recorded integer NOT NULL,
    aborted_reason  text                  -- circuit breaker / unhealthy shards / low count
);

CREATE TABLE gdpr_requests (
    id            text PRIMARY KEY,
    monni_id      text NOT NULL REFERENCES users(monni_id),
    type          text NOT NULL,   -- access | erasure | portability | restriction | rectification
    received_at   timestamptz NOT NULL DEFAULT now(),
    completed_at  timestamptz,
    outcome       text,
    actioned_by   text
);

ALTER TABLE users ADD COLUMN last_seen_at          timestamptz;
ALTER TABLE users ADD COLUMN deletion_due_at       timestamptz;
ALTER TABLE users ADD COLUMN processing_restricted boolean NOT NULL DEFAULT false;

-- G19: guild scope, retention, and a target for encryption
ALTER TABLE command_argument_history ADD COLUMN guild_id bigint;
CREATE INDEX command_argument_history_age_idx ON command_argument_history (created_at);

-- G20
ALTER TABLE transaction_history ADD COLUMN id bigserial PRIMARY KEY;
```

Note there is still **no `guilds` table**, so nothing cascades on guild deletion — the
registry has to enumerate every guild-scoped table. Adding a `guilds` anchor with FKs would
collapse offboarding to a single `DELETE`, but it is a large migration across ~40 tables and
is not a prerequisite. Revisit after Phase 4 if offboarding proves fragile.

Migrations go through the existing `schema_manager` service
(`standalone-compose.yml:34-36`).

---

## 5. Sequencing

```
Week 1-2   Phase 1  (Sentry PII, raw IDs, short_error, reason-logging off, bot_errors, JWT, policy)
Week 2     DECISION: controllership (§1.1) AND multi-bot tenancy (§1.2)
Week 3     Phase 1b (consent-gate the attribution join)
Week 3-6   Phase 2  (bot_registry, guild_presence, hourly write, shard gating, circuit breaker)
Week 6-7   Presence runs in observe-only mode — no deletion, gather a baseline
Week 4-9   Phase 3  (registry, CI guards, endpoints, /privacy command, processor erasure)
Week 8-12  Phase 4  (offboarding executor, reviewed backfill, dormancy, table retention)
Week 10+   Phase 5  (token + api_key encryption, RoPA, DPA, breach runbook, key rotation)
```

The observe-only week in weeks 6–7 is not padding. It is what makes the backfill safe: until
every live guild has been positively recorded at least once, "absent from `guild_presence`"
means nothing.

Both §1 decisions gate Phase 3's scope assignment, and §1.2 additionally gates Phase 2's
schema. Neither is expensive to make; both stall everything if left.

## 6. What to do first

**This week, regardless of anything else:** Phase 1.1–1.5. Sentry PII and the
`reason`-logging removal are a handful of lines each and together they close the two largest
uncontrolled flows of personal data in the system — one to third-party processors, one
across guild boundaries.

**The big one is still G2**, but it is now clear that the fix is not a deletion job. It is
presence tracking with independent confirmation, shard gating and a circuit breaker; the
deletion is the small part at the end. Build Phase 2 properly and run it in observe-only
mode before it is allowed to delete anything. Getting this wrong destroys paying customers'
data, and the failure modes — shard outages, Discord incidents, a decommissioned branded bot
pinning guilds forever — are all things that will actually happen.
