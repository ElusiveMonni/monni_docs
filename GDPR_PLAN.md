# GDPR compliance plan

Internal planning document. Lives at the repo root so Docusaurus does not publish it
(`docs/` is the only built content root, see `docusaurus.config.js` `routeBasePath: '/'`).

Covers `monni_bot`, `monni_api`, `monni-tools`, `monni-website-frontend`,
`monni_external_api` and the public policy pages.

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
- **Web analytics are genuinely consent-gated.** PostHog is initialised with
  `opt_out_capturing_by_default` and only opted in after the Cloudflare Zaraz consent
  cookie is read (`monni-website-frontend/src/routes/+layout.svelte:35-95`). Calls in
  `lib/track.ts` and `lib/analytics.ts` are no-ops before consent.
- **Message content logging is opt-in per guild.** `modules/logging/message.py:191`
  gates content on `context.option("include_content")` and substitutes
  `Phrase.CONTENT_HIDDEN` otherwise. Logs are written to a Discord webhook, so content
  stays inside Discord rather than being copied into our database.
- **Support-server analytics deliberately exclude content** — `posthog_statistics.py`
  captures `message_length` but not the message, with a comment saying why.
- **Verification tokens have an encrypted path.** `monni_tools/crypto.py` (Fernet, with a
  `fernet.01` key-version prefix) is used for `identity_token`.
- **Account unlinking cascades correctly.** `monni_api/app/routers/verify.py:355-372`
  deletes `identity_token`, then `guild_verification`, then `identity_account`.
- **Some retention automation exists.** `monni_api/app/task.py` expires
  `jwt_refresh_token` daily and evicts channel claims.

### 2.2 Gaps, ranked

#### P0 — legal exposure, fix first

**G1. No data subject request mechanism exists anywhere in the codebase.**
There is no export endpoint, no deletion endpoint, no bot command, no staff tooling. The
privacy policy promises Art. 15/16/17/18/20 rights and the only implementation is an
email address. Every request today is a manual database session. This is the single
largest gap: the promise is made, the capability is absent, and the one-month Art. 12(3)
deadline is unenforceable by hand at current scale.

**G2. The stated retention policy is not implemented.**
The policy says *"we will delete/anonymize your data within 30 days for guilds and 3
months for users"*. Nothing in any repo implements this. Four `on_guild_remove` listeners
exist — `modules/metrics/prometheus.py:236` (gauge refresh),
`modules/metrics/posthog_statistics.py:27` (analytics capture), and
`modules/bot_events/bot_leave_join.py:37` and `:63` (a counter and a webhook log). Not one
of them touches guild data. **When the bot is removed from a guild, not a single row of
that guild's data is deleted or scheduled for deletion.**
Every guild that has ever removed Monni still has its moderation cases, points, verification
records and invite history in the production database. A published retention promise that
is not kept is worse than no promise: it is a Art. 5(1)(e) breach with our own documentation
as the evidence.

**G3. The privacy policy names the wrong sub-processors.**
The policy lists **Microsoft Clarity** and **Stripe**. The code uses **PostHog**
(`posthog-js` throughout the frontend, `config.posthog` throughout the bot, `posthog` in
`monni_api/app/dependencies.py`) and **Paddle** (`monni_api/app/routers/billing.py`,
`paddle_customers`, `paddle_billing`). **Sentry** (`o4507672499912704.ingest.de.sentry.io`,
in both `monni_api/app/main.py:43` and `monni_bot/src/main.py:148`) is not disclosed at
all. Cloudflare and Discord are disclosed correctly. Art. 13(1)(e) requires accurate
recipient categories; three of five are wrong.

**G4. `send_default_pii=True` on both Sentry SDKs, with 100% sampling.**
`monni_api/app/main.py:47` and `monni_bot/src/main.py:152`. This ships request headers,
cookies, IP addresses and usernames to Sentry on every event, and
`traces_sample_rate=1.0` / `profile_session_sample_rate=1.0` in the API means every
transaction. Combined with `bot_errors` storing `traceback.format_exc()` verbatim
(`modules/global_handler/error_handler.py:109` and `:175`), personal data — including
command arguments, which for a tag or reminder command is free text the user wrote — is
being copied into a third-party US-parent processor and an untruncated, unretained
database table. Not disclosed, not minimised, not retention-bounded.

