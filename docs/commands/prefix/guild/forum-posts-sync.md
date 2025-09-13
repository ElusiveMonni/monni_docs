---
title: forum_posts_sync
---
# Forum Posts Sync

Command for syncing past information about how many posts a user has made within a specific forum.

:::info
**forum_posts_sync** is a [prefix command](/commands/prefix/)!
:::

:::admin
**forum_posts_sync** is an [administrator command](/commands/info/admin)!
:::

---
## Arguments

Arguments must be in order

- 1 **forum id**  
	ID of the forum channel which information is going to be synced from.
- 2 **user id**  
	ID of the user whose information will be synced.

## Rate limit

Forum_posts_sync can be used a maximum of 5 times within 120 seconds, and as a concurrent command only one instance of the command can be run at any given time.

## 🔒 Required permissions

Monni requires the `View Channel` permission for the specific forum along with the `Manage Server` permission