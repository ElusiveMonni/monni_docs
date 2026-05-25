---
title: Setting up Reaction Roles
sidebar_position: 8
---
###### A quick guide to self-roling using a message!
___

### Why use reaction roles?
---

Reaction roles allow server members to role themselves as they wish. It is used for choosing specific pings, like game nights, or identifying roles, like time zones, without the need for an admin to give roles to everyone individually.

### Setting up reaction roles
---

1. Create a channel where the reaction roles message will be placed, preferably where no one else will talk, otherwise the message will get lost in a long list of other messages.

![reaction-roles1](images/reaction-roles/reaction-roles1.png)

2. Go to the [*Monni Dashboard*](https://monni.fyi/dashboard), then go to your server and select the roles module. Next, under *Reaction roles*, click the plus.

![reaction-roles2](images/reaction-roles/reaction-roles2.png)

3. Add the buttons which will be under your embed. (These assign the roles)
- The `label` field is optional, but can be used to specify the role that each button is related to in the message you will create instead of (or with) an emoji.
- Pressing the emoji allows you to choose an emoji that will be displayed in the button, this also supports server emojis!
- The `role` dropdown allows you to select what role is applied by each button, the role must be *under* Monni in the role hierarchy to be selected, as described in the [**Monni Role Position**](monni-role-position) guide.
- A color for the button must be selected. Unfortunately, blue, green, red, and grey are the only colors supported by Discord.
	- The `name` field is solely for use within the dashboard.
	- Due to Discord limitations on embeds, only five buttons can be added to a message, though multiple messages can be sent.
	- More information about the mode, whitelist, and blacklist can be found in the [Roles Module](/modules/roles#reaction-roles) documentation.

![reaction-roles3](images/reaction-roles/reaction-roles3.png)

4. Next, press and open the "message" tab near the top. From here, you can edit the message that is sent along with the buttons.
- It can be used to explain the roles and the emoji/button each one corresponds to.
- Be creative! There is a *lot* of customization in this message builder. A simpler one from our support server can be found below.

![reaction-roles4](images/reaction-roles/reaction-roles4.png)

5. Press send! ... *still not done, though*
 - Select the channel the reaction roles message should be sent to.
 - **Now** press send, and repeat for any other roles that may be needed.

![reaction-roles5](images/reaction-roles/reaction-roles5.png)

---

Need something else? Don't forget to join the [community server](https://discord.gg/kEKuDRE3Jv) for help with issues, and also as a place to hang out!