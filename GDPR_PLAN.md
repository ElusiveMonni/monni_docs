# GDPR compliance plan

Internal planning document. Lives at the repo root so Docusaurus does not publish it
(`docs/` is the only built content root, see `docusaurus.config.js` `routeBasePath: '/'`).

Covers `monni_bot`, `monni_api`, `monni-tools`, `monni-website-frontend`,
`monni_external_api` and the public policy pages.

**Re-verified 28 Sep 2026** against `monni_bot@f6082f3`, `monni_api@eb53d31`,
`monni-tools@378bfe5`, `monni-website-frontend@efb0f63`. All P0 findings still stand.
Line references updated, one claim corrected, three new findings added, and three things
credited that the first pass missed. See §2.4 for the delta.

---

## 1. The controllership question comes first

Nothing else in this plan can be designed until this is settled, because it decides what
a deletion request is even allowed to delete.

Monni is a multi-tenant Discord bot. Three distinct relationships exist, and they have
different lawful bases and different rights obligations:

| Relationship | Data | Who is controller | What that means |
| --- | --- | --- | --- |
| **Monni ↔ end user** | `users`, `discord_mappings`, `identity_account`, `identity_token`, `oauth2_login_token`, `jwt_refresh_token`, `user_2fa`, `paddle_customers`, `product_subscription`, `reminders`, `user_tags`, `user_localisation` | **Monni, sole controller** | Full Art. 15–21 rights land on us. We can and must action them ourselves. |
| **Guild ↔ its members, Monni processing on the guild's behalf** | `moderation_cases`, `case_events`, `case_attachments`, `moderation_warns`, `moderation_mute_state`, `moderation_expirations`, `discord_user_points`, `user_inventory`, `user_counters`, `guild_verification`, `guild_invites`, `growth_history`, logging output | **Guild is controller, Monni is processor** | We cannot unilaterally erase a guild's moderation record on a member's request. We must route the request to the guild and support it with tooling (Art. 28(3)(e)). |
| **Cross-guild sharing** (`guild_verification_passport`, `identity_ban_propagation`, `guild_identity_ban`, `cross_guild_moderation`, `cross_guild_connections`) | Verification status and ban records crossing between independent guilds | **Ambiguous today — this is the biggest legal exposure** | Guild A's ban causing an automatic ban in Guild B is a disclosure to a third-party controller. Needs an explicit basis, a disclosure record, and member-facing transparency. |

**Decision required (owner: founder/legal):** adopt the processor model for guild-scoped
data, publish a Data Processing Addendum, and make guild owners accept it when they add
the bot. Without a DPA in place, Art. 28(3) is breached for every guild in the EU
regardless of how good the code is.

**Recommendation:** yes, processor model. It is the only defensible reading — the guild
decides purposes and means of moderation, we supply the tool. It also makes the erasure
design tractable: user-scoped data we delete, guild-scoped data we surface to the guild
and delete on the guild's instruction or on bot removal.

---

## 2. Current state

### 2.1 What is already right

Worth stating so it does not get refactored away:

- **Pseudonymisation of analytics is real and deliberate.** `monni_tools/id_utils.py`
  mints a `usr_`-prefixed nanoid per person and `discord_mappings` is the only bridge
  back to the Discord ID. Almost every `posthog.capture` in `monni_bot/src` and
  `monni_api/app` passes `monni_id` as `distinct_id`. This is what the privacy policy's
  "pseudo identity" claim rests on, and it holds.
- **User free text is encrypted at rest.** Both surfaces that store text a user typed run
  it through `monni_tools.crypto`: reminders (`modules/user_commands/reminder.py:147`)
  and tags (`modules/user_commands/tag.py:55`, `:203`). The privacy policy's "Any text you
  provide us" line undersells this — it reads as though we keep it in the clear.
- **2FA secrets are handled correctly.** `routers/security.py:109` encrypts the TOTP
  secret and stores only a `hash_data` digest of the backup code.
