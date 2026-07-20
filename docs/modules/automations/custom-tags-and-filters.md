# Custom tags & filters
Our integration of liquidjs provides custom features for convenience like a random filter.

:::info
If you want to learn about liquidjs integration, please visit our [Variables & templates](variables-and-templates) page.
:::

## Tags
We currently provide no custom tags.

## Filters

### Random
Our random filter generates a number between the min and max, or selects a random element from a list.

#### Syntax
```liquidjs
{{min | random: max}} # The number between min and max
{{list | random}} # A random element from list
```

#### Usage
```liquidjs
{{1 | random: 100}} # A number between one and 100
```

:::warning
Please note that the max number on the negative and positive side are 10 million. On failure it returns nothing.
:::

