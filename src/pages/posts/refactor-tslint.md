---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Refactor the TSLint Configuration using 'extends'"
author: "author"
pubDate: 2018-10-21
description: "Using `extends` to configure your TSLint."
image:
  url: ""
  alt: ""
tags: ["tslint", "typescript"]
---

Adding linters would help to make your project more robust as it might be able to catch programming errors, bugs, typos and etc. If you are using Typescript, you could use [TSLint](https://palantir.github.io/tslint/) to lint your project. The full list of lint rules are available [here](https://palantir.github.io/tslint/rules/). Besides that, you could also write custom lint rules for your own project needs.

####  Multiple tslint.json 

A project can have multiple `tslint.json` configurations. For example, a `tslint.json` configuration for different environment mode.

In _development_ mode :computer: , the rules below are needed.

```json
{
  "rules": {
    "no-any": true,
    "no-console": false,
    "no-debugger": false,
    "no-null-keyword": true,
  }
}
```

In _production_ mode  :rocket: , the rules below are needed instead.

```json
  "rules": {
    "no-any": true,
    "no-console": true,
    "no-debugger": true,
    "no-null-keyword": true,
  }
}
```


If you noticed, there are some duplicated rules in the `tslint.*.json`. We want the **no-console** and **no-debugger** rules to be enabled in _development_ but disabled for _production_.  On the other hand, the **no-any** and **no-null-keyword** rules are set to **true** and is being duplicated in each of the configuration files.   We are all aware of the DRY principles :recycle: , so it would be nice if we could remove the duplicated rules! 

#### 'extends' field to the rescue

```json
extends?: string | string[]
```

The `extends` field is an optional field in the tslint configuration that accepts a string or an array of strings. The value could be built-in configuration preset(eg: **tslint:latest**) or path to another configuration files which are extended by this configuration ([refs](https://palantir.github.io/tslint/usage/configuration/)).

So, let's see how we could refactor the tslint configuration file to utilize the `extends` field.

1. Let's create a `tslint.json` configuration that contains all the required rules for _development_ mode :computer: 


```json
{
  "rules": {
    "no-any": true,
    "no-console": false,
    "no-debugger": false,
    "no-null-keyword": true,
  }
}
```

2. Then, create a another tslint conguration for _production_ use :rocket:. Using the extends field, and give it a value of the path of the tslint configuration that you have created in step 1. You could add in additional rules that are needed specifically for _production_ mode and/or override any rules that have been disabled.

```json
{
  "extends": "./tslint.json",
  "rules": {
    "no-console": true,
    "no-debugger": true,
  }
}
```

You're all set~! :tada: The **no-any** and **no-null-keyword** are no longer duplicated and now we have a cleaner tslint configuration file. 


Hope you find this post useful and happy linting~ :police_car: :policeman: 
