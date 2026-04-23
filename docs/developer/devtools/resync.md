---
title: Resync
sidebar_position: 4
---
##### Syncing commands that may not be up-to-date
---

Sometimes, Monni is unable to receive info about new changes to commands, like adding role override, due to rate limits or other communication issues with Discord. This command will call for all information relevant to the command from Discord to resync our servers with the newest information.

### Usage
---
The resync command can be sent by typing `<@911945727402471455> devtools resync`, which will then go through each command and register them with the latest information.

To prevent misuse, this is limited to once an hour within a server and can only be accessed by members with the administrator privilege.

### What does it fix?
---
Custom commands can fail to be created within Discord when too many are created in a short period. This rate limits the server, and Monni does not automatically resend command creation attempts, but will when this command is used.

If commands are inaccessible to members with the proper overridden roles (see [this guide](/blog/slash-commands-permissions) on how to override roles), then resyncing will send Monni the roles that now have access.
