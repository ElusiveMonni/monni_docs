---
sidebar_position: 5
title: Roles
---
###### Module for managing member roles
***
The roles module lets you manipulate roles in special ways. See below for details on all of the tools we offer!
### Role Tools
---
1. **Chain Roles**
- Chain Roles are roles which are assigned to members once they are given another role
	- When editing, the `initial role` is the role a member needs to be given to receive the `chained role`
	- If *directional chaining* is checked, chaining happens both ways rather than one way
		- Losing the `initial role` will always remove the `chained role`, while losing the `chained role` will only remove the `initial role` with this checked
2. **Join Roles**
- Join Roles are automatically assigned to members when they join a server
- Multiple can be selected at the same time from the dropdown menu
3. **Sticky Roles**
- Sticky Roles are returned to members if they rejoin after leaving with them
- Multiple can be selected at the same time from the dropdown menu

### Reaction Roles
---
Unlike the other tools, this one cannot be explained in a couple bullet points without leaving out important information.

Reaction roles sends a message with buttons a member can press to add roles to themselves.
- Due to embed restrictions within Discord:
	- Only 5 roles can be added to a single message
	- Buttons can be one of four colors: Blue, ~~gray~~ grey, green, or red
- Buttons can also include an emoji, text, or both to distinguish them
- The rest of the embed can be edited within the "Message" menu, which allows for further explanation of what role each button gives, tailored to any use case

Members with certain roles can be whitelisted or blacklisted from using the embed to edit their roles:
- Members with a `Whitelist role` will have the buttons add or removed roles
	- Adding no roles to the whitelist defaults to everyone having access
- Members with a `Blacklist role` will be able to press buttons on the embed, but Monni will not edit their roles when they do.

The `Mode` of the reaction role determines how Monni handles when members press buttons.
- On `Normal`, buttons will either add their role when pressed, or remove it if the member already has it
- On `Unique`, only one role can be applied at a time
	- If a member has other roles in the set, they will be removed when they add another
- On `Give only`, members receive a role when they press the button
	- Pressing the buttons will do nothing if the member already has the role
- On `Remove only`, members lose a role when they press the button
	- Pressing the buttons will do nothing if the member does not have the role
- On `Limit`, members can only gain a specified number of roles from the set of five
	- Pressing the button of a role a member already has will remove it
	- Pressing the button of a role a member does not have while at or above the limit will remove it