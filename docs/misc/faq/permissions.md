---
title: Permissions
sidebar_position: 2
---
Permissions and why we need them

---

Monni is an extensive discord bot with a lot of features. With these features comes the need for multiple different permissions. After reading this article you will have a better understanding of what permissions we request and what they are used for.

### Terminology
---

- `actions`: Anything the user can make Monni do with features such as mass actions, role actions, or Simpukka.
- `...`: Future features
- `Moderation`: Moderation-related planned features.

#### Importance
---

Importance is an indicator of how important permissions are for the integrity of the bot. There are 4 levels.

- `Essential`: Missing these permissions may break most features of the bot.
- `Visual`: Missing this permission may cause some visual elements to break.
- `Important`: Missing these permissions could break some features of the bot but are not always required.
- `Optional`: Missing these permissions is unlikely to break anything major and are usually requested for future use-cases so you don’t have to reinvite the bot later on.

### Permissions
---

|Permission|Reason|features|Importance|
|---|---|---|---|
|Manage server|Management and editing of server|actions|Essential|
|Manage roles|Management and editing of roles|Verification, actions|Essential|
|Kick members|Kicking members|actions|Important|
|Ban members|Kicking members|actions|Important|
|Create invite|Creating invites|invite create command|Important|
|Manage nicknames|Changing nicknames|Verification, actions|Essential|
|Change nicknames|Changing bots own nickname|…|Optional|
|Manage webhooks|Create webhooks|logging|Essential|
|View audit log|Seeing audit log|logging|Important|
|Send messages|Sending messages|actions, logging|Important|
|Send messages in threads|Sending messages|actions, logging|Important|
|Create public threads|Create public threads|…|Optional|
|Create private threads|Create private threads|…|Optional|
|Manage messages|Delete messages|moderation|Important|
|Manage threads|Delete, create, edit threads|…|Optional|
|Embed links|Links in embeds|verification, logging|Visual|
|Attach files|Send files|logging|Important|
|Mention @everyone|Mention everyone, here and roles|Simpukka|Optional|
|Add reactions|React to messages|…|Important|
|Use external emoji|Gives access to external emojis|…|Visual|
|Use external sticker|Gives access to external stickers|…|Visual|
|Mute members|Voice channel muting access|moderation|Important|
|Deafen members|Voice channel deafen access|moderation|Important|
|Move members|Voice channel move access|moderation|Important|