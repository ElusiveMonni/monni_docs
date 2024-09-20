---
sidebar_position: 7
title: Moderation
---
###### Module for simple punishments for rulebreakers
***
The Moderation Module is a module designed to keep members from breaking the rules. It comes with an array of commands which can be used to mute, ban, and warn members. You’ll also be able to use purge commands to clear spam or NSFW from the chat.

All command usage can be logged in a channel of your choice using the [**Logging Module**](logging).
### Actions
---
The currently available actions are:
- **Timeout**
	- The Timeout command allows you to time a member out for a set amount of time. Timing out a member causes them to no longer be able to speak or set reactions to messages.
	- **Default Duration** allows you to set a duration for how long the timeout lasts, which can be set to minutes or hours.
- **Mute**
	- The Mute command allows you to mute member for a set amount of time. Muting a member causes them to no longer be able to speak in your server.
	- **Default Duration** allows you to set a duration for how long the mute lasts, which can be set to minutes or hours.
	- **Hard Mute** will remove all roles from the member for the duration of the ban, make sure Monni has the permissions to remove roles!
	- **Sticky Mute** makes sure that if a member leaves and rejoins, they will remain muted.
- **Warn**
	- The Warn command allows you to add a warning to one of your members with an optional expiration date. This allows you to keep track of a user’s offenses so you can better decide their punishment.
	- **Default Duration** allows you to set a duration for how long the warning lasts before being removed from a member.
- **Ban**
	- The Ban command allows you to ban a member from your server for a set amount of time. Banning a member means they can NOT rejoin your server.
	- **Default Duration** allows you to set a duration for how long the ban lasts, which can be set to minutes or hours.
- **Kick**
	- The Kick command allows you to KICK a member from your server.
- **Purge**
	- The Purge Command allows you to delete a set amount of messages from a channel, and is very useful for removing mass NSFW or spam.
### Other Settings
---
#### Message
---
When you use a command, a message will be sent to the affected user. You can choose the depth of information you’d like to send to them.
- **No Messages**: No message will be sent to the affected user!
- **Server and Action**: The action committed and the server it was committed in will be sent to the user.
- **Server, Action, and Reason**: The action committed, the server it was committed, and the reason provided by the command executor will be sent to the user.
- **Server, Action, Reason and Moderator**: The action committed, the server it was committed, the reason provided by the command Moderator, and the Moderator username will be sent to the user.
#### Require 2FA
---
If activated, your Moderators will need to use Two-Factor Authentication every hour to use the command.

Not recommended for smaller servers, but very helpful for large servers that are vulnerable to Moderator accounts being hacked.














