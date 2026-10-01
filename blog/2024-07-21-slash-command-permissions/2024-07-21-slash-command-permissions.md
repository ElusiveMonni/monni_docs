---
slug: slash-commands-permissions
title: Changing slash command permissions
description: "Control who can use a bot's slash commands and in which channels, using the Integrations menu in your Discord server settings."
authors:
  - iraas
tags:
  - release-note
---
Discord has a built-in support for changing who and where slash commands and context menus can be used.

:::warning
In order to change permissions of commands you need to be an administrator of the server!
:::

:::danger
Changing these settings isn't supported in the mobile versions of discord.
:::


## Changing permissions
To get started head to server settings.

![Server menu in Discord opened from the server name, with Server Settings selected](images/server-settings-example.png)
<!-- truncate -->
Then scroll down to integrations

![Discord server settings sidebar with Integrations selected under Apps](images/server-open-example.png)

From integrations find `Bots and Apps` then select Manage on Monni
![Bots and Apps list in a server's Integrations settings, with the Manage button next to Monni](images/integrations-select-example.png)Once manage has been opened its possible to change command permissions single command at a time or globally.

:::info
These limits don't apply to members with the administrator permission.
:::

### Global overwrites

![Command permissions for @everyone, with the roles, members and channels that can use Monni's commands](images/global-example.png)Roles and members dictates who can use the commands. By default, everyone can use the bots commands which require no permissions. Global settings don't overwrite the required permissions, but they dictate which people are given chance to qualify for using the command.

Channels dictates which channels the commands can be used in. By default, any command can be used in any channel, but you can change this to for example limit command usage to only commands channel.


### Single command overwrites

![List of Monni's commands in the Integrations settings, with Has Overrides shown next to /dashboard](images/individual-command-example.png)

:::info
Command with overwrite
![A command in the list marked Has Overrides](images/override.png)
:::


Single command overwrites differ from global ones as they can be used to overwrite default Monni command permissions. This can be dangerous so **ensure you don't make dangerous commands usable by everyone.** Single command overrides take precedent over global overrides.

Example of a potential overwrite
![Permission overrides for the /dashboard command that block the Muted role and only allow the general channel](images/override-modal-example.png)In the above overwrite the role muted has the ability to use the /dashboard command removed. The command is also disabled in every other channel than general.


:::danger
Role & Member takes precedent over default Monni permissions. Ensure you are changing the intended command and overrides are correct.
:::

---

:::info
Need help of have suggestions? Join our [support server](https://discord.gg/E8nYdQfqA3).
:::