---
slug: logging-rework
title: Logging Rework
authors:
  - iraas
tags:
  - discord
---

Logging rework is smaller in scale than the other reworks we have done. It isn't glamorous, but
improves the stability of logs and brings a few features.



## Log Policy
We ended up adding a feature which lets you configure when logs should be sent. You can choose to only send logs where the author of the log event is known. In addition, you can exclude certain roles, channels and members from logs completely.

## Log Event Overwrites
In our old system, logs were limited to one channel per category. Now each individual log event can be set to it's own channel.


## Linked Channels
With logging, we introduced linked channels. You can now use channels that normally don't show up in the channel selector, like threads, for logging. It also allows you to set another Discord server's channels as a log channel. 

:::info
Read more about linked channels [here](/general-settings/linked-channels).
:::


## Message Edit & Delete Content
You can now configure message delete and edit logs to not contain the message itself. This can be useful if you need to follow privacy laws like GDPR or want to give your members better privacy.