# Misc endpoints
These endpoints are mainly small helper endpoints which don't have their own category


## Status
**GET** - `/status/`

Returns status of simpukka API. No rate limits or authentication.

### Example return
```python
{"status_code": 200, "status": "alive"}
```


## Get code
**GET** - `/get_code/`

Returns code which is supposed to be executed and also its language. Can also be found in `code` environment variable.

## Example request
```python
{"identifier": runtime identifier}
```


### Example return
```python
{"status_code": 200, "code": "print('hello world')", "language": "python"}
```


## Input
**GET** - `/input/`

Calls the input callback if input callback isn't defined returns following `{"status_code": 501, "error": "Input callback not implemented."}`.

## Example request
```python
{"identifier": runtime identifier}
```


### Example return
```python
{"status_code": 200, "input": "Callback provided input"}
```


## Context
**GET** - `/context/`

Returns information about context of the runtime. The example return has example for message sent trigger.

## Example request
```python
{"identifier": runtime identifier}
```


### Example return
```python
{"status_code": 200, "context": {"author": author id, "guild": guild id, "message": message id, "channel": channel id}}
```