**G5. Discord OAuth tokens are stored in plaintext.**
`oauth2_login_token` holds `access_token` and `refresh_token` as plain columns
(`monni_api/app/dependencies.py:219`). The codebase knows: `routers/verify.py:651`
carries the comment *"Encrypted at rest (monni_tools.crypto), rather than the plaintext
the current oauth2_login_token table keeps."* These tokens grant access to the user's
Discord identity, guilds and email scope. Art. 32(1)(a) names encryption explicitly.

#### P1 — important, fix in the same cycle

**G6. Cross-guild ban propagation has no transparency layer.**
`monni_bot/src/monni/verification_bans.py` bans a member in Guild B because a *linked
third-party account* was banned in Guild A. The audit trail in `identity_ban_propagation`
is good engineering, but the member is never told that a ban followed them across servers,
or which server caused it, or how to contest it. Under the processor model this is a
disclosure between two controllers and needs both a basis and a notice.

**G7. Two `posthog.capture` calls leak raw Discord IDs.**
`verification_bans.py:208` and `:264` pass `distinct_id=str(member.id)` instead of the
`monni_id`. These are the only two places in the bot that do. They break the
pseudonymisation guarantee the privacy policy makes, and they do it on ban-evasion events —
the most sensitive category in the product.

**G8. No Records of Processing Activities (Art. 30), no DPA, no breach runbook.**
Art. 30 applies once processing is non-occasional, which a Discord bot's is. There is no
RoPA. There is no DPA for guild owners (see §1). There is no documented 72-hour Art. 33
breach procedure.

**G9. `bot_errors`, `growth_history` and `identity_ban_propagation` have no retention.**
Unbounded, and the first two contain personal data indirectly.

#### P2 — correctness and polish

- **G10.** `guild_verification_passport` shares verification *status* between guilds. Less
  sensitive than a ban, but still a disclosure the member should be able to see.
- **G11.** IP addresses are read in `routers/verify.py:625` (Turnstile), `ratelimit.py:319`
  and forwarded to Paddle as `customer_ip_address` (`billing.py:325`). Uses are legitimate
  and transient, but "Technical" in the policy's data-type table should say so explicitly.
- **G12.** The policy's cookie section describes **Marketing Cookies** that the codebase
  does not set. Remove rather than over-disclose.
- **G13.** `case_attachments` stores URLs and filenames of evidence attachments. Discord
  CDN URLs expire, so the practical risk is low, but filenames can be personal data.
- **G14.** No `SessionStart`-equivalent staff access log. The policy claims "we employ data
  access limitations for our staff" — there is nothing in the repos that implements or
  evidences this.

---

## 3. Implementation plan

Four phases. Phases 1 and 2 are the compliance floor and should not be split across
quarters.

### Phase 1 — Stop the bleeding (target: 2 weeks)

Small, self-contained changes. No schema work, no new endpoints.

| # | Change | Repo | File |
| --- | --- | --- | --- |
| 1.1 | `send_default_pii=False`; add `before_send` scrubber stripping `Authorization`, `Cookie`, tokens and Discord IDs; drop `traces_sample_rate` to `0.1` | `monni_api` | `app/main.py:43-60` |
| 1.2 | Same for the bot | `monni_bot` | `src/main.py:148-156` |
| 1.3 | Replace `distinct_id=str(member.id)` with `await id_utils.async_discord_id_to_monni_id(member.id)` | `monni_bot` | `src/monni/verification_bans.py:208`, `:264` |
| 1.4 | Truncate `bot_errors.error` to a bounded length and add `created_at`; add a 90-day purge job | `monni_bot` / `monni_api` | `src/modules/global_handler/error_handler.py:109,175`; `app/task.py` |
| 1.5 | Rewrite the sub-processor list: PostHog, Paddle, Sentry, Cloudflare, Discord. Delete Microsoft Clarity and Stripe. Delete the Marketing Cookies paragraph. Bump "Last Updated" | `monni-website-frontend` | `src/routes/(markdown)/privacy/+page.svx` |
| 1.6 | Add IP-address handling to the "Technical" data type description | `monni-website-frontend` | same |

1.1–1.3 are one-line-scale changes with no behavioural risk. 1.5 is a text change. None
of Phase 1 needs the controllership decision to land first.

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
  the identifier.
- `LEGAL_HOLD` — billing and tax records. Retained for the statutory period (Finnish
  Accounting Act: 6 years from year end), erasure deferred and logged.

A declarative registry, rather than hand-written erasure SQL, is what makes this
maintainable: adding a table without registering it should fail CI.

#### 2.2 CI guard

