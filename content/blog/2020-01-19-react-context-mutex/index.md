---
slug: react-context-mutex
date: 2020-01-19
title: 'react-context-mutex: lock a function and prevent it from running multiple times unwanted'
description: "Make sure you can lock a process from running multiple times and unlock it when it's allowed to run again"
published: true
---

Demo: [![Edit react-context-mutex](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-context-mutex-w27h0?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FuseFetchHook.ts&theme=dark) <br />

I recently stumbled upon an issue I had to fix. I had created a React hook with a `useEffect` function in which I executed a fetch call. The data was then put into a Redux storage. All good it seemed, until I connected the hook to a second component, which only had to use the data from Redux. At least, that's how I wanted it to work. Obviously it also ran the `useEffect` function and thus, also executed the fetch. 

I was looking for a way to prevent that from happening. What I wanted to achieve was not having to think of how many times the hook was used, I only wanted to execute a single initial fetch. The other components using it had to wait for the data to be added to Redux, and then use it. 

My colleague [Serge](https://www.sergevandenoever.nl/) taught me about the concept of mutex, which does exactly that. It's usually used for locking program threads in order to synchronize access to a resource. Only one task can acquire the mutex. It means there is ownership associated with mutex, and only the owner can release the lock.

Even though we're talking about Javascript, we're not working with threads, but the concept can still be applied to the execution of functions. We can lock the execution of a function so that it cannot be executed by someone else until it's unlocked. 

I couldn't find an existing library that fitted my exact needs, so I created [react-context-mutex](https://www.npmjs.com/package/react-context-mutex). It's a fairly simple library, but does an effective task, locking and unlocking functions. 

## How to use it
The implementation looks like this:

```ts
import { useMutex } from 'react-context-mutex';

const useFetchHook = () => {
    const MutexRunner = useMutex();
    const mutex = new MutexRunner('myUniqueKey1');

    mutex.run(async () => {
        mutex.lock();
        try {
            const response = await fetch('http://myurl');
            const data = await response.json();
            mutex.unlock();
        } catch (e) {
            mutex.unlock();
        }
    });
};
```

<div class="test">test</div>

You create a new `MutexRunner` with a unique key. This key is used to add the function to a "in-use" list. As long as the key is in that list, the function won't be executed by someone else. `mutex.run` adds the callback that should or shouldn't be executed. It always executes, except for when it's locked. The locking process is done by a simple `mutex.lock()`. The fetch will now be executed an you can add the data to Redux if you want. After that you run `mutex.unlock()` to unlock the function again. 

Like the example shows, you can run `useFetchHook()` multiple times but the fetch will only be executed once while the HTTP request is still in progress. 

Simple as that! Please let me know if you'd like to see more features, or if you have other suggestions. If you're using the package and found some bugs, please report them at https://github.com/marcveens/react-context-mutex/issues and I'll try to take a look ASAP. 

Cheers!