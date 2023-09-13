---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Understanding typings of redux-thunk"
author: "author"
pubDate: 2019-11-04
description: "Deciphering the TypeScript definition of redux-thunk action."
image:
  url: ""
  alt: ""
tags: ["reactJS", "typescript", "redux-thunk"]
---

This blog post will be focusing on explaining the TypeScript definition of `ThunkAction` which is used in the redux-thunk library. If you're not sure what redux-thunk is, I'd recommend reading through the [why do I need this](https://github.com/reduxjs/redux-thunk#why-do-i-need-this) section in the redux-thunk library. Then, come back to this blog post to learn about the TypeScript definition of `ThunkAction`. I also highly recommend reading [what is a thunk](https://daveceddia.com/what-is-a-thunk/).

Hope you've check out the materials recommended above before you continue reading 👀 💭

However, if you're interested in learning TypeScript's type aliases, I think you would enjoy this blog post as well. I will be explaining how type aliases are being used in a more complex type definition.

Let's dive in head-on then by looking at the type definition of `ThunkAction`.

```ts
export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E,
) => R;
```

The definition of `ThunkAction` can be overwhelming and filled with generics(defined with `<>`). The TypeScript's **type aliases** is used here. Before moving further, I'd like to dig into what is **type aliases** first.

📝 The snippet below is taken from [TypeScript handbook-advance-types(type aliases)](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

// 🙆
const getNameMethod = () => "John";
console.log(getName("Mary")); // Mary
console.log(getName(getNameMethod)); // John

// 🙅
// Using the defined type aliases you'll see an error is thrown if a wrong type is passed to getName
const getNumberMethod = () => 1;
console.log(getName(getNumberMethod)); // 🛑
/* getNumberMethod is () => number
Argument of type '() => number' is not assignable to parameter of type 'NameOrResolver'.
  Type '() => number' is not assignable to type 'NameResolver'.
    Type 'number' is not assignable to type 'string'.ts(2345)
*/
```

---

The definition of `ThunkAction` is complicated and it is hard to understand how it is using TypeScript's **type aliases**. In this section, the `ThunkAction` definition will be broken down into a simpler form by referring to the (`type NameResolver = () => string `) definition.

```ts
export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E,
) => R;

// The simplified form of ThunkAction type definition
export type ThunkAction<generics> = (
  dispatch,
  getState,
  extraArgument,
) => ReturnType;
```

Now that the definition is simplified, the generics passed to `ThunkAction` type can be tackled more easily.

- type **ThunkAction<R>**

```ts
type ThunkAction<R> = (dispatch, getState, extraArgument) => R;

// This would make R the return type of the `ThunkAction` method.
```

- type **ThunkAction<R, S, E, A extends Action>**

```ts
type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E,
) => R;

/* 
  S = is the type of root state
    = is the return type of the getState() method.
  
  E = is the type of the extra arguments passed to the ThunkAction
  
  A = is the action type defined in your application.
    = it should be able to extend from Action.
      (this means that it should be an object 
      that must have a `type` field.) Action type is defined in the redux typings.
  */
```

---

#### Usage example

After understanding the typings of ThunkAction, I would like to share an example of how `ThunkAction` can be used in your TypeScript code.

```ts
import { ThunkAction } from "redux-thunk";

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
// R = void
// S = RootState
// E = null
// A = Action<string>
```

```ts
export const fetchUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      // handle fetch success
    } catch (err) {
      // handle fetch failure
    }
  };
```

Thanks for reading and happy typings~ 👋

---

#### References

- [reduxjs/redux github repository](https://github.com/reduxjs/redux)
- [reduxjs/redux thunk github repository](https://github.com/reduxjs/redux-thunk)
- [Make typings compatible with Redux 4.0.0](https://github.com/reduxjs/redux-thunk/pull/180)
- [Strongly-typed React Redux Code with TypeScript](https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/)
- [TypeScript handbook-advance-types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)
