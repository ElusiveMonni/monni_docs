---
title: Message Builder
sidebar_position: 1
---
Our message builder is an extensive way to make messages for Discord and preview them live. It supports the old embed style for messages and the fancy new components v2 style for messages. Beyond that, variables, webhooks and complex logic via [liquidjs](https://liquidjs.com/tutorials/intro-to-liquid.html) is supported.

:::warning
Live preview attempts to emulate Discord message styling, but it isn't completely accurate.
:::

## Using the Message Builder 
To use the Message Builder, head to:
https://monni.fyi/message-builder.

### Sharing embeds with your friends
Unless you disabled `message in the URL`, you can share the message by sending the URL to your friend. In the case you want to share the context, make sure you enable that in the settings!

### Context
The context is the variables of the messages which have a key (name) and value. You can manually set your own context in the editor context section. Context has to be provided in Json. Context can be rendered in with using `{{context key}}`. So for example, if we have context `{"name": "john"}` and message `hello {{name}} welcome to this server`, when it renders, it becomes `hello john welcome to this server`. This functionality is provided via https://liquidjs.com/tutorials/intro-to-liquid.html. The editor supports liquidjs completely.

### Exporting and importing
By heading to the Json section, you can export the message into Json and import Json messages into the editor.
