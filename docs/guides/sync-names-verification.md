---
title: Synching Names with Verification
sidebar_position: 7
---
##### Our guide for more in depth use of verification!
---

You may have noticed the need to set the **nickname** of your members to their username used in a *third party service*. Well, you're in luck! Our **Verification Module** can easily do this for supported services.

### Setting up nicknames
---

First, you need to understand the basics:
- Words separated by dots (`.`) inside double curly brackets (`{{}}`) are considered variables.
- Variables consist of a **root** and **value** structured `root.value`.

These variables are replaced by information stored for each unique user. For example, replacing the variable with a person's Roblox username will be written `{{roblox.name}}`, and anything left outside the curly brackets would be the same for everyone.

Some examples of correct and incorrect variables are:
1. `roblox.name` - This is incorrect, and will nickname everyone "roblox.name" when they verify.


![nick-example1](images/sync-names-verification/nick-example1.png)

1. `{{roblox.name}}` - This is correct, and will nickname everyone their unique username when they verify.


![nick-example2](images/sync-names-verification/nick-example2.png)

1. `{{member.display_name}} [{{roblox.name}}]` - This is correct, and will nickname everyone first with their username, then their Roblox name afterwards within brackets.

![nick-example3](images/sync-names-verification/nick-example3.png)


### Common variables
---
- `member.name` - Unique name of the Discord member
- `member.display_name` - Non-unique username of the Discord member
- `roblox.name` - Connected Roblox account name, only available when Roblox is used for verification

### Curly brackets in the nickname
---

This can be done simply by adding `{{ "{" }} other stuff {{ "}" }}`.

:::info
This feature is powered by [**Simpukka**](/simpukka), for more complex nicknames please refer to Simpukka documentation.
:::