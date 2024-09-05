---
title: Discord user
sidebar_position: 3
---

Common information of a discord user.

## Structure
```mermaid
flowchart LR
    user[(user)]

   id{{id}}
   click id callback "Id of the user."
   user --- id

   name>name]
   click name callback "Name of the user."
   user --- name

   global_name>global_name]
   click global_name callback "Global username. One unique to your account."
   user --- global_name

   bot{bot}
   click bot callback "Whether a user is a bot or not"
   user --- bot
   
   system{system}
   click bot callback "Whether user is a system user or not."
   user --- system

   display_name>display_name]
   click display_name callback "Display name of the user"
   user --- display_name

   mention>mention]
   click mention callback "Mention string for mentioning the user."
   user --- mention

   avatar>avatar]
   click avatar callback "Url to users avatar."
   user --- avatar


```
## Documentation

### id - int
Id of the user.

### name - str
Name of the user.

### global_name - str
Global username. One unique to your account.

### bot - bool
Whether a user is a bot or not.

### system - bool
Whether a user is a system or not.
### avatar - str
Url to users avatar.
### mention - str
Mention string for mentioning the user.