- **Unlinking already implements anonymise-don't-delete, correctly.**
  `routers/verify.py:328-377` deletes `identity_token` and every `guild_verification` row,
  then deletes `identity_account` **only if** no `guild_identity_ban` references it;
  otherwise it nulls `username`, `avatar_url` and `metadata`, sets `revoked_at`, and keeps
  the bare external id so unlinking cannot be used to clear a ban. This is exactly the
  pattern §3.1 proposes generalising, and it should be the cited template for the
  registry's `GUILD` scope rather than something reinvented.
- **Web analytics are genuinely consent-gated.** PostHog is initialised with
  `opt_out_capturing_by_default` (`src/routes/+layout.ts:60`) and only opted in after the
  Cloudflare Zaraz consent cookie is read (`src/routes/+layout.svelte:38-103`). Calls in
  `lib/track.ts` and `lib/analytics.ts` are no-ops before consent.
- **Message content logging is opt-in per guild.** `modules/logging/message.py` gates
  content on `context.option("include_content")` at four call sites (`:108`, `:174`,
  `:241`, `:307`) and substitutes `Phrase.CONTENT_HIDDEN` otherwise. Logs go to a Discord
  webhook, so content stays inside Discord rather than being copied into our database.
- **Support-server analytics deliberately exclude content** — `posthog_statistics.py`
  captures `message_length` but not the message, with a comment saying why.
- **Anonymous invite clicks are handled well.** `routers/invite.py:94-95` gives an
  unauthenticated click a throwaway UUID and sets `$process_person_profile: False`, so no
  PostHog person is created. No IP is stored. Redis TTL is one hour.
- **The Discord webhook receiver verifies signatures first.**
  `routers/discord_events.py:39-45` does Ed25519 verification before any processing.
- **Some retention automation exists.** `monni_api/app/task.py` expires
  `jwt_refresh_token` daily and evicts channel claims every six hours.

### 2.2 Gaps, ranked

#### P0 — legal exposure, fix first

**G1. No data subject request mechanism exists anywhere in the codebase.**
Still true at `eb53d31`. `app/main.py:105-132` mounts nine routers — `auth`, `discord`,
`dashboard`, `billing`, `verify`, `security`, `invite`, `discord_events`, and the public
API. There is no privacy router. The frontend has `settings/{accounts,billing,localisation,security}`
and no data route. No bot command, no staff tooling. The privacy policy promises
Art. 15/16/17/18/20 rights and the only implementation is an email address. This is the
single largest gap: the promise is made, the capability is absent, and the one-month
Art. 12(3) deadline is unenforceable by hand at current scale.

**G2. The stated retention policy is not implemented.**
The policy says *"we will delete/anonymize your data within 30 days for guilds and 3
months for users"*. Nothing in any repo implements this. Three `on_guild_remove` listeners
exist — `modules/metrics/prometheus.py:235` (gauge refresh),
`modules/metrics/posthog_statistics.py:41` (analytics capture) and
`modules/bot_events/bot_leave_join.py:32` (a counter). Not one touches guild data. The one
`DELETE` that looks like cleanup, `monni/invites.py:32`, is a cache refresh inside
`snapshot()`, not offboarding. **When the bot is removed from a guild, not a single row of
that guild's data is deleted or scheduled for deletion.** Every guild that has ever
removed Monni still has its moderation cases, points, verification records and invite
history in the production database. A published retention promise that is not kept is
worse than no promise: it is an Art. 5(1)(e) breach with our own documentation as the
evidence.

**G3. The privacy policy names the wrong sub-processors.**
Unchanged since the first pass, including through the 145d82b copy-edit of the markdown
pages. Lines 63-65 of `privacy/+page.svx` still list **Microsoft Clarity** and
**Stripe**. The code uses **PostHog** (`posthog-js` throughout the frontend,
`config.posthog` throughout the bot, `posthog` in `monni_api/app/dependencies.py`) and
**Paddle** (`routers/billing.py`, `paddle_customers`, `paddle_billing`). **Sentry**
(`o4507672499912704.ingest.de.sentry.io`, in both `monni_api/app/main.py:51` and
`monni_bot/src/main.py:119`) is not disclosed at all. Cloudflare and Discord are correct.
Art. 13(1)(e) requires accurate recipient categories; three of five are wrong.

