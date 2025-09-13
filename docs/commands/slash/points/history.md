---
title: History
---
# History

The history command displays recent actions performed involving a point system for a member. Guild owners can hide this command either by changing the permissions through the **Integrations Menu** in Discord settings or by changing the default permission within the Monni Dashboard.

:::slash
**History** is a [slash command](/commands/info/slash/)!
:::

:::warning
This command is a dynamic command. The existence and name of this command will change depending on the guild’s settings. In this case [**Points module**](modules/points.md) settings.
:::

## Arguments

- 1 **member:**  
	Decides which member's logs will be accessed.

- 2 **system:**  
	Only appears when multiple systems are selected. Chooses which system's logs will be shown.

- 3 **hidden:**  
	When set to `true`, will send the message as an ephemeral message only the command sender can see, while `false`, which is the default, will send a message anyone can see.

## Customization

- **Systems**:  
	Which systems can have their history viewed when using the command. Only one can be viewed at a time.