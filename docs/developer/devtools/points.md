---
title: Points
sidebar_position: 4
---
##### DevTools involving Points Module related actions
---

Below is a list of the main DevTools under the `points` group.

:::warning
Some commands here may beak the functionality of the bot or delete data permanently.
:::

### points list
---
`<@911945727402471455> devtools points list`
- Lists all the current point systems which exist in the guild.

:::info
List command may list deleted point systems. This is by design to make recovery operations possible
:::
### points clear
---
`<@911945727402471455> devtools points clear <system_id>`
- Clears all the points from users in the provided system

:::danger
This command cannot be reversed
:::

### points export
---
`<@911945727402471455> devtools points export <system_id>`
- Exports point system to json file with following structure 
```js
{
"user1_id": amount,
"user2_id": amount,
...
}
```

### points import
---
`<@911945727402471455> devtools points import <mode> <system_id>`
- Imports points from json file following same structure as what example in export section shows.

**Mode arguments**
* **overwrite:** Replace existing user amounts with imported values 
* **skip:** Skip users who already exist, only import new users 
* **add:** Add imported amounts to existing user balances 
* **subtract:** Subtract imported amounts from existing balances 
* **max:** Keep the higher amount between existing and imported 
* **min:** Keep the lower amount between existing and imported
