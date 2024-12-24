---
title: Points
sidebar_position: 4
---
##### DevTools involving Points Module related actions
---

Below is a list of the main DevTools under the `points` group.

:::warning
Some commands here may beak the functionality of the bot for your server.
:::

### points list
---
`<@911945727402471455> devtools points list`
- Lists all the current point systems which exist in the guild. May list deleted ones if they aren't yet removed from the database.

### points set
---
`<@911945727402471455> devtools points set <point_id> <key> <value>`
- Changes values in points systems which you otherwise couldn't.
- Providing incorrect values may lead to the bot no longer working.
- `key` follows the format `point_system <internal system or point id>`
	- Changes where the point system stores points.