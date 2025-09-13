---
title: Mute
---
# Mod | Mute Command

The Mute command allows you to mute members for a set amount of time.

Muting a member causes them to no longer be able to speak in your server.

---
## Arguments

- **1 Default Duration**
    This section allows you to set a duration for how long the mute lasts.  
    You can set it to minutes or hours.

    ![default_duration.png](https://docs.monni.fyi/default_duration.png)

- **2 Message:**
    When you use a command, a message will be sent to the affected user. You can choose the depth of information you’d like to send to them.

    *Message Details*

    ##### No Messages:  
    No message will be sent to the affected user!

    ##### Server and Action:  
    The action committed and the server it was committed in will be sent to the user.

    ##### Server, Action, and Reason:  
    The action committed, the server it was committed, and the reason provided by the command executor will be sent to the user.

    ##### Server, Action, Reason and Moderator:  
    The action committed, the server it was committed, the reason provided by the command Moderator, and the Moderator username will be sent to the user.


- **3 Hard Mute:**
    If activated, this will remove roles from the member. Once the mute ends, the roles will be  added back.

  >Make sure Monni has the appropriate permissions to remove the roles!

- **4 Sticky Mute:**
    Will make sure that if a member leaves and rejoins, they will remain muted.
---

## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every hour to use the command.

Not recommended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.