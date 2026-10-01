---
title: Actions
description: "How actions and conditions work in Monni automations, who actions apply to, and the special actions for logic and buttons."
---
Actions and conditions are the heart of any system which supports them. They provide the bot instructions on what to do and when it should apply. Combined, they can be used to create complex logic flows, perfect for making Monni customized to exactly the degree you need!

## Actions
Actions are usually coloured blue and tell the bot what to do. Actions range from simple actions like banning a member to providing sending messages with buttons which have their own actions.
<img src={require('./assets/actions.png').default} alt="Send text message to channel action posting hello in the general channel" width="500" />

### Target of actions
Actions don't know themselves who to target. The information is provided by the component which runs the action. In case of a button, the actions apply to the person who pressed the button.

:::info
Even when the target isn't documented, we aim to ensure it is immediately clear from the context.
:::

### Special actions
Non comprehensive list of special actions.
- **Conditional action** | Runs one list of actions when its conditions pass, and another list when they don't.
- **For each member** | Runs actions on a group of people based on filters. Read more in [mass actions](mass-actions).
- **Set variable** | Saves a value, like a random number, so later actions can use it as `{{vars.name}}`.
- **First to press** | For buttons. The first person to press runs one list of actions, and everyone after runs another.

## Conditions
Conditions are usually coloured orange and work as the IF statements of the system. They are used inside the **Conditional action** to control which actions run. For example you can check if the member has the role **purple**. If they do, give them **20 points**, otherwise do nothing.
<img src={require('./assets/condition.png').default} alt="Member has role condition with a role picker and an option to reverse the condition" width="500" />

Every condition can be reversed, so it passes when the check is **not** met.

## Action system limits
An automation can have up to 100 actions. The **For each member** action has its own limit on how many members it runs for, which you can read about in [mass actions](mass-actions).

We monitor for abuse, and may limit any server found trying to harm our systems.
