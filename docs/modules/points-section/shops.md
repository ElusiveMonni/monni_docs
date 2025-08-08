---
sidebar_position: 3
title: Shops
slug: /modules/points/shops
---

### What are they?
---
Shops are the way members use points to purchase certain actions or [items](/modules/points/items) within a Discord server.

### Making a shop
---
Shops can be created by pressing "Add shops" in the `Shops` section of the `Points` module. Then you choose a name, which will be displayed in the message when accessed through the shop [command](/modules/points/commands), and then choose products for the shop to display.

### Customization
---
Customization of a shop is mainly done by adding products. Each product has a name, and description which appear in the message sent by Monni when using the shop command. Each item also has a price, can have a prerequisite, and performs an action.

- **Price** - How many points will be removed from a member when purchasing the item. This amount must be positive, and the item can only be purchased if the buyer's balance is positive and greater than the price. Multiple point systems can be selected, and means that the buyer's balance must be greater than the price specified each system individually.
- **Prerequisite** - A prerequisite can be either an item or a set amount of points. These points and/or items will not be spent when purchasing, but are needed for the option to purchase to be available.
- **Actions** - Actions are what occur when a product is purchased. Multiple actions can be added to a single product.

### Actions
---
The current available actions are:

- **Give Role** - Adds a specified role to the buyer.
- **Remove Role** - Removes a specified role from the buyer.
- **Send Message** - Sends a custom message in a specified channel.
- **Give Item** - Gives a specified amount of an item.
- **Remove Item** - Removes a specified amount of an item.
- **Give Points** - Adds a specific amount of points in a system to the buyer.
- **Remove Points** - Removes a specific amount of points in a system from the buyer.
- **Ban** - Bans the person who bought it.
- **Kick** - Kicks the person who bought it.

### Limits
---
To prevent Discord servers from overusing Monni's resources, there are restrictions to the number of shops which can exist in a single server.

This limit is 3 shops for a normal server, and 10 for a premium server.