A test in `monni-tools` that reflects the live schema, finds every column named
`user_id` / `discord_id` / `monni_id` / `author_id` / `target_user_id`, and asserts each
owning table appears in the registry. This is the mechanism that keeps the plan true
in six months. Without it the registry rots on the first feature branch.

#### 2.3 Self-service endpoints

New router `monni_api/app/routers/privacy.py`, mounted under the existing authenticated
session (`get_current_user`), plus 2FA re-auth via the existing `user_2fa` flow for
deletion:

| Endpoint | Right | Behaviour |
| --- | --- | --- |
| `GET /privacy/export` | Art. 15, Art. 20 | Enqueues a job; emails/DMs a signed, expiring download link. JSON, machine-readable, one object per registry entry. |
| `POST /privacy/delete` | Art. 17 | 2FA-gated. 14-day grace window with a cancel link, then executes `erase.py`. Returns the guild-scoped items it cannot delete, naming each guild. |
| `POST /privacy/delete/cancel` | — | Cancels within the grace window. |
| `GET /privacy/disclosures` | Art. 15(1)(c) | Lists cross-guild disclosures affecting this user: passports applied and `identity_ban_propagation` rows. Closes G6 and G10. |
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

**Guard against phantom guilds.** `bot_leave_join.py:39-41` already documents that Monni
receives *"a lot of phantom guilds"* — spurious `on_guild_remove` events for guilds that
are merely unavailable. The existing handler guards with
`if guild.unavailable is None or guild.unavailable: return`. The deletion scheduler must
apply the same guard and then some: schedule only on a confirmed removal, and have the
daily sweep re-verify against the live guild list immediately before deleting. A phantom
event that slipped through a 30-day window would destroy a paying guild's data. Belt and
braces are warranted here.

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

Give guilds a retention setting in the dashboard beside the existing
`moderation/privacy` page — that page already frames "what do we tell people" as a
guild-level decision, and "how long do we keep it" belongs in the same place.

### Phase 4 — Governance and hardening (target: ongoing)

- **4.1** Encrypt `oauth2_login_token` with `monni_tools.crypto`, mirroring `identity_token`.
  Migration: dual-read (accept both plaintext and `fernet.01|` prefixed), backfill,
  then drop the plaintext path. The `identifier` prefix in `crypto.encrypt_data` was
  designed for exactly this — use it.
- **4.2** Write the RoPA. The registry from 2.1 generates most of it; the lawful-basis
  column is already half-drafted in the privacy policy's purpose table.
- **4.3** Publish the DPA and gate bot invites on guild-owner acceptance.
- **4.4** Document the Art. 33 breach procedure: detection, 72-hour clock, notification
  templates, the Finnish supervisory authority (Tietosuojavaltuutetun toimisto).
- **4.5** Staff access logging, to evidence the access-limitation claim (G14).
- **4.6** Transfer assessment for PostHog and Sentry. Sentry is already on the `.de.`
  ingest domain, which helps; confirm PostHog region and the SCC position for both.
- **4.7** Age assurance. The policy says under-13s must not use the service; Discord's own
  13+ floor does most of the work, but several EU states set the Art. 8 digital-consent
  age at 16. Decide whether any processing relies on consent for under-16s — currently only
  web analytics does, and that is consent-gated already, so the exposure is small. Document
  the reasoning rather than changing the product.

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

There is no migration tooling in any repo — schema lives only in the live database. **Adopt
a migration tool before Phase 2**, or the registry in 2.1 has nothing reliable to reflect
against and the CI guard in 2.2 cannot be written. This is a prerequisite, not a nice-to-have.

---

## 5. Sequencing summary

```
Week 1-2    Phase 1 (Sentry PII, raw IDs, bot_errors, policy text)
Week 2      DECISION: controllership model + DPA  ← blocks 2.1 scope assignment
Week 3      Migration tooling adopted             ← blocks 2.1, 2.2
Week 3-8    Phase 2 (registry, CI guard, endpoints, /privacy command)
Week 5-9    Phase 3 (guild offboarding + backfill, dormant sweep, retention)
Week 8+     Phase 4 (token encryption, RoPA, DPA publication, breach runbook)
```

Two hard blockers sit early: the controllership decision (§1) and migration tooling (§4).
Both are cheap to resolve and both stall Phase 2 entirely if left.

## 6. What to do first

If only one thing gets done this month, make it **G2 — guild offboarding**. It is the
gap where our own published policy is the evidence against us, it is the largest volume
of unlawfully retained data, and the fix (`on_guild_remove` → schedule → daily sweep) is
perhaps 200 lines plus a carefully reviewed backfill.
