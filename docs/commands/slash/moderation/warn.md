---
title: Warn
description: "Warn a member with /mod warn. Each warn can expire on its own, and the message it was about is saved in the case."
---
# Mod | Warn Command

The Warn command allows you to add a warning to one of your members, with an optional expiration date. This allows you to keep track of a member's offences so you can better decide their punishment.

---
## Arguments

- **1 Member**
    The member you want to warn.

- **2 Reason**
    The reason for the warn. If left empty, the default reason from the dashboard is used. You can also type a **[reason alias](/modules/moderation#reason-aliases)**.

- **3 Duration**
    How long the warn stays active, like `12h` or `7d`. If left empty, the default duration from the dashboard is used. Once it expires, the warn no longer counts towards the member's active warns.

- **4 Message**
    The ID or link of the message the warn is about. Monni saves the message in the case, so you can see what was said later.


Default reasons, durations and other settings for this command can be changed in the **[Moderation Module](/modules/moderation#command-settings)**.

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every 2 hours to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.
