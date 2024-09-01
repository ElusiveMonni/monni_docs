---
slug: discord-hierarchy
title: Discord hierarchy explained
authors:
  - iraas
tags:
  - discord
---
# Role hierarchy and permissions

Discord uses hierarchy based permissions system for guild management. This is a very powerful system but the ability for hierarchies to overlap and overwrite each other creates a very complex and at times difficult to understand system. In the hierarchy position matters of role matters. For example, kicking, banning, changing roles cannot be done on a person higher than you in the hierarchy.

:::warning
Administrators can bypass every other hierarchy permission other than affecting people higher in the hierarchy.
:::


## Common pitfalls
Before we look at how the role hierarchy works in detail lets go over a few common issues with the role hierarchy system

<!-- truncate -->
### Color only roles
Many guilds have roles only for the purpose of providing certain color of username. This is fine but due to nature of inheritance of permissions can have unwanted consequences. Let's look at the following example role structure as an example. 

![role_hierarchy_bad.png](images/role_hierarchy_bad.png)

The issue isn't obvious but the inheritance of permissions and how the highest person is determined causes issues here. Let's assume a person called smith has `junior staff` role and wants purple name so they are given `Purple` role. Purple role inherits all the permissions of junior staff in this case time out and kick. Smith now has the ability to kick or timeout any admin or staff who lack purple role. This is due to purple role being higher in the hierarchy than staff or admin and inheriting the permissions of junior staff. One way to fix this is to sacrifice the role colors of admin, staff and junior staff.

![role_hierarchy_good.png](images/role_hierarchy_good.png)
Now even if Smith has the purple role he can't kick people above him in the hierarchy. Only issue is that color of staff roles was lost. This works due to the color logic being based on the highest role with color.

## Role permissions
The highest level of the permission system. Each role can have its own set of permissions and then these roles can be used later to set channel level exceptions. Roles are based on hierarchy system where each role is in some spot in the hierarchy.

### What is @everyone in role permissions?
Everyone role like the name states gives the perms selected to any role in the server. So if you wanted everyone to be able to change nicknames you could set it possible for everyone trough `@everyone` role.
## Hierarchy based permission
Some permissions like kicking depend heavily on hierarchy to determine who can kick who. You can only do these actions like kick on people lower than you in the hierarchy. People who are at the same level or higher are immune. Following actions follow this rule.
- Nickname change.
- Kick.
- Ban.
- Timeout.
- Mute and deafen.
- Role giving and removal.

:::info
Server owner is always considered the highest person in hierarchy.
:::
## Permission inheritance
In the role hierarchy the users highest role in hierarchy inherits all the permissions. A simple example would be permission giving moderator role permissions being inherited by visual moderator role like “Senior staff”. In this case “Senior staff” would get all the permissions of lower roles including moderation perms. This is good but has the effect of person potentially having higher hierarchy position than expected.

:::info
Role color and icon are determined from the highest roles which have these.
:::

## Channel and category permissions
Channels and categories can have their own permissions. These overwrite the permissions of roles. Let's start with what different permission options mean.

![icons.png](images/icons.png)

`X` Means that a permission is disabled from role/user

`/` Means default permission. On `@everyone` role this means using the permissions of the roles the person has. In every other case it will use the permission set on `@everyone`.

Check mark means the permission is enabled on role/user
### What is @everyone in channel permissions?
`@everyone` functions as the default template for permissions. It's the only permission excluding server wide roles ones you can overwrite in every other case if role enables permission it cannot be disabled with any other role regardless of hierarchy. This is the reason mute roles don't work well on private channels. Let's say you want to disable sending messages for everyone but staff, you could disable send messages and everyone and overwrite staff role to have access to sending messages.

:::info
Administrator permissions can't be overwritten trough channel/category permissions.
:::

### Category permissions
Category permissions work the same way as channel ones but are only applied to channels which are synced with the category. When channel is synced it inherits all the permissions of the category. Changes in category permissions automatically apply to all synced channels.


## Useful resources
https://support.discord.com/hc/en-us/articles/206029707-Setting-Up-Permissions-FAQ
https://support.discord.com/hc/en-us/articles/214836687-Role-Management-101
https://support.discord.com/hc/en-us/articles/10543994968087-Channel-Permissions-Settings-101