# Timer
Timer trigger lets you setup an automatic timer which runs the actions every configured minutes

## Options
### Interval (Required)
How many minutes between executions. Without premium minimum value is **60** minutes. With premium **5** minutes

### Random extra delay
Waits random time between 0 and your number on top of the Interval time. 


:::warning
We don't guarantee that the timer is fully accurate. Depending on the load of the bot it may be delayed by multiple minutes. In the long term this will cause timers to shift. If you need to run trigger with more precision please use [schedule trigger](cron)
:::