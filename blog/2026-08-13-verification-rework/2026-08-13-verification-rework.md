---
slug: verification-rework
title: Verification Rework
authors:
  - iraas
tags:
  - discord
---


Verification is our oldest module. Monni was initially built as a custom verification bot for a Roblox game faction, and it slowly evolved from there into the multipurpose bot it is today. Verification overall has been a smaller focus in the recent years and has been neglected in terms of features. Well that's not the case anymore, verification now finally supports other platforms than Roblox amongs them Minecraft.


## Multi Platform Verification
As we now have more than one platform to use for verification, we added support to configure which platforms are optional and which are mandatory. You can configure any combination of optional and mandatory platforms. For example you can do the following

### Optional Roblox
Roblox and Minecraft optional verification platforms both give their own channel access through their respective roles. With this, you can ensure the member verifies their account before getting access to the associated chats. 

### Mandatory Roblox Optional Minecraft
Let's say you run a Roblox community and want to have a Minecraft community server. You can set Roblox as a mandatory verification platform and Minecraft as an optional one which gives you access to the minecraft community channels.

:::info
We are working on a Minecraft plugin/mod which, lets you gate server access behind being in your Discord server and having a role.
:::

## Captcha
We brought back the Captcha system that we dropped during the website rework. This time, not as a separate service but as something you can enable to be required during verification. 

:::info
Captcha can also be enabled without any configured platforms, in which case members only need to complete the captcha to finish verification and get the associated roles.
:::

## Extensive API Support
To continue our journey of making third-party integrations possible, we added API support to get verified account information for servers.


## Passporting
Passporting is one of our more innovative ideas. It lets servers configure which servers can be trusted as a source of truth for verification, letting anybody who verified there skip verification in the server. This can be used when you have one hub server and then other servers people may join.

## Banning External Accounts
This is a feature many have requested: you can now make bans also ban external accounts. This stops a banned member from joining with an alt and verifying with the same account.
