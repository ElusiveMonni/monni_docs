# Variables & templates
Action system and message systems in Monni are tightly coupled with template library called [liquidjs](https://liquidjs.com/index.html). To fully understand how the system works below terms are handy to know.

| **Term**                        | **Definition**                                                                                                  | **Example**                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Variable / Context**          | A value stored behind a specific identifier or key.                                                             | A variable named `name` storing the value `"monni"`.    |
| **Object / Variable / Context** | Placeholder which will be replaced with provided variable.                                                      | `{{name}}` or `{{member.name}}`                         |
| **Tag**                         | Markup that controls the logic of the template (loops, conditionals, etc.). They do not output text themselves. | `{% if user.is_admin %}` or `{% for item in items %}`   |
| **Filter**                      | A method used to modify the output of a variable or text.                                                       | `{{ "monni" \| capitalize }}` would capitalize Monni    |
| **Template**                    | Text with objects, tags and filters                                                                             | `Hello {{name}}!`                                       |
| **Rendered template**           | Template which has been rendered                                                                                | Before `Hello {{name}}!` after rendering `Hello monni!` |

## Variable substitution
Variable substitution/replacing object is the simplest operation there is.

**Context**
>name -> Monni\
>server -> Fish heaven

**Template**
>```liquid
>Hello {{name}}, welcome to {{server}}.
>```

**Rendered template**
>Hello Monni, welcome to Fish heaven. 

In most cases variables are what we usually refer to as objects. Objects are variables which have multiple values. Example of this could be member who has name and join date.

**Context**
>member -> `{name: "Monni", mention: "<@911945727402471455>", age: 20}`\
>server -> `{name: "Fish club", member_count: 252}`

**Template**
>```liquid
>Hello {{ member.mention }}, welcome to {{ server.name }}. You are member number {{ server.member_count | plus: 1 }}.
>```

**Rendered template**
>Hello Monni, welcome to Fish club. You are member number 253.
## Common Tags
### If condition
If conditions allow you to add paths your template can take depending on if something is true or false. 

**Context**
>name -> Monni\
>bans -> 20

**Template**
>```liquid
>{% if bans == 0 %}
>	{{name}} has no bans.
>{% elsif bans == 1 %}
>	{{name}} has 1 ban.
>{% else %}
>	{{name}} has {{bans}} bans.
>{% endif %}
>```

**Rendered template**
>Monni has 20 bans.

:::info
If your message has odd spacing try adding dashes like in the provided example `{%- -%}`
:::
### For loop
Sometimes variable or object can contain a list. In these cases being able to go over each element one at a time is useful.

**Context**
>members -> `[{name: "monni", cash: 2000}, {name: "dogfish", cash: -20}, {name: "trout", cash: 212}]`

**Template**
```liquid
Money Leaderboard
{% for member in members %}
	{{ forloop.index }}. {{ member.name }}: {{ member.cash }}
{% endfor %}
```
**Rendered template**
> Money Leaderboard
> 1. monni: 2000
> 2. dogfish: -20
> 3. trout: 212


### Variable tag
Sometimes you may need to make your own variables. In below example variable is used for sorting a list.

**Context**
>members -> `[{name: "monni", cash: 2000}, {name: "dogfish", cash: -20}, {name: "trout", cash: 212}]`

**Template**
```liquid
{% assign sorted_members = members | sort: "cash" | reverse %}
Money Leaderboard
{% for member in sorted_members %}
	{{ forloop.index }}. {{ member.name }}: {{ member.cash }}
{% endfor %}
```

**Rendered template**
> Money Leaderboard
> 1. monni: 2000
> 2. trout: 212
> 3. dogfish: -20

:::info
You can find all of the supported tags and more in-depth information in [liquidjs docs](https://liquidjs.com/tags/overview.html)
:::

## Common filters
Filters edits the variable. This lets you do basic operations like appending text to variable or math. Even hash the value.
**Context**
>number_1 -> 20\
>number_2 -> 20

**Template**
>```liquid
>numbers: {{number_1}}, {{number_2}}
>Plus: {{number_1 | plus: number_2 }}
>Minus: {{number_1 | minus: number_2 }}
>times: {{number_1 | times: number_2 }}
>```
**Rendered template**
>numbers: 20, 20\
>Plus: 40\
>Minus: 0\
>times: 400

:::info
You can find full list in [liquidjs docs](https://liquidjs.com/filters/overview.html)
:::

## Liquidjs support
Most text field in Monni are treated as template hence supporting liquidjs. Good rule of thumb is that if context selector opens below the text box it supports liquidjs.

![variable-picker.png](assets/variable-picker.png)



:::info
We limit easy to abuse parts of template rendering heavily like loops and memory usage. If you run into issues relating to resource limits please [contact us](https://monni.fyi/support).  
:::