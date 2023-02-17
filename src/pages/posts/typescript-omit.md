---
layout: ../../layouts/MarkdownPostLayout.astro
title: "TypeScript: Understanding how Omit = Pick + Exclude"
author: "author"
pubDate: 2022-12-21
description: "Explain how Omit is equivalent to Pick and Exclude"
image:
  url: ""
  alt: ""
tags: ["typescript"]
---

Update: [TypeScript 3.5](https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/#the-omit-helper-type) included the [Omit helper type](https://github.com/microsoft/TypeScript/blob/master/src/lib/es5.d.ts). :tada:

The **Pick** and **Exclude** types are part of the utility types provided in TypeScript. The **Pick** utility type was introduced in [TypeScript 2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html). Later on, in [TypeScript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html), the **Exclude** type was added. The combination of these two utility types enables the omission type to be written as follows:

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

This **Omit** type was intentionally not included in TypeScript, as mentioned in the [TypeScript 2.8 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html).

> We did not include the Omit<T, K> type because it is trivially written as type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

Even though, it may seem trivial but I was slightly overwhelmed by it. Let's decipher the **Omit** type in this blogpost by breaking it down into 2 parts, **Exclude** and **Pick**.

### Exclude

First off, **Exclude** by definition means exclude from T those types that are assignable to U.

```ts
type Exclude<T, U> = T extends U ? never : T;
```

```ts
type A = Exclude<"id" | "name", "id">;
/**
 * type A = 'name'
 * 'name' is not assignable to 'id', hence it is excluded
 **/
```

### Pick

Next, moving on to **Pick**. By definition, this means from T, pick a set of properties whose keys are in the union K.

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

```ts
type Person = { id: string; name: string };
type C = Pick<Person, "name">;
/**
 * keyof Person are 'id' and 'name'
 * Pick<Person , 'name'> = { [P in K]: T[P] }
 *                       = { name: Person['name']}
 *                       = { name: string }
 * Hence, type C = { name: string }
 */
```

### Omit

Finally, going back to **Omit**. Omit is derived from using **Pick** and **Exclude**.

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

It is implemented by first finding the types that we want to keep using **Exclude** , `Exclude<keyof T, K>`. Then, **Pick** those types that we want to keep.

```ts
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Person = { id: string; name: string };

type D = Omit<Person, "id">;
/**
 * keyof Person are 'id' and 'name'
 * Exclude<keyof T, K> = Exclude<'id' | 'name', 'id'> = 'name'
 * type D = Omit<Person , 'id'>;
          = Pick<Person, Exclude<keyof Person, 'id'>> 
          = Pick<Person, 'name'> 
          = { name: string }
 * Hence, type D = { name: string }
 */
```

Deciphering some of the TypeScript types could be overwhelming :dizzy_face: . One important thing I've learned is to break down the types into smaller parts and understand them separately before diving head first and trying to understand it as a whole.

:bulb: Lastly, check out this [utility-types library](https://github.com/piotrwitek/utility-types). This library provides an extensive utility types for TypeScript that you may find them useful for your project.

Thanks for reading~! :wave:
