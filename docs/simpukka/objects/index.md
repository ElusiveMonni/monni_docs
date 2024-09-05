---
title: Objects
sidebar_position: 3
slug: objects
---
Objects are the data and functions related to some external data and actions. They provide a convenient abstraction over raw data and third party actions such as discord communication.

:::warning
Data objects may vary slightly between wrappers. Some may not implement all of them or may have them only partially implemented. Please refer to languages own page for information on what is exists and what's missing.
:::

## Object visualization
Each object can be visualized in a graph. Each graph consists of name of the object (root), objects (subtrees) and variables or functions (leafs). Functions and variables can have extra leafs to provide more information like arguments or return value. Different lines and shapes convey the type of the value.



```mermaid
flowchart LR
	root[(Root)]
  object[Object]
  iterable((Iterable))
	int{{Integer}}
  str>String]
  bool{Bool}
  function[[Function]]
  args[Args]
  optional_args[Optional args]
  func_return[Return values] 
  
  click root callback "Root contains all of the structure."
  click object callback "Object is child which contains more data. May contain link to corresponding objects documentation."
  click iterable callback "Iterable is special children which contains list of other children."
  click int callback "Leaf which is integer."
  click str callback "Leaf which is string."
  click bool callback "Leaf with boolean value."
  click function callback "Leaf which is function."
  click func_return callback "Return values of function."
  click optional_args callback "Optional function arguments."
  click args callback "Required function arguments."
  
  root --- object
  root --- iterable
  root --- function
  object --- int
  iterable -.- str
  object --- bool
  function --- args
  function -.- optional_args
  function <-.-> func_return
```

