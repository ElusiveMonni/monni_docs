---
sidebar_position: 7
title: Boosts
slug: /modules/points/boosts
---

### What are they?
---
Boosts are ways to give members bonus points based on whether they fulfill certain criteria. Boosts activate when a point [source](/modules/points/sources) is triggered. More criteria for when a member receives boosts, like items, will added in the future.

### Creating and customizing a boost
---
A boost can be created by going to the dashboard, going to the `Boosts` section of the `Points` Module, and then pressing "Add boosts".

Each boost has a multiplier or flat increase, systems, and a criterion associated with it:

1. Multipliers can range from .01 to 10, and are incremented by .01
2. Flat boosts can be any integer value
3. Systems are the point systems which are boosted for a member. Only systems that are selected will have a given boost applied to them
4. A criterion is the requirement for a boost to activate for a member
	- Currently limited to having a role or being a nitro booster
		- Boosts for nitro users are only available to servers with a premium subscription

### Behind the scenes
---
Boosts involve some almost interesting math, which reads as follows:
```python
def handle_boost(amount, value_type, value):
  if value_type == "flat":
    amount += value
  elif value_type == "multiplier":
    amount *= value
return amount
```
- Flat boosts are applied before multipliers
- Multipliers are compounding rather than additive

Rounding also follows a few rules, as point systems do not support decimals:
- Values where the decimal is less than `.5` will round down to the nearest integer
- Values where the decimal is greater than or equal to `.5` will round up to the nearest integer
- Values of `.5` (exact) will round down to the nearest integer

### Limits
---
To prevent Discord servers from overusing Monni's resources, there are restrictions to the number of boosts which can exist in a single server.

This limit is 5 boosts for a normal server. Limits can be increased indefinitely through our premium subscription.