---
title: Timeout
description: "Time a member out with /mod timeout so they can't talk or react. Monni can keep a timeout going past Discord's 28 day limit."
---
# Mod | Timeout Command

The Timeout command allows you to time a member out for a set amount of time.

Timing out a member causes them to no longer be able to speak or react to messages. Discord allows timeouts of up to 28 days. With **[Extend past 28 days](/modules/moderation#timeouts-longer-than-28-days)** turned on, Monni can time members out for longer.

---
## Arguments

- **1 Member**
    The member you want to time out.

- **2 Reason**
    The reason for the timeout. If left empty, the default reason from the dashboard is used. You can also type a **[reason alias](/modules/moderation#reason-aliases)**.

- **3 Duration**
    How long the timeout lasts, like `30m`, `12h` or `7d`. If left empty, the default duration from the dashboard is used.


:::info
If the member is already timed out, Monni can ask before replacing the timeout, replace it straight away, or refuse. You can choose which under **When Already Punished** in the [command settings](/modules/moderation#command-settings).
:::

Default reasons, durations and other settings for this command can be changed in the **[Moderation Module](/modules/moderation#command-settings)**.

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every 2 hours to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.
