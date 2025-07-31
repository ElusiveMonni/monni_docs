---
title: Balance
---
# Balance

The balance command gives you the ability to check how many points you or your members have. Guild owners can hide this command either by changing the permissions through the **Integrations Menu** in Discord settings or by changing the default permission within the Monni Dashboard.

:::slash
**Balance** is a [slash command](/commands/info/slash/)!
:::

:::warning
This command is a dynamic command. The existence and name of this command will change depending on the guild’s settings. In this case [**Points module**](modules/points.md) settings.
:::

## Arguments

- 1 **member:**  
    The member whose balance is displayed. Takes discord ID or a name. If left empty, will default to person who ran the command.
- 2 **hidden:**  
    Whether the message will be ephemeral (`true`) or visible to everyone (`false`). Defaults to `false`.
- 3 **system:**  
    Only used when the command is set up for multiple systems. If a system is selected using its alias, then only that system will show up in the command, otherwise all systems will appear.

## Customization

- **Systems**:  
	Which systems balance will be showed when using the command. When selecting multiple will show all systems selected and use a different embed