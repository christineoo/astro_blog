---
layout: ../../layouts/MarkdownPostLayout.astro
title: "reduce() JavaScript"
author: "author"
pubDate: 2023-01-20
description: "A short article to explain the usage of the reduce() method."
image:
  url: ""
  alt: ""
tags: ["reduce", "javascript"]
---

The `reduce()` method executes the callback function provided on each element of an array. 
​
```js
const nums = [1, 2, 3, 4];
const initialValue = 0;
​
// 0 + 1 + 2 + 3 + 4
const sumWithInitial = nums.reduce(
    (accumulator, currentValue) => {
        console.count('invoked') // 4 times
        return accumulator + currentValue
    }, initialValue
);
​
console.log(sumWithInitial); // 10
```
- the initial value is set, hence the function is invoked **4** times
​
```js
const nums = [1, 2, 3, 4];
​
// 1 + 2 + 3 + 4
const sumWithInitial = nums.reduce(
    (accumulator, currentValue) => {
        console.count('invoked') // 3 times
        return accumulator + currentValue
    }
);
​
    console.log(sumWithInitial); // 10
```
​
- value at index 0 is use as the initial value, hence the function is only invoked **3** times
​
​
### console.count
A handy method that records the number of times `count()` is called. There are two ways to invode `console.count`, one is without passing in an argument(`console.count()`) and another method is passing in a string argument(example: `console.count(greet)`
​
The difference between `console.count()` and `console.count(greet)` is as below. When no argument is present, `default` would be the label else the label would be the string argument passed in.
​
```js
console.count()
// default: 1
// default: 2
​
console.count(greet)
// greet: 1
// greet: 2
​
```
​
​
​
If supplied, count() outputs the number of times it has been called with that label. If omitted, count() behaves as though it was called with the "default" label.
​
 
​
References: 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
- https://developer.mozilla.org/en-US/docs/Web/API/Console/count