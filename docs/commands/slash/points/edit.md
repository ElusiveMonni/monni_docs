---
title: Edit
---
# alias-Edit

The Edit command allows you to edit the point amounts of members. You can add and remove points from any member you choose.

:::slash
**Dashboard** is a [slash command](/commands/info/slash/)!
:::

> This command is a dynamic command. The existence and name of this command will change depending on the guild’s settings. In this case [**Points module**](/modules/points) settings.

---

## Arguments

- 1 **Member:**  
    Member whose points to edit. Takes Discord ID or a name. If left empty defaults to person who ran the command.
    
- 2 **Amount**  
    The **amount** of Points you would like to add. You can also use **negative numbers** (Remove Points).
    
- 3 **Mode**  
    The way you want the points to be edited
	- `add` is the default, and will add the `amount` specified to the current balance
	- `remove` will remove the `amount` specified from the current balance
	- `set` will set the current balance to the `amount` specified
	
- 4 **Hidden**  
    When set to `true`, will send the confirmation message as an ephemeral message only the command sender can see, while `false`, which is default, will send a confirmation message anyone can see
    
## 🔒 Required permissions

Administrator permissions required.