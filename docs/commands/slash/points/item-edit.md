---
title: Item Edit
---
# Item Edit

The item edit commands adds items to a member's inventory without them needing to be purchased through a shop. Guild owners can hide this command either by changing the permissions through the **Integrations Menu** in Discord settings or by changing the default permission within the Monni Dashboard.

:::slash
**Item Edit** is a [slash command](/commands/info/slash/)!
:::

:::warning
This command is a dynamic command. The existence and name of this command will change depending on the guild’s settings. In this case [**Points module**](modules/points.md) settings.
:::

## Arguments

- 1 **member:**  
	The member who receives the item.
- 2 **item:**  
	The name of the item being added.
- 3 **amount:**  
	How many items will be added to a member (can be negative to remove items)
- 4 **hidden:**  
	Whether the command will be visible to everyone or just the person using the command.

## Customization

This command has no customization beyond changing the embed style.