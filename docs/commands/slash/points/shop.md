---
title: Shop
---
# Shop

The shop command allows members to access and buy items from created shops. Guild owners can hide this command either by changing the permissions through the **Integrations Menu** in Discord settings or by changing the default permission within the Monni Dashboard.

:::slash
**Shop** is a [slash command](/commands/info/slash/)!
:::

:::warning
This command is a dynamic command. The existence and name of this command will change depending on the guild’s settings. In this case [**Points module**](modules/points.md) settings.
:::

## Arguments

- 1 **shop:**  
	Only appears when multiple shops are assigned to the command. Specifies which shop is opened.
- 2 **hidden:**  
	When set to `true`, will send the message as an ephemeral message only the command sender can see, while `false`, which is default, will send a message anyone can see.

## Customization

There is no customization for the embed style of this command.

- Shops:  
	Which shops can be opened and purchased from when using the command.