---
title: Permissions
description: "Every Discord permission Monni asks for, what it is used for and what stops working if you leave it out."
sidebar_position: 3
---
Permissions and why we need them

---

Monni is an extensive discord bot with a lot of features. With these features comes the need for multiple different permissions. After reading this article you will have a better understanding of what permissions we request and what they are used for.

:::warning
We don't regularly update this page. If you have questions about permissions please join our [support server](https://monni.fyi/support/) and ask.
:::

### Terminology
---

- `actions`: Anything the user can make Monni do with features such as mass actions or role actions
- `...`: Future features
- `moderation`: The Moderation, Auto Mod and Anti Bot modules.

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
|Kick members|Kicking members|moderation, actions|Important|
|Ban members|Banning members|moderation, actions|Important|
|Moderate members|Timing members out|moderation, actions|Important|
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
|Mention @everyone|Mention everyone, here and roles|Message templates|Optional|
|Add reactions|React to messages|…|Important|
|Use external emoji|Gives access to external emojis|…|Visual|
|Use external sticker|Gives access to external stickers|…|Visual|
|Mute members|Voice channel muting access|moderation|Important|
|Deafen members|Voice channel deafen access|moderation|Important|
|Move members|Voice channel move access|moderation|Important|