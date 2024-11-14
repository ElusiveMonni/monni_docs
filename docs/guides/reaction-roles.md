---
title: Setting up Reaction Roles
sidebar_position: 8
---
###### A quick guide to self-roling using reactions!
___


### Why use reaction roles?
---

Reaction roles allow members in a server to role themselves for whatever appeals to them. It is used for choosing specific pings or identifying roles, like time zone, without the need for an admin to give roles to everyone personally.

### Setting up reaction roles
---

**First**, create a channel where the reaction roles message will be placed, preferably where no one else will talk, or else the message will get lost in a list of other messages.

![reaction-roles1](images/reaction-roles/reaction-roles1.png)

**Second**, go to the [*Monni Dashboard*](https://monni.fyi/dashboard), then go to your server and select the roles module. Next, under *Reaction roles* select "New reaction role".

![reaction-roles2](images/reaction-roles/reaction-roles2.png)

**Third**, in the menu that has just popped up, press "Configure Message" to open the message editor and in the top left corner click the brush to clear the template message.

![reaction-roles3](images/reaction-roles/reaction-roles3.png)

**Fourth**, create a message to explain what each role's purpose is to make choosing easier for server members.

The easiest way to do this is using primarily the `Message Content` and `Fields` fields in the editor.
- The `Message Content` field is for all information outside of the embed.
- Create a title in the `Title` field for the embed which will be bolded and sightly larger than other text in the embed.
- The `Fields` field creates sections with a bolded title in the embed that can be used for explaining the purpose of each available role.
- The "Embed Colour" option allows you to set the color of the left border of the embed, in this case, red.

![](images/reaction-roles/reaction-roles4.png)

**Fifth**, press return and set the channel the reaction role message will be sent in and the buttons that will be under the embed that assign the roles.

- The `text` field is optional, but can be used instead of specifying the emoji that each role is related to in the message created in step four.
- The "Select emoji" button allows you to choose an emoji that will be displayed in the button.
- The `role` field will allow to select what role is applied by each button, the role must be <u>under</u> Monni in the role hierarchy to be selected, as described in the [**Monni Role Position**](monni-role-position) guide.
- A color for the button can also be selected, but the available options of blue, green, red, and gray are the only colors supported by Discord.

![reaction-roles5](images/reaction-roles/reaction-roles5.png)

**Finally**, press *send* and the message will appear in the channel you chose. Reaction roles will still work with people who already have them, as the role removed on press instead of added.

![reaction-roles6](images/reaction-roles/reaction-roles6.png)