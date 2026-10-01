---
title: Actions
description: "Every action and condition you can use in Monni automations, from sending messages and giving roles to checking points."
---
Actions and conditions are the heart of any system which supports them. They provide the bot instructions on what to do and when it should apply. Combined, they can be used to create complex logic flows, perfect for making Monni customized to exactly the degree you need!

## Actions
Actions are usually coloured blue and tell the bot what to do. Actions range from simple actions like banning a member to providing sending messages with buttons which have their own actions.
![Send text message to channel action posting hello in the general channel](assets/actions.png)

### Target of actions
Actions don't know themselves who to target. The information is provided by the component which runs the action. In case of a button, the actions apply to the person who pressed the button.

:::info
Even when the target isn't documented, we aim to ensure it is immediately clear from the context.
:::

### Special actions
Non comprehensive list of special actions.
- For each member. Runs actions on a group of people based on filters. Read more in [mass actions](mass-actions).
- Conditional. It lets you define conditions and what actions to run if they apply, as well as what actions to run in case they don't apply.

## Conditions
Conditions are usually coloured orange and work as the IF statements of the system. They can be used inside actions to control the flow of the actions. For example you can check if the user has a role **purple**. If they do then you can do give them **20 points** or otherwise do nothing.
![Member has role condition with a role picker and an option to reverse the condition](assets/condition.png)

## Action system limits
Currently we don't enforce any limits on actions. We monitor for harmful abuse usage and we will limit any server found to be partaking in trying to harm our systems. 

:::info
We wish to keep the system limit free but we may change this in future if the system is abused.
:::
