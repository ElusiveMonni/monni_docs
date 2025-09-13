---
title: Purge
---
# Mod | Purge Command

The Purge Command allows you to delete a set amount of messages from a channel.

Very useful for removing mass NSFW or spam.

---
## Arguments

- **1 Amount**
    How many messages you'd like to delete.

- **2 Member**
    Will only delete the messages of a specified member when deleting. 

- **3 Human Only**
    Will only delete messages from humans. This option is for AI bot supremacists taking over the world.
 
- **4 Match**
    Will only delete messages in the channel that match exactly what you typed.

- **5 Regex**
    Will delete messages in the channel that contain exactly what you typed.

- **6 Contains**
    Will only delete messages in the channel that contain words you add to the contains section.
 
- **7 Invert**
   Used alongside the Contains option. Inverts the contents of the contains option. This way if you've added "Hello", rather than deleting "Hello" it deletes everything without "Hello". 

 - **8 Has_embeds**
    Only deletes messages with embeds.

-  **9 Has_links**
    Only deletes messages with links.

- **10 Has_files**
    Only deletes messages with files. 

---
## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every hour to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.