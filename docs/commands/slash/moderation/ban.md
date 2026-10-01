---
title: Ban
description: "Ban a member with /mod ban, for a set time or until you unban them. You can ban people who aren't in your server by their ID."
---
# Mod | Ban Command

The Ban command allows you to ban a member from your server, either for a set amount of time or until they are unbanned.

Banning a member means they can NOT rejoin your server. You can unban a member by using the **[Unban](unban)** command.

---
## Arguments

- **1 Member**
    The member you want to ban. You can also use the ID of someone who isn't in your server, to ban them before they join.

- **2 Reason**
    The reason for the ban. If left empty, the default reason from the dashboard is used. You can also type a **[reason alias](/modules/moderation#reason-aliases)**.

- **3 Duration**
    How long the ban lasts, like `30m`, `12h` or `7d`. If left empty, the default duration from the dashboard is used.


:::info
If the member is already banned, Monni can ask before replacing the ban, replace it straight away, or refuse. You can choose which under **When Already Punished** in the [command settings](/modules/moderation#command-settings).
:::

Default reasons, durations and other settings for this command can be changed in the **[Moderation Module](/modules/moderation#command-settings)**.

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every 2 hours to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.
