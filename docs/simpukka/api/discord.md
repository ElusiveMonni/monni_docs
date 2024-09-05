# Discord endpoints
Proxy requests to discord. There is default rate limit of 50 requests/runtime and 1 requests per second.

## Get user
**GET** - `/discord/user/`

Fetches information about user from discord

## Rate limits
1 per second and 20 per runtime
## Example request
```python
{"identifier": runtime identifier, "user_id" id of the user}
```

### Example return
```python
{"status_code": 200, "data": {
	"name": ".iraas",
	"id": 765119856403021864,
	"global_name": "iraas", 
	"bot": False, 
	"avatar": "https://cdn.discordapp.com/avatars/765119856403021864/4fcec63a4386324e623112aea841ce78.png"}
}
```


## Get guild
**GET** - `/discord/guild/`

Fetches information about guild from discord

## Rate limits
1 per second and 3 per runtime
## Example request
```python
{"identifier": runtime identifier, "guild_id" id of the guild}
```

### Example return
```python
{"status_code": 200, "data": {
	"name": "Monni support",
	"id": 1022913375186993233,
	"owner_id": 765119856403021864,
	"icon": link to icon image}
}
```


## Get channel
**GET** - `/discord/channel/`

Fetches information about channel from discord

## Rate limits
1 per second and 10 per runtime
## Example request
```python
{"identifier": runtime identifier, "guild_id" id of the guild, "channel_id": id of the channel}
```

### Example return
```python
{"status_code": 200, "data": {
	"id": 1022913375186993233,
	"last_message_id": 127407454504472172,
	"name": "General",
	"nsfw": False,
	"position": 3,
	"cooldown": 2,
	"topic": Topic of the channel,
	"type": Number which tells channel type
	}
}
```


## Send message
**GET** - `/discord/channel/send/`

Send discord message.

## Rate limits
1 per second and 10 per runtime
## Example request
```python
{"identifier": runtime identifier, "guild_id" id of the guild, "channel_id": id of the channel, "content": "The message itself."}
```

### Example return
```python
{"data": {"id": "message id"}}
```

## Get message
**GET** - `/discord/message/`

Fetches information about message from discord

## Rate limits
1 per second and 10 per runtime
## Example request
```python
{"identifier": runtime identifier, "guild_id" id of the guild, "channel_id": id of the channel, "message_id": id of the message}
```

### Example return
```python
{"status_code": 200, "data": {
	"id": message id,
	"channel_id": 765119856403021864,
	"author": Data of user who sent the message,
	"content": Content of the message,
	"created_at": Unix timestamp of message creation,
	"edited_at": Unix timestamp last message edit
	}
}
```

## Delete message
**GET** - `/discord/message/delete/`

Deletes discord message.

## Rate limits
1 per second and 10 per runtime
## Example request
```python
{"identifier": runtime identifier, "guild_id": 9823119856403021, "channel_id": 890219856403021875, "message_id": 765119856403021864}
```

### Example return
```python
{"status_code": 202}
```
