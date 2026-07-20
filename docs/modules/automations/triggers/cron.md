---
sidebar_position: 4
title: Schedule trigger
---
# Schedule trigger
Schedule triggers let you use [cron language](https://crontab.guru/) to specify when a trigger should run. It's a versatile way to define when to run things like, "run this every monday at 12pm (`0 12 * * 1`)" or "run this every hour from 2pm to 5pm on monday to friday (`0 14-17 * * 1-5`)".

:::info
Our triggers run on `UTC 0` time. Please keep this in mind when creating triggers.
:::

## Syntax
We support standard cron syntax. this includes the following:
| Character | Meaning | Description | Example | What the Example Does |
| :---: | :--- | :--- | :--- | :--- |
| `*` | Any value | Acts as a wildcard to match every possible value in that field. | `* 12 * * *` | Runs every minute during the 12 PM (noon) hour, every single day. |
| `,` | Value list separator | Lets you specify a comma-separated list of discrete values. | `0 9,15 * * *` | Runs exactly at 9:00 AM and 3:00 PM (15:00) every day. |
| `-` | Range of values | Defines an inclusive range between two numbers. | `0 9-11 * * *` | Runs at 9:00 AM, 10:00 AM, and 11:00 AM every day. |
| `/` | Step values | Specifies increments or skipping intervals within a range. | `*/15 * * * *` | Runs every 15 minutes, every hour, every day (`:00`, `:15`, `:30`, `:45`). |

You can mix these to create the exact schedule you need.





:::warning
We don't guarantee triggers happen precisely on the specified time. If there is large load on our server they may happen with a few minute delay.
:::
