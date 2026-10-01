---
title: Purge
description: "Delete many messages at once with /mod purge, filtered by member, text, links, files or embeds."
---
# Mod | Purge Command

The Purge Command allows you to delete a set amount of messages from a channel.

Very useful for removing mass NSFW or spam.

---
## Arguments

- **1 Amount**
    How many messages you'd like to delete.

- **2 Member**
    Will only delete the messages of a specified member.

- **3 Human Only**
    Will only delete messages from humans, leaving messages from bots.

- **4 Match**
    Will only delete messages that match exactly what you typed.

- **5 Regex**
    Will only delete messages that match a regex pattern.

- **6 Contains**
    Will only delete messages that contain what you typed.

- **7 Invert**
    Inverts the other options. This way if you've added "Hello" to Contains, rather than deleting messages with "Hello" it deletes everything without "Hello".

- **8 Has_embeds**
    Only deletes messages with embeds.

- **9 Has_links**
    Only deletes messages with links.

- **10 Has_files**
    Only deletes messages with files.


:::info
Messages from members with a role that is **[immune](/modules/moderation#immune-roles)** to purge are never deleted. You can also choose to keep pinned messages in the command settings.
:::

Default reasons, durations and other settings for this command can be changed in the **[Moderation Module](/modules/moderation#command-settings)**.

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every 2 hours to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.