**G4. `send_default_pii=True` on both Sentry SDKs, with 100% sampling.**
`monni_api/app/main.py:53` and `monni_bot/src/main.py:123`, with
`traces_sample_rate=1.0` and `profile_session_sample_rate=1.0` at `main.py:55-56` in the
API. This ships request headers, cookies, IP addresses and usernames to Sentry on every
event, and every transaction. Three reinforcing leaks sit alongside it:

- `bot_errors` stores `traceback.format_exc()` verbatim and unbounded
  (`modules/global_handler/error_handler.py:141` and `:214`).
- `posthog.capture_exception` sends `short_error: str(error)` (`error_handler.py:178`,
  `:187`), and a Discord command error's string very often embeds the argument the user
  typed.
- `enable_logs=True` (`main.py:54`) forwards application logs to Sentry as well.

For a tag or reminder command the argument is free text the user wrote — text we take
care to encrypt in Postgres and then hand to two third-party processors in the clear. Not
disclosed, not minimised, not retention-bounded.

**G5. Discord OAuth tokens are stored in plaintext.**
`oauth2_login_token` holds `access_token` and `refresh_token` as plain columns
(`monni_api/app/dependencies.py:257`, read back at `:226`, `:316`, `:491`). The codebase
knows: `routers/verify.py:651` carries the comment *"Encrypted at rest
(monni_tools.crypto), rather than the plaintext the current oauth2_login_token table
keeps."* `identity_token` **is** encrypted (`verify.py:660-661`), so the primitive and the
pattern are both already in place — only the login-token path was left behind. These
tokens grant access to the user's Discord identity, guilds and email scope.
Art. 32(1)(a) names encryption explicitly.

#### P1 — important, fix in the same cycle

**G6. Cross-guild ban propagation has no transparency layer.**
`monni_bot/src/monni/verification_bans.py` bans a member in Guild B because a *linked
third-party account* was banned in Guild A. The audit trail in `identity_ban_propagation`
is good engineering, but the member is never told that a ban followed them across servers,
or which server caused it, or how to contest it. Under the processor model this is a
disclosure between two controllers and needs both a basis and a notice.

**G15. The invite attribution subsystem is built on a premise that does not hold.** *(new)*
`monni_api/app/routers/invite.py` and `routers/discord_events.py` are new since the first
pass. The module docstring states the design goal plainly: *"Bot invite links with
campaign tracking that does not rely on cookies consent."* The implementation is careful
and the anonymous path is genuinely good (§2.1), but two things need fixing:

- **Reading an essential cookie for a marketing purpose still needs consent.**
  `_logged_in_user` (`invite.py:51-66`) reads the `jwt_token` login cookie to attribute an
  invite click to a person. ePrivacy Art. 5(3) attaches to the *access*, judged by
  purpose, not to whether the cookie was set for something essential. Marketing
  attribution is not strictly necessary to deliver the redirect the user asked for, so
  the consent exemption does not reach it. The cookieless *design* is sound; the
  "therefore no consent needed" *conclusion* is the error.
- **Expiry is ignored on purpose.** `invite.py:61` passes
  `options={"verify_exp": False}`, documented as deliberate: *"the signature still proves
  who they are, which is all an attribution join needs."* For authentication that would be
  a vulnerability; for attribution it means a session cookie that expired months ago still
  identifies a person for marketing. Either re-verify expiry and accept the lost joins, or
  bound it explicitly (say, 30 days past expiry) and document the basis.

Fold the resulting processing into the consent flow: gate the logged-in branch on the same
Zaraz signal the frontend already reads, and let the anonymous path — which creates no
person profile — continue unconditionally.

