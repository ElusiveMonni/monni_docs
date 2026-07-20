# Timer
The Timer trigger lets you setup an automatic timer which runs the actions every set amount of configured minutes.
## Options
### Interval (Required)
How many minutes there are between executions. Without premium, the minimum value is **60** minutes. With premium it is **5** minutes.

### Random extra delay
Waits a random time between 0 and your number on top of the Interval time. 


:::warning
We don't guarantee that the timer is completely accurate. Depending on the load of the bot, it may be delayed by multiple minutes. In the long term this will cause timers to shift. If you need to run a trigger with more precision, please use the[ schedule trigger](cron)
:::