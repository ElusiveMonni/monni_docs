---
title: Simpukka API
sidebar_position: 3
---
# Simpukka API
Simpukka API is the gateway to communicating with discord and the host system. Url for simpukka API is `http://host.docker.internal:5000`. The API itself is a simple http server which rate limits the requests and handles the communication with discord. Every requests it attempted to be returned as json.

:::warning
Simpukka API should only be used directly if you have no other choice. Otherwise use the provided wrapper libraries. This will ensure your code works even if the API changes.
:::

## Authentication
Each runtime is provided identifier which can be used to authenticate in the API. To authenticate provide identifier in json in following manner. `{"identifier": identifier}`

:::info
In API documentation authentication is required unless stated otherwise.
:::