**G7. Two `posthog.capture` calls still leak raw Discord IDs.**
`verification_bans.py:173` and `:225` pass `distinct_id=str(member.id)` instead of the
`monni_id`. Still the only two places in the bot that do, and still on ban-evasion
events — the most sensitive category in the product. They break the pseudonymisation
guarantee the privacy policy makes.

**G18. Four distinct `distinct_id` conventions now coexist.** *(new)*
`monni_id` (the intended one), `"guild_group_event"` (`roles.py:44`, `:81`, `:160`, `:223`;
`invite_listener.py:100`, `:110`; `automations.py:61`), `f"guild_{guild.id}"`
(`misc.py:215`), and `f"invite_{uuid4()}"` (`invite.py:94`). Each is defensible on its own.
The problem is collective: **to honour an Art. 17 erasure inside PostHog we must be able to
enumerate which `distinct_id`s belong to one person**, and that is only possible if the
person-linked ones are distinguishable by construction. Settle on a rule — person events
use `monni_id`, non-person events use a prefixed synthetic id that can never collide with
`usr_` — and assert it in a test.

**G8. No Records of Processing Activities (Art. 30), no DPA, no breach runbook.**
Art. 30 applies once processing is non-occasional, which a Discord bot's is. There is no
RoPA. There is no DPA for guild owners (see §1). There is no documented 72-hour Art. 33
breach procedure. The RoPA now also has to cover the two new processing activities in
`invite.py` and `discord_events.py`.

**G9. `bot_errors`, `growth_history` and `identity_ban_propagation` have no retention.**
Unbounded, and the first two contain personal data indirectly.

#### P2 — correctness and polish

- **G16 (new).** `ANALYTICS_KEY_TTL = 400 * 24 * 3600` (`posthog_statistics.py:28`) — 400
  days on Redis keys holding a `monni_id` against a guild id and campaign
  (`analytics:guild_added_by:*`, written at `:309`). That is the longest-lived personal
  data in the system outside Postgres, and 400 days is a GA4-derived default rather than a
  period anyone chose. Pick a retention that matches the actual analysis window and write
  down why.
- **G10.** `guild_verification_passport` shares verification *status* between guilds. Less
  sensitive than a ban, but still a disclosure the member should be able to see.
- **G11.** IP addresses are read in `routers/verify.py` (Turnstile), `ratelimit.py` and
  forwarded to Paddle as `customer_ip_address` (`billing.py`). Uses are legitimate and
  transient, but "Technical" in the policy's data-type table should say so explicitly.
- **G12 (revised).** The first pass recommended deleting the policy's **Marketing Cookies**
  paragraph as over-disclosure. That advice is now wrong: G15 means marketing attribution
  genuinely exists. Replace the paragraph rather than removing it — describe the
  server-side, cookieless attribution accurately, and say that the logged-in join is
  consent-gated once G15 is fixed.
- **G13.** `case_attachments` stores URLs and filenames of evidence attachments. Discord
  CDN URLs expire, so the practical risk is low, but filenames can be personal data.
- **G14.** No staff access log. The policy claims "we employ data access limitations for
  our staff" — there is nothing in the repos that implements or evidences this.

### 2.3 Where the anonymise-don't-delete precedent already exists

Worth calling out separately because it changes how §3 should be built. The unlink flow at
`verify.py:328-377` is a complete, working instance of the hard case: a user asks for a
link to be removed, a competing legitimate interest (ban integrity) requires part of the
record to survive, and the code resolves it by stripping every identifying field while
keeping the minimum the interest needs.

That is the right answer, and it means §3.1's registry is **formalising an existing
pattern rather than introducing one**. The remaining gap is transparency: nothing tells
the user this happened, or why, or that a revoked-but-retained row exists at all. The
`GET /privacy/disclosures` endpoint in §2.3 of the plan below is where that surfaces.

### 2.4 Delta since the 21 Sep review

