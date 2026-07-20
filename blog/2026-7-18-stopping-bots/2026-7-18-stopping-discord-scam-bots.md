---
slug: stopping-bots
title: Stopping discord spam bots
authors:
  - iraas
tags:
  - discord
---
We have all seen Discord spam bots, either in our direct messages or servers we frequent. They are more than annoying. Perhaps you or your friend has fallen for them in the past. We can't promise to stop these bots from joining your server or messaging you, but we *can* detect them and automatically delete the messages.

## Introducing Monni's Anti Bot module
Our Anti Bot module provides the tools a server owner may need to combat the ever increasing wave of spam bots. We detect common behaviours of bots and react in a way based on how you configure the security metrics. To get started,<!-- truncate --> invite [Monni](https://monni.fyi/invite) and then head to your [server dashboard](https://monni.fyi/dashboard). From there, head to the Anti Bot module and enable `Multi Channel Messaging` detection. Once that's enabled, we recommend enabling "delete message" and "timeout actions". You can also enable kicking in the case you don't want to waste scam bot resources. At the time of writing this blog post, we would recommend kicking scam bots as the detection isn't bullet proof.

:::info
We are currently investigating the best method to ensure false positives are unlikely, and a way to waste as much resources from these bots as possible.
:::


## What are honeypot channels?
Honeypot channels are a way to set some channels to have a higher valuation on bot detection. Sending messages within a honeypot channel isn't an instant detection, but we recommend informing members to not use the channel.

## Why not just use honeypot channels?
Most of the current solutions based on honey pot channels use predictable channel names or channel names which are nonsense. If these channels become a problem for bot creators, they will find a way to avoid these through bypassing the security measures fully.

## Keeping bots and why it might be good
As long as Monni detection works, bots are basically harmless. By keeping them in your server you are locking them out of one extra server where they could cause havoc. Although this can be good if done by a collective, we don't recommend doing this as of now as false positives can happen. 


