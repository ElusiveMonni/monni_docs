---
sidebar_position: 3
title: Sources
slug: /modules/points/sources
---

### What are they?
---
Sources are a way to automatically award members with points in a [system](/modules/points/systems) for performing an action. Each source can be customized to fit the server's needs.

### Adding and customizing
---
To add a source, go the dashboard, and open the `Sources` section of the `Points` module, then press "Add sources".

Each source has a name, attached system, and type, with further customization based on the type of source chosen.

- **Source name** - The name of the source in the dashboard to differentiate between sources more easily.

- **Point system** - Which systems' balance is changed when the source triggers for a member.

- **Source type** - The way a member gains points through the source. The current types are:
  `Messages sent`, `Voice channel time`, and `People invited`.

	- `Messages sent` will trigger after the number of `Messages required` are sent by a member (in channels Monni can see) with a `Cooldown` before messages start counting towards the requirement again.
	
	- `Voice channel time` will trigger after a member reaches a specified `Time` spent within a voice channel (which Monni can see).
	
	- `People invited` will trigger when a new member joins through an invite. The member who created the invite will be credited. 
	
- Each source will `give` a specified number of points to the member for the attached system. Sources can also remove points by making the number negative with a `-`.

:::note
It is recommended to put multiple systems onto a single source where possible to avoid some desyncs.
:::

### Limits
---
To prevent Discord servers from overusing Monni's resources, there are restrictions to the number of sources which can exist in a single server.

This limit is 5 sources for a normal server. Limits can be increased indefinitely through our premium subscription.