| | Change |
| --- | --- |
| **Corrected** | G2 said four `on_guild_remove` listeners; there are three — `bot_leave_join.py`'s webhook-log listener was removed. The conclusion is unaffected: none of them delete anything. |
| **Corrected** | G12 reversed. Marketing attribution now exists, so the policy's marketing paragraph needs rewriting, not deleting. |
| **New** | G15 — invite campaign attribution built on an incorrect consent exemption, plus deliberate JWT expiry bypass. |
| **New** | G18 — four competing `distinct_id` conventions, which blocks erasure inside PostHog. |
| **New** | G16 — 400-day Redis TTL on pseudonymous analytics keys. |
| **Credited** | Reminder and tag free text is encrypted at rest. The first pass missed this and the policy undersells it. |
| **Credited** | 2FA secret encrypted, backup code hashed. |
| **Credited** | The unlink flow already implements the anonymisation pattern this plan proposes (§2.3). |
| **Unchanged** | G1, G3, G4, G5, G6, G7, G8, G9, G10, G11, G13, G14 all verified still present, line references updated. |
| **Also new** | `routers/discord_events.py` (signature-verified Discord webhook receiver, records guild **and user** installs) is a new processing activity for the RoPA. |

---

## 3. Implementation plan

Four phases. Phases 1 and 2 are the compliance floor and should not be split across
quarters.

### Phase 1 — Stop the bleeding (target: 2 weeks)

Small, self-contained changes. No schema work, no new endpoints.

| # | Change | Repo | File |
| --- | --- | --- | --- |
| 1.1 | `send_default_pii=False`; add `before_send` scrubber stripping `Authorization`, `Cookie`, tokens and Discord IDs; drop `traces_sample_rate` to `0.1`; reconsider `enable_logs` | `monni_api` | `app/main.py:51-63` |
| 1.2 | Same for the bot | `monni_bot` | `src/main.py:119-127` |
| 1.3 | Replace `distinct_id=str(member.id)` with `await id_utils.async_discord_id_to_monni_id(member.id)` | `monni_bot` | `src/monni/verification_bans.py:173`, `:225` |
| 1.4 | Drop `short_error` from the `capture_exception` properties, or truncate it to a fixed length | `monni_bot` | `src/modules/global_handler/error_handler.py:178`, `:187` |
| 1.5 | Truncate `bot_errors.error` to a bounded length and add `created_at`; add a 90-day purge job | `monni_bot` / `monni_api` | `error_handler.py:141`, `:214`; `app/task.py` |
| 1.6 | Re-verify JWT expiry in `_logged_in_user`, or bound the grace window and document it | `monni_api` | `app/routers/invite.py:61` |
| 1.7 | Rewrite the sub-processor list: PostHog, Paddle, Sentry, Cloudflare, Discord. Delete Microsoft Clarity and Stripe. Rewrite the Marketing Cookies paragraph per G12. Correct the "any text you provide us" line to say it is encrypted. Bump "Last Updated" | `monni-website-frontend` | `src/routes/(markdown)/privacy/+page.svx:63-65` and the cookie section |
| 1.8 | Add IP-address handling to the "Technical" data type description | `monni-website-frontend` | same |

1.1–1.4 are one-line-scale changes with no behavioural risk. 1.7 is a text change. None of
Phase 1 needs the controllership decision to land first. 1.6 will lose some attribution
joins — that is the correct trade.

### Phase 1b — Consent-gate the logged-in attribution join (target: +1 week)

Separated from Phase 1 because it changes product behaviour rather than configuration.
Gate the `_logged_in_user` branch of `invite.py` on the same Zaraz consent signal
`+layout.svelte` already reads, leaving the anonymous path untouched. Expect a measurable
drop in `exact`-matched attribution; the `time_window` fallback absorbs some of it. Worth
modelling the loss before it lands so the marketing side is not surprised.

### Phase 2 — The erasure and export spine (target: 6 weeks)

