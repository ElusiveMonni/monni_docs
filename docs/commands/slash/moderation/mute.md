---
title: Mute
description: "Mute a member with /mod mute using a Discord timeout, a mute role or a hard mute that takes their roles away."
---
# Mod | Mute Command

The Mute command allows you to mute members for a set amount of time, or until they are unmuted.

Muting a member causes them to no longer be able to speak in your server. Depending on your settings, Monni mutes members with a Discord timeout, a mute role, or a hard mute that removes their roles. See **[Mute Type](/modules/moderation#mute-type)**.

---
## Arguments

- **1 Member**
    The member you want to mute.

- **2 Reason**
    The reason for the mute. If left empty, the default reason from the dashboard is used. You can also type a **[reason alias](/modules/moderation#reason-aliases)**.

- **3 Duration**
    How long the mute lasts, like `30m`, `12h` or `7d`. If left empty, the default duration from the dashboard is used.


:::info
If the member is already muted, Monni can ask before replacing the mute, replace it straight away, or refuse. You can choose which under **When Already Punished** in the [command settings](/modules/moderation#command-settings).
:::

Default reasons, durations and other settings for this command can be changed in the **[Moderation Module](/modules/moderation#command-settings)**.

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every 2 hours to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.
