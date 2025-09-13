---
title: Edit
---
# Edit

The edit command allows you to edit the point amounts of members. You can add and remove points from any member you choose. Guild owners can hide this command either by changing the permissions through the **Integrations Menu** in Discord settings or by changing the default permission within the Monni Dashboard.

:::slash
**Edit** is a [slash command](/commands/info/slash/)!
:::

:::warning
This command is a dynamic command. The existence and name of this command will change depending on the guild’s settings. In this case [**Points module**](modules/points.md) settings.
:::

## Arguments

- 1 **member:**  
    Member whose points to edit. Takes Discord ID or a name. If left empty defaults to the person who ran the command.

- 2 **amount:**  
    The **amount** of Points you would like to add. You can also use **negative numbers** (Remove Points).

- 3 **mode:**  
    The way you want the points to be edited
	- `add` is the default, and will add the `amount` specified to the current balance
	- `remove` will remove the `amount` specified from the current balance
	- `set` will set the current balance to the `amount` specified
	
- 4 **hidden:**  
    When set to `true`, will send the message as an ephemeral message only the command sender can see, while `false`, which is the default, will send a message anyone can see.

- 5 **reason:**  
	The reason displayed for points being edited when using the [history](/commands/slash/points/history) command.

- 6 **system:**  
	Only when the command is assigned to multiple systems. Selects which system is edited. Multiple systems cannot be edited at the same time.

## Customization

- **Systems**:  
	Which system's balance can be edited when using the command.