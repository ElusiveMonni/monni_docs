---
title: Invite Create
slug: commands/slash/invite/invite-create
---
# Invite Create

A command for creating a new invite.

:::slash
**Invite create** is a [slash command](/commands/info/slash/)!
:::

:::ephemeral
**Invite create** is a [ephemeral command](/commands/info/ephemeral)!
:::

:::admin
**Invite create** is an [administrator command](/commands/info/admin)!
:::

## Arguments

- 1 **Reason:**  
    The reason for creating the invite. It’s shown in your server’s **Audit logs**. Defaults to an empty paragraph.
    
- 2 **Max_uses:**  
    The max uses of an invite. Has to be a number between 0 and 100. Zero being infinite. Defaults to infinite.
    
- 3 **Max_age:**  
    The expiration time of an invite as seconds. Has to be a number between 0 and 604800. Defaults to infinite.
    

## 🔒 Required permissions

Ensure Monni has the following permissions.  
`Create Invite`