This is the real work. Everything hangs off one idea: **`monni_id` is the erasure anchor,
and every table that holds personal data must be registered against it.**

#### 2.1 Build the personal-data registry

New module in `monni-tools`, since bot and API both need it:

```
monni_tools/gdpr/
  registry.py     # table -> (scope, key column, action, legal basis)
  export.py       # gather everything for one monni_id
  erase.py        # execute erasure honouring scope
  retention.py    # shared sweep primitives
```

`registry.py` declares, per table, one of three scopes:

- `USER` — Monni is controller. Erasure deletes the row.
- `GUILD` — the guild is controller. Erasure **anonymises** (replace `user_id` with a
  tombstone, null free-text fields) rather than deleting, and the guild is notified. This
  preserves the guild's legitimate interest in an intact moderation history while removing
  the identifier. **Model this on `verify.py:328-377`, which already does exactly this
  correctly** — same shape: null the identifying columns, set a revocation timestamp, keep
  only what the surviving interest needs.
- `LEGAL_HOLD` — billing and tax records. Retained for the statutory period (Finnish
  Accounting Act: 6 years from year end), erasure deferred and logged.

A declarative registry, rather than hand-written erasure SQL, is what makes this
maintainable: adding a table without registering it should fail CI.

Encrypted columns (`reminders.content`, `user_tags.content`, `user_2fa.secret`,
`identity_token.*`) are the easy cases — dropping the row is a clean erasure and the
registry should mark them so, because crypto-shredding is also the fallback if a row ever
cannot be deleted.

#### 2.2 CI guards

Two tests in `monni-tools`:

- **Registry completeness.** Reflect the live schema, find every column named `user_id` /
  `discord_id` / `monni_id` / `author_id` / `target_user_id` / `inviter_id`, and assert
  each owning table appears in the registry. This is the mechanism that keeps the plan
  true in six months; without it the registry rots on the first feature branch.
- **`distinct_id` discipline (G18).** Assert every `posthog.capture` call site passes
  either a `monni_id` or an id matching the agreed non-person prefix pattern. A grep-level
  test is enough and would have caught `verification_bans.py:173` at review time.

#### 2.3 Self-service endpoints

New router `monni_api/app/routers/privacy.py`, mounted alongside the nine in
`main.py:105-132`, using the existing authenticated session (`get_current_user`), plus 2FA
re-auth via the existing `user_2fa` flow for deletion:

| Endpoint | Right | Behaviour |
| --- | --- | --- |
| `GET /privacy/export` | Art. 15, Art. 20 | Enqueues a job; emails/DMs a signed, expiring download link. JSON, machine-readable, one object per registry entry. Decrypts the encrypted columns — an export of ciphertext is not portability. |
| `POST /privacy/delete` | Art. 17 | 2FA-gated. 14-day grace window with a cancel link, then executes `erase.py`. Returns the guild-scoped items it cannot delete, naming each guild. |
| `POST /privacy/delete/cancel` | — | Cancels within the grace window. |
| `GET /privacy/disclosures` | Art. 15(1)(c) | Lists cross-guild disclosures affecting this user: passports applied, `identity_ban_propagation` rows, **and any revoked-but-retained `identity_account` row with the reason**. Closes G6, G10, and the transparency half of §2.3. |
| `GET /privacy/restrict` | Art. 18 | Flags the `users` row; processing pauses, analytics suppressed. |

Frontend: a new `settings/privacy` route beside the existing `settings/security` and
`settings/accounts`, following the same page structure.

#### 2.4 Bot-side entry point

`/privacy` slash command in `monni_bot/src/modules/user_commands/`, ephemeral, deep-linking
to the dashboard. Most users meet Monni through Discord, never the website; Art. 12(2)
requires we *facilitate* the exercise of rights, and a link they never see does not.

#### 2.5 Request register

