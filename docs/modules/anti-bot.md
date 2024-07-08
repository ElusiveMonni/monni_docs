---
sidebar_position: 8
title: Anti Bot
---
###### Module for preventing bot spamming and raiding
***
The Anti Bot Module is a module designed to prevent bots from spamming within a server. It comes with an array of options to punish bots and prevent false positives.
### General Settings
---
The settings for how the module detects and responds to bots is customizable to your needs! The currently available settings are:
- **Report Channel**
	- When a bot is detected and reporting is enabled in actions, the bot will send a message to the channel selected to notify people of the detection.
- **Bot Policy**
	- We currently have 3 levels of strictness in how Monni will detect a bot.
		- Choose between **lenient**, **standard**, and **strict**.
		- Higher levels of strictness may give more false positives.
- **Action**
	- Multiple actions can be selected.
	- **Report** will send a message to the channel selected.
		- Useful when combined with the [**Logging Module**](https://monni-docs-f7dj.onrender.com/modules/logging).
	- **Delete Message** will delete whatever messages trigger the detection of the bot.
	- The other actions available for bot punishment are covered in the [**Moderation Module**](https://monni-docs-f7dj.onrender.com/modules/moderation).
### Multi Channel Messaging
---
When enabled, **Multi Channel Messaging** will detect members that send multiple messages to separate channels in a short period of time.

- **Require Same Content** means that Monni will only detect a member for typing the same message in separate channels, and can be used to reduce false positives.