# Manual

Manual trigger is a trigger which only runs when you run it from dashboard or API. It can be useful for making manual one time actions like giving everyone in the server a role.


:::info
To learn more about running trigger via API visit our [API documentation](/developer/api/run-manual-trigger-automations-trigger-id-run-post).
:::
## custom context
Custom context allows you to pass your own context to the triggers. Currently custom data only supports flat values.
![custom_context](assets/custom_context.png)
:::warning
Custom data will not show up in the context of automation editor. It still is usable at render time but isn't there during the configuration of the trigger.
:::