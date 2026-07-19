# Custom tags & filters
Our integration of liquidjs provides custom features for convenience like random filter.

:::info
If you want to learn about liquidjs integration please visit our [Variables & templates](variables-and-templates) page.
:::

## Tags
We currently provide no custom tags



## Filters

### Random
Random filter generates number between min and max or selects random element from a list

#### Syntax
```liquidjs
{{min | random: max}} # Number between min and max
{{list | random}} # Random element from list
```

#### Usage
```liquidjs
{{1 | random: 100}} # Number between one and 100
```


:::warning
Please note that the max number on negative and positive side are 10 million. On failure returns nothing.
:::

