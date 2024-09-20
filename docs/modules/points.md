---
sidebar_position: 3
title: Points
slug: /modules/points
---
###### Module for building currency systems
---
Our Points Module is a highly configurable section of Monni, which is designed for building currency based systems around Points.

This module allows you to create your own Shops and Point Based systems, where people can earn things like **Roles**, **Badges**, and **Items**.

:::info
This Module has a lot of Commands that work with it. Check [**HERE**.](/commands/slash/point-commands)
:::

:::info
The Points Module also goes hand in hand with the [**Rewards Module**](rewards)
Check it out!
:::

***
### Point System
---
You can create a new point system by doing the following:

1. Going to [https://monni.fyi](https://monni.fyi) and signing into your account.  

2. Heading over to the dashboard and selecting a server to configure.  

3. Clicking “Points” on the sidebar. (It is on the left)  

4. Configure the panel that pops up on the right to your needs!
### Point System Configuration
---
You can change a lot with your new Point System. This includes:

- **Name of the Point System** | _Will also be the name of the currency_

- **Alias** | _Used as prefix on the commands._

- **The Type Of Point System** | _You can use an internal system or a custom one. Internal systems are automatically managed and incremented, like the “**invited people**” system._

- **Balance Checking** | _Whether a person can check their own currency balance or not._

- **Allow or Deny Currency Usage** | _(Trading of Points.)_

- **Point System Leaderboard** | _Whether it is accessible or not._

#### Point Shop
---
You can add purchasable items to the Point Shop. This includes a very long list of possibilities, such as buying **roles**, **badges**, **items** and more.

**Shop Items** are not to be confused with **Items.**  
_Items can be created, traded, and bought. As well as given a rarity value._
The full list of possibilities are:

---

 1. **Give Role** | Adds a Role of your choice.
2. **Remove Role** | Removes a Role of your choice.
3. **Give Badge** | Adds a Badge of your choice.
4. **Remove Badge** | Removes a Badge of your choice.
5. **Give Item** | Gives an Item of your choice.
6. **Remove Item** | Removes an Item of your choice.
7. **Post Request** | Yep, send a Post Request to your API.
8. **Send Message** | Monni will send a message of your choice. (Supports Simpuka).
9. **Give Points** | Add points to the member who aquired it.
10. **Remove Points** | Remove points from the member who aquired it.
11. **Kick** | Kicks the member who aquired it.
12. **Ban** | Bans the member who aquired it.
13. **Timeout** | Timesout the member who aquired it.

**These Items can be added and configured in any Point Shop you create!**

---
### Milestones
---
Milestones are similar to items, however rather than them being purchased they are automatically earned once a member hits a certain **Milestone** (Point amount).
#### Sources
---
Sources can be added to allow more ways for members to earn points.

The two current options are:
1. **Messages Sent** 

Messages sent allows members to earn Points from sending messages. Below are a few editable features that you can configure.
- **MESSAGES REQUIRED**  
This is where you can decide how many messages a member has to post to earn points.
- **POINTS TO AWARD**  
This is where you can decide how many points a member gets, once they have posted the amount of messages required.

2. **Voice Channel Time** 

Voice Channel Time allows members to earn Points from being in VC for a set amount of time. Below are a few editable features that you can configure.
- **Time in VC required**  
This is where you can decide how long a member has to be in VC to earn points.  
The time is set in minutes.
- **POINTS TO AWARD**  
This is where you can decide how many points a member gets, once they have posted the amount of messages required.
