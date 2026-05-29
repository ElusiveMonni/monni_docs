---
sidebar_position: 2
title: Logging
---
###### Module for overseeing everything happening in your server
***

The Logging Module allows you to keep track of all server related events such as moderation, channel and member events.

:::info
It boasts over 60+ events that can be logged and configured!
:::

:::note
Looking for help setting up some logging? See our guide with full details: **[Building Your Logging System!](/guides/logging-guide)**.
:::

### Events
***

Events are grouped into their relevant categories and each category can be configured in the **Logging settings** to send logs to a specified channel:

- Invite events - Invite delete, Invite usage, Invite creation
- Members leave and join - Join message, Leave message
- Verification events - Account completion, Account removal, Account change
- Automod events - Rule create, Rule update, Rule delete
- Channel events - Channel deletion, Channel creation, Channel update, Thread create, Thread delete, Thread update
- Voice events - VC join, VC leave, VC move
- Guild events - Server update, Emoji update, Emoji removal, Emoji creation, Sticker update, Sticker removal, Sticker creation, Role creation, Role deletion, Role update, Event creation, Event deletion, Event update
- Integration events - Webhook edited
- Moderation events - VC mute, VC unmute, VC deafen, VC undeafen, Mute, Timeout, Ban, Kick, Warn, Unban, Remove timeout, Unmute
- Member events - Nickname change, Role remove, Role give, Guild avatar change
- Message events - Message edit, Message delete, Bulk message delete, Reaction clear, Reaction clear all, Message pinned, Message unpinned
- Point events - Point edit, Shop purchase, Milestone reached, Points sent
- Item events - Item given, Item removed

#### Notes
---

:::note
**Invite Tracking**  
**Invite Tracking is included within the Logging Module.** This includes who created the invite, when it is created, and who used the invite. A great tool for moderation.
:::

***
