---
sidebar_position: 3
title: Commands
slug: /modules/points/commands
---

### What are they?
---
Commands are how members interact with the [point systems](/modules/points/systems) set up in a server. There are 8 different commands, ranging from checking the balance of a member to accessing a [shop](/modules/points/shops) to spend points on actions.

### Setting up commands
---
Commands can be created by going to the dashboard, opening the `Points` module, and going to the `Commands` section, then finally pressing "Add commands".

Each command has a name, which will be what is typed in Discord to use the command. A command with the name `coins-balance` will be accessed in Discord as `/coins-balance`. Commands can only have names containing lowercase letters, numbers, and hyphens `-`.

The default permission decides what members can use a specific command. If `Everyone` is selected, then anyone in the server can see and use the command. If `Administrator` is selected, then anyone with a role with the administrator permission can see and use the command. Further customization cannot be done through the dashboard, but can be done through Discord using [this guide](/blog/slash-commands-permissions).

### Embed style
---
All commands come with a few premade styles, but further customization can be done by selecting "preview and edit". Depending on the type of command, there may be multiple versions based on the arguments being used, which can all be edited individually.

The embed editor uses [LiquidJS](https://liquidjs.com/) for logic to display information specific to the system and member using the command. These variables can be found under the `Context` section of the embed editor.

### Command types and specific settings
---
Each command has a type which decides how it will function, these commands and their specific settings can be found in the [Points Commands](/commands/slash/point-commands) section of the documentation, or by clicking on the orange name's of the commands below. 

1. [**Balance**](/commands/slash/points/balance) - Displays the amount of points a member has in each system.
2. [**Edit**](/commands/slash/points/edit) - Changes the number of points a member has for a given system.
3. [**Leaderboard**](/commands/slash/points/leaderboard) - Displays and ranks members based on how many points they have.
4. [**Item edit**](/commands/slash/points/item-edit) - Changes which and how many of a specific item a member has.
5. [**Inventory**](/commands/slash/points/inventory) - Displays all items a member has.
6. [**Shop**](/commands/slash/points/shop) - Opens a [shop](/modules/points/shops) which a member can buy items from.
7. [**History**](/commands/slash/points/history) - Displays logs of past actions using points from a specific system.
8. [**Send**](/commands/slash/points/send) - Sends points from the member using the command, to another specified member.

### Limits
---
To prevent Discord servers from overusing Monni's resources, there are restrictions to the number of commands which can exist in a single server.

This limit is 10 commands for a normal server. Limits can soon be increased indefinitely through our premium subscription.