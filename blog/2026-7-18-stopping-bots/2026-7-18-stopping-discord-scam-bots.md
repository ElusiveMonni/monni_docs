---
slug: stopping-bots
title: Stopping discord spam bots
authors:
  - iraas
tags:
  - discord
---
We have all seen discord spam bots either in our direct messages or servers we frequent. They are annoying. Maybe you or your friend as fallen for them in the past. We can't promise to stop these bots in dm or from joining your server but we can detect them and automatically delete the messages.

## Introducing Monni anti bot module
Our anti bot module provides the tools server owner may need to combat the ever increasing wave of spam bots. We detect common behavior of bots and act on the bots in the way you configured. To get started<!-- truncate --> invite [Monni](https://monni.fyi/invite) and then head to your [servers dashboard](https://monni.fyi/dashboard). From there head to anti bot module and enable `Multi Channel Messaging` detection. Once that's enabled we recommend enabling delete message and timeout actions. You can also enable kicking in case you don't want to waste scam bot resources. At the time of writing this blog post we would recommend kicking scam bots as the detection isn't bullet proof.

:::info
We are currently investigating the best method to ensure false positives are unlikely and a way to waste as much resources from these bots as possible.
:::


## What are honeypot channels?
Honeypot channels is a way to set some channel to have higher valuation on bot detection. Sending message in it isn't instant detection but we recommend informing members to not use the channel.


## Why not just honeypot channels
Most of the current solutions based on honey pot channels use predictable channel names or channel names which are non sense. If these channels become problem for bot creators they will find a way to avoid these bybassing the security measure fully.

## Keeping bots and why it might be good
As long as Monni detection works bots are basically harmless. By keeping them in your server you are locking them out of one extra server where they could cause havoc


