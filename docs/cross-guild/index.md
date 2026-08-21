---
sidebar_position: 2
title: Cross Guild
---
The cross guild feature lets you provide other Discord servers limited access to your server and vice versa.


:::info
Cross guild requires both servers to have premium.
:::


## Connecting Two Guilds
1. Head to [dashboard](https://monni.fyi/dashboard/)
2. Go to cross guild settings
3. Press new connection, provide the [server's ID](/blog/guild-id), then send the request.
4. Wait for the other server to accept it from cross guild settings.
5. Once accepted, select the guild from cross guild settings and request the required permissions.
6. The other server needs to accept the permission request from their cross guild settings before it takes effect.

:::info
A server can also grant permissions directly from their cross guild settings, without needing to receive or accept a request first.
:::

## Cross Guild Permissions

| **Group**               | **Name**               | **Use**                                                                                          | **Feature**                  |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------- |
| **Role Permissions**    | `read_roles`           | Read role information about the guild and notify on changes.                                     | role sync                    |
| **Role Permissions**    | `write_roles`          | Edit roles in the server.                                                                        | None                         |
| **Verification**        | `read_verification`    | Read verification state. Just information about if user has verified. No verified account data.  | Verification Passporting     |
| **Verification**        | `read_linked_accounts` | Read verification state. Same information the server itself has received about verified account. | Verification Passporting     |
| **Verification**        | `share_ban_identity`   | Shares banned external accounts information.                                                     | External account ban sharing |
| **Channel Permissions** | `write_channels`       | Send messages to channels.                                                                        | Linked channels              |
