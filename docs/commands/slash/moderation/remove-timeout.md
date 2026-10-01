---
title: Remove Timeout
description: "End a member's timeout early with /mod remove_timeout, including timeouts Monni keeps going past 28 days."
---
# Mod | Remove Timeout Command

The Remove Timeout command allows you to end a member's timeout early. This includes timeouts that Monni is extending past 28 days.

---
## Arguments

- **1 Member**
    The member whose timeout you want to remove.

- **2 Reason**
    The reason for the removal. If left empty, the default reason from the dashboard is used. You can also type a **[reason alias](/modules/moderation#reason-aliases)**.


Default reasons, durations and other settings for this command can be changed in the **[Moderation Module](/modules/moderation#command-settings)**.

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every 2 hours to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.