`gdpr_requests` table: `id`, `monni_id`, `type`, `received_at`, `completed_at`, `outcome`,
`actioned_by`. The policy already asserts we keep this record ("*We are required to keep
record of completed requests for compliance*") — G1 means we currently do not.

#### 2.6 Erasure reaches the processors too

An Art. 17 erasure that stops at Postgres is incomplete. `erase.py` must also:

- delete the PostHog person for the `monni_id` (this is what G18 unblocks),
- delete matching Sentry events by user id,
- drop the Redis analytics keys from G16 (`analytics:guild_added_by:*` and the
  `discord_id_to_monni_id_*` cache),
- record the Paddle customer as under legal hold rather than deleted.

### Phase 3 — Retention that actually runs (target: 4 weeks, can overlap Phase 2)

#### 3.1 Guild offboarding — the G2 fix

New cog, `monni_bot/src/modules/bot_events/` (next to the existing `bot_leave_join.py`):

```
on_guild_remove  ->  INSERT INTO guild_deletion_schedule (guild_id, scheduled_for = now() + 30 days)
on_guild_join    ->  DELETE FROM guild_deletion_schedule WHERE guild_id = $1   -- re-add cancels
```

A daily APScheduler job in `monni_api/app/task.py` executes due rows through
`registry.py`, deleting every `GUILD`-scoped table for that guild. The 30-day window is
both what the policy already promises and a genuine safety margin against accidental kicks
and Discord outages.

**Guard against phantom guilds.** `bot_leave_join.py:34-36` documents that Monni receives
*"a lot of phantom guilds"* — spurious `on_guild_remove` events for guilds that are merely
unavailable — and guards with `if guild.unavailable is None or guild.unavailable: return`.
The deletion scheduler must apply the same guard and then some: schedule only on a
confirmed removal, and have the daily sweep re-verify against the live guild list
immediately before deleting. A phantom event that slipped through a 30-day window would
destroy a paying guild's data. Belt and braces are warranted here.

`discord_events.py` gives a second, independent signal for *user* installs
(`APPLICATION_DEAUTHORIZED`) that nothing else covers. Wire user-install offboarding to it
in the same pass.

**Backfill is required and is the part to plan carefully.** Every guild that has already
removed the bot is unrepresented in `guild_deletion_schedule`. Before the job goes live:
reconcile `guild_premium` / `logging_settings` / `moderation_settings` against the bot's
live guild list, enqueue the orphans with a staggered `scheduled_for`, and dry-run the row
counts first. This will be the largest single deletion Monni has ever run — do it behind a
feature flag with the counts reviewed by a human.

#### 3.2 Dormant user sweep

3 months after a user's last interaction across every surface, anonymise `USER`-scoped
rows. Requires a `users.last_seen_at` column maintained from the bot's `on_interaction`
and the API's session refresh. Cheap to add, and it is what makes the policy's "3 months
for users" true.

#### 3.3 Table-level retention

| Table | Retention | Rationale |
| --- | --- | --- |
| `bot_errors` | 90 days | Debugging value decays fast |
| `growth_history` | 13 months | Year-on-year comparison |
| `identity_ban_propagation` | Life of the ban + 90 days | Audit trail for contested bans |
| `oauth2_login_token` | Delete on session expiry | Already has `expires_at` |
| `case_attachments` | Follows the parent case | Discord CDN URLs expire anyway |
| `moderation_cases` | Guild-configurable, default indefinite | Guild is controller; give them the dial |
| Redis `analytics:*` | Justified period, not 400 days | G16 |

Give guilds a retention setting in the dashboard beside the existing
`moderation/privacy` page — that page already frames "what do we tell people" as a
guild-level decision, and "how long do we keep it" belongs in the same place.

### Phase 4 — Governance and hardening (target: ongoing)

- **4.1** Encrypt `oauth2_login_token` with `monni_tools.crypto`, mirroring the
  `identity_token` path at `verify.py:660-661`. Migration: dual-read (accept both
  plaintext and `fernet.01|` prefixed), backfill, then drop the plaintext path. The
  `identifier` prefix in `crypto.encrypt_data` was designed for exactly this — use it.
  Note the four read sites (`dependencies.py:226`, `:316`, `:491`, plus the insert at
  `:257`), all of which need the dual-read.
- **4.2** Write the RoPA, including the two new activities in `invite.py` and
  `discord_events.py`. The registry from 2.1 generates most of it; the lawful-basis column
  is already half-drafted in the privacy policy's purpose table.
- **4.3** Publish the DPA and gate bot invites on guild-owner acceptance.
- **4.4** Document the Art. 33 breach procedure: detection, 72-hour clock, notification
  templates, the Finnish supervisory authority (Tietosuojavaltuutetun toimisto).
- **4.5** Staff access logging, to evidence the access-limitation claim (G14).
- **4.6** Transfer assessment for PostHog and Sentry. Sentry is already on the `.de.`
  ingest domain, which helps; confirm PostHog region and the SCC position for both.
- **4.7** Key rotation for `monni_tools.crypto`. The `fernet.01` identifier prefix
  anticipates a second key but nothing rotates one, and the volume of encrypted user text
  is now large enough (reminders, tags, 2FA secrets, identity tokens) that a rotation
  procedure should exist before it is needed.
- **4.8** Age assurance. The policy says under-13s must not use the service; Discord's own
  13+ floor does most of the work, but several EU states set the Art. 8 digital-consent
  age at 16. Decide whether any processing relies on consent for under-16s — currently
  only web analytics and (post-1b) invite attribution do, and both are consent-gated, so
  the exposure is small. Document the reasoning rather than changing the product.

---

## 4. Schema additions

```sql
CREATE TABLE guild_deletion_schedule (
    guild_id       BIGINT PRIMARY KEY,
    scheduled_for  TIMESTAMPTZ NOT NULL,
    reason         TEXT NOT NULL DEFAULT 'bot_removed',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE gdpr_requests (
    id            TEXT PRIMARY KEY,
    monni_id      TEXT NOT NULL REFERENCES users(monni_id),
    type          TEXT NOT NULL,   -- access | erasure | portability | restriction | rectification
    received_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at  TIMESTAMPTZ,
    outcome       TEXT,
    actioned_by   TEXT
);

ALTER TABLE users ADD COLUMN last_seen_at      TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN deletion_due_at   TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN processing_restricted BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE bot_errors ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now();
```

There is still no migration tooling in any repo — schema lives only in the live database.
**Adopt a migration tool before Phase 2**, or the registry in 2.1 has nothing reliable to
reflect against and the CI guard in 2.2 cannot be written. This is a prerequisite, not a
nice-to-have.

---

## 5. Sequencing summary

```
Week 1-2    Phase 1 (Sentry PII, raw IDs, short_error, bot_errors, JWT expiry, policy text)
Week 2      DECISION: controllership model + DPA  ← blocks 2.1 scope assignment
Week 3      Migration tooling adopted             ← blocks 2.1, 2.2
Week 3      Phase 1b (consent-gate the logged-in attribution join)
Week 3-8    Phase 2 (registry, CI guards, endpoints, /privacy command, processor erasure)
Week 5-9    Phase 3 (guild offboarding + backfill, dormant sweep, retention)
Week 8+     Phase 4 (token encryption, RoPA, DPA publication, breach runbook, key rotation)
```

Two hard blockers sit early: the controllership decision (§1) and migration tooling (§4).
Both are cheap to resolve and both stall Phase 2 entirely if left.

## 6. What to do first

If only one thing gets done this month, make it **G2 — guild offboarding**. It is the gap
where our own published policy is the evidence against us, it is the largest volume of
unlawfully retained data, and the fix (`on_guild_remove` → schedule → daily sweep) is
perhaps 200 lines plus a carefully reviewed backfill.

The cheapest meaningful win is **G4**: four lines across two files removes the largest
uncontrolled outflow of personal data in the system. Do it this week regardless of what
else moves.
