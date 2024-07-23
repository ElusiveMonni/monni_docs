---
title: Monni API
sidebar_position: 2
---

The Monni API is provided to make it possible for you to communicate and integrate with Monni systems from external applications. In order to communicate with most API’s you need an API key. The API key has to be provided in the header with the key named `api_key`

:::danger
We are currently migrating out API system. Old API will be deprecated.
:::

## Structure
---
/api/public/\<version>/\<API name>


:::warning
API end points may change without notice. This includes the path and rate limits.
:::

## Current API End Points
---
**We currently have 4 API end points, these end points are:**

### Points
---
The Points API has a global rate limit of 30 requests per minute.

##### Version 1

- Get Endpoint
	- `/api/public/v1/points/get/`

Parameters:
```json
{
  "guild_id": int|str
}
```

Returns a list of all the current points systems in a guild and their settings.

- Edit Endpoint
	- `/api/public/v1/points/edit/`

Parameters:
```json
{
  "guild_id": Id of the guild (int|str),
  "system_id": Id of the system (str),
    "member_id": Id of the member (int|str),
    "amount": Amount (int min -1000000 max 1000000)
}
```

Endpoint for changing points of a member by provided amount.

- Edit Balance
	- `/api/public/v1/points/balance/`

Parameters:
```json
{
  "guild_id": Id of the guild (int|str),
  "system_id": Id of the system (str),
    "member_id": Id of the member (int|str),
}
```

End point for getting balance of a person.

### Rewards
---
The Rewards API has a global rate limit of 30 requests per minute.

##### Version 1

- Get Badges Endpoint
	- `/api/public/v1/rewards/get/badges/`

Parameters:
```json
{
  "guild_id": int|str
}
```

Returns a list of all guild badges.

- Get Items Endpoint
	- `/api/public/v1/rewards/get/items/`

Parameters:
```json
{
  "guild_id": int|str
}
```

Returns a list of all guild items.

### Triggers
---
The Triggers API has a global rate limit of 60 requests per minute.

##### Version 1

- Get Custom Endpoint
	- `/api/public/v1/triggers/custom/get/`

Parameters:
```json
{
  "guild_id": int|str
}
```

Returns a list of all custom triggers and their details.

- Custom Execute Endpoint
	- `/api/public/v1/triggers/custom/execute/`

Parameters:
```json
{
  "guild_id": Id of the guild (int|str),
  "trigger_id": Id of the trigger (str),
    "data": JSON object of your choosing. Will be passed to simpukka and can be accessed.,
}
```

_API endpoint for executing custom Simpukka triggers. (Simpukka limits still apply) will return following information:_
```json
{
    "result": "rendering result",
    "runtime": "Time simpukka took to execute",
    "api_calls": "Api calls made during simpukka",
    "error": "Potential error which happened during simpukka rendering"
}
```

### Verification
---
The Verification API has a global rate limit of 20 requests per minute.

##### Version 1

- Edit Endpoint
	- `/api/public/v1/verification/get/account/`

Parameters:
```json
{
  "guild_id": Id of the guild (int|str),
  "member_id": Id of the member (int|str),
}
```

Endpoint for getting verified account of user.