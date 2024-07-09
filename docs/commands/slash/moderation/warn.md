---
title: Warn
---
# Warn Command

The Warn command allows you to add a warning to one of your members with an optional expiration date.

This allows you to keep track of a user’s offenses so you can better decide their punishment.

## Default Expiration

This section allows you to set a duration for how long the warn lasts before expiring (Being removed from the member).  
You can set it to minutes or hours.

![expiration.png](https://docs.monni.fyi/expiration.png)

## Message

When you use a command, a message will be sent to the affected user. You can choose the depth of information you’d like to send to them.

![message.png](https://docs.monni.fyi/message.png)

### Message Details

**No Messages**:  
No message will be sent to the affected user!

**Server and Action**:  
The action committed and the server it was committed in will be sent to the user.

**Server, Action, and Reason**:  
The action committed, the server it was committed, and the reason provided by the command executor will be sent to the user.

**Server, Action, Reason and Moderator**:  
The action committed, the server it was committed, the reason provided by the command Moderator, and the Moderator username will be sent to the user.

## REQUIRE 2FA

If activated, your Moderators will need to use Two Factor Authentication every hour to use the command.

Not reccomended for smaller servers. But very helpful for large servers that are vulnerable to Moderator accounts being hacked.