---
sidebar_position: 3
title: Milestones
slug: /modules/points/milestones
---

### What are they?
---
Milestones are ways to reward members for reaching a certain amount of points in a [system](/modules/points/systems). Each milestone is related to a single system and can perform an action when the milestone is passed. You can also do this when the member loses points and goes below the milestone.

### Creating milestones
---
Milestones can be created in the `Milestones` section of the `Points` module by pressing "Add milestones". Each milestone has a name to differentiate milestones in the dashboard, a system, a requirement, and both forward and reverse actions.

- **System** - Each milestone can only have one system, when a member's balance for the system updates, it will check whether or not the member has fulfilled the milestone.
- **Requirement** - The value of the balance required to trigger the milestone.
- **Actions and Reverse Actions** - What occurs when the milestone is triggered. When the balance goes below the required value for the milestone, the reverse actions specified will occur.

### Actions
---
Multiple actions can occur for a single milestone. The current actions available are:

- **Give Role** - Adds a specified role to the buyer.
- **Remove Role** - Removes a specified role from the buyer.
- **Send Message** - Sends a custom message in a specified channel.
- **Give Item** - Gives a specified amount of an item.
- **Remove Item** - Removes a specified amount of an item.
- **Give Points** - Adds a specific amount of points in a system to the buyer.
- **Remove Points** - Removes a specific amount of points in a system from the buyer.
- **Ban** - Bans the person who bought it.
- **Kick** - Kicks the person who bought it.

### Limits
---
To prevent Discord servers from overusing Monni's resources, there are restrictions to the number of milestones which can exist in a single server.

This limit is 20 milestones for a normal server. Limits can be increased indefinitely through our premium subscription.