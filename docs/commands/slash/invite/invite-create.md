---
title: Invite Create
slug: commands/slash/invite/invite-create
---
# Invite Create

A command for creating a new invite.

> **Invite Create** is a [slash command](https://docs.monni.fyi/tutorials/slash-commands)!

> **Invite Create** is a [ephemeral command](https://docs.monni.fyi/tutorials/ephemeral-commands)!

> **Invite Create** is an [administrator command](https://docs.monni.fyi/tutorials/administrator-commands)!

## Arguments

1. **Reason:**  
    The reason for creating the invite. It’s shown in your server’s **Audit logs**. Defaults to an empty paragraph.
    
2. **Max_uses:**  
    The max uses of an invite. Has to be a number between 0 and 100. Zero being infinite. Defaults to infinite.
    
3. **Max_age:**  
    The expiration time of an invite as seconds. Has to be a number between 0 and 604800. Defaults to infinite.
    

## 🔒 Required permissions

Ensure Monni has the following permissions.  
`Create Invite`