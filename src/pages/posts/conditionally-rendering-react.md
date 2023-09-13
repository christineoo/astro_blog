---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Conditionally Rendering React Components in TypeScript"
author: "author"
pubDate: 2020-05-06
description: "Using union type and type guards to effectively type your React components."
image:
  url: ""
  alt: ""
tags: ["reactJS", "typescript"]
---

When creating a new React component, we sometimes ran into a situation whereby we would like to conditionally render one component or the other based on the given React properties. In these situation, how can we effectively type the React component with TypeScript? 🤔

Thankfully, TypeScript comes with some features that we could make use of to type these components. We'll be exploring a naive and a more effective approach in this article.

#### Option 1: (🙅)

Using the optional operator (`?`) . Referring to the example below, when `item1` property exist, then render `ComponentA` else render `ComponentB`. This works as expected. However, it's not a good approach.

1. What if you have more props (`item3`, `item4`, `item5`, `item-n`), `GeneralType` will quickly become messy.
2. It's not obvious which property that you have defined in the `GeneralType` belongs to `ComponentA` or `ComponentB`.

```ts
type GeneralType = {
  item1?: string;
  item2: number;
 };

const GeneralComponent = (props: GeneralType) => {
  if (props.item1) {
    return <ComponentA {...props} />
  } else {
    return <ComponentB {...props} />
  }
}
```

#### Option 2: (🙆)

The recommended approach. This approach uses the union type and type guards from TypeScript.

```ts
type ComponentAType = {
  item1: string;
  item2: number;
 };

type ComponentBType = {
  item2: number;
 };

// using union type
type GeneralType = ComponentAType | ComponentBType;

// using type guards
const isComponentA = (props: GeneralType): props is ComponentAType => {
  // check if the specified property is in the given object
  return "item1" in props;
};

const GeneralComponent = (props: GeneralType) => {
  if (isComponentA(props)) {
    return <ComponentA {...props} />;
  } else {
    return <ComponentB {...props} />;
  }
};
```

The union type defined using the vertical bar(`|`). We are letting TypeScript knows that `GeneralComponent` can be of type `ComponentAType` or `ComponentBType`.

```ts
type GeneralType = ComponentAType | ComponentBType;
```

Now, we can properly defined the types for `ComponentAType` and `ComponentBType`.

```ts
type ComponentAType = {
  item1: string;
  item2: number;
};

type ComponentBType = {
  item2: number;
};
```

Moving on to type guards. 💂‍♀

```ts
const isComponentA = (props: GeneralType): props is ComponentAType => {
  // check if the specified property is in the given object
  return "item1" in props;
};
```

The return type of this function specifies that props is of type `ComponentAType` if **item1** exists in the given props using the `in` operator. Other handy operator such as **typeof** and **instanceof** are often use when writing a type guards function.

Lastly, `GeneralComponent` could be used as follows.

```ts
// ComponentA will be rendered
const Dummy1 = () => <GeneralComponent item1={"asdf"} item2={2} />;

// ComponentB will be rendered
const Dummy2 = () => <GeneralComponent item2={2} />;
```

Hope that you find it useful and would adapt it to your codebase. Thank you for reading~! 😎👋
