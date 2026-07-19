---
title: Message Builder
sidebar_position: 1
---
Our message builder is extensive way to make messages for discord and preview them live. It supports old embed style messages and the fancy new components v2 style of messages. Beyond that variables, webhook and complex logic via [liquidjs](https://liquidjs.com/tutorials/intro-to-liquid.html) is supported

:::warning
Live preview attempts to emulate discord message styling but isn't fully accurate.
:::


## Using the Message Builder 
To use the Message Builder head to 
https://monni.fyi/message-builder


### Sharing embeds with your friends
Unless you disabled `message in the URL` you can share the message by send the URL to your friend. In case you want share the context make sure you enable that in the settings


### Context
Context are the variables of the messages which have key (name) and value. You can manually set your own context in the editor context section. Context has to be provided in json. Context can be rendered in with using `{{context key}}` so for example if we have context `{"name": "john"}` and message `hello {{name}} welcome to this server` when it render it becomes `hello john welcome to this server`. This functionality is provided via https://liquidjs.com/tutorials/intro-to-liquid.html. The editor supports liquidjs fully


### Exporting and importing
By heading to json section you can export the message into json and import json message to the editor
