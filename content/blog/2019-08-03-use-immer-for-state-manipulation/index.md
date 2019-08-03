---
slug: use-immer-for-state-manipulation
date: 2019-08-03
title: 'Use immer for state manipulation'
description: 'Use immer for your deep nested reducers and state'
published: true
---

Have you ever come across a situation where you have a deeply nested state and want you mutate a single property on the deepest level? You could do that using destructuring, but that can be quite an unclear mess. Fortunately we now have <a href="https://github.com/immerjs/immer" target="_blank" rel="noopener noreferrer">immer</a>. It's been around for a while but I first heard about it at the <a href="https://jsnation.com/" target="_blank" rel="noopener noreferrer">JSNation</a> conference earlier this year in Amsterdam.

The implementation is fairly easy to start with. You get a `produce` function from the library which does all the magic for you. It prevents direct state manipulation and returns a merged state consisting of the original state and the changed draft state. To make it more clear here's a working example:

<iframe src="https://codesandbox.io/embed/immer-example-dly36?fontsize=14&view=editor" title="immer-example-2" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

As you can see the `changeUser1OldWay` function works using destructuring, a lot of triple dots to make sure every layer is still intact except for the property to need to modify. The `changeUser2NewWay` function on the other hand looks much cleaner. This is thanks to immer! 🎉 

The way I worked with the `produce` function is with the original state as the first parameter, and a `draft` function as the second. The `draft` parameter is basically a copy of the first parameter. The advantage now is that you can modify it any way you want without having the risc of directly mutating the original parameter. 

Immer is a fairly simple but strong library which saves a lot of dirty unreadable code. Take a look at their <a href="https://github.com/immerjs/immer" target="_blank" rel="noopener noreferrer">Github page</a> for more examples. 

Cheers!

