---
title: Member left
description: "Run an automation when someone leaves your server, for example to post a goodbye message or note it in a log channel."
---
# Member left

The member left trigger runs every time someone leaves your server, whether they left on their own or were kicked or banned. Bots leaving don't trigger it.

![Member leaves the server trigger, which has no settings](assets/trigger-member_left.webp)


## Options
This trigger has no options.

## Variables
- `{{member}}` | The member who left, like `{{member.name}}`.

:::warning
The member has already left when the trigger runs, so actions that change them, like giving roles, won't work. Sending messages and changing points still work.
:::
