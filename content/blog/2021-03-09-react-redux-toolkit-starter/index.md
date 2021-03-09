---
slug: react-redux-toolkit-starter
date: 2021-03-09
title: 'react-redux-toolkit-starter: a jump-start for every hobby project'
description: "A simple React+Typescript+Redux starter project including a neat folder structure, fetching data and global state management"
published: true
excerpt: "A simple React+Typescript+Redux starter project including a neat folder structure, fetching data and global state management..."
---

<a href="https://codesandbox.io/s/github/marcveens/react-redux-toolkit-starter" target="_blank" rel="noopener noreferrer"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit on CodeSandbox" /><br />
<a href="https://marcveens-react-redux-toolkit-starter-q325.github.dev/" target="_blank" rel="noopener noreferrer">✏️ Edit on GitHub Codespaces</a><br />
<a href="https://github.com/marcveens/react-redux-toolkit-starter" target="_blank" rel="noopener noreferrer">⌨️ View on GitHub</a>

This project includes:
- <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> (with custom hooks)
- <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</a> (for state management in combination with <a href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">toolkit</a>)
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">Typescript</a>
- Fetched data management

## Philosophy
I created this simple project initially to help a colleague get up and running on a hobby project, but since it can possibly be of help to other developer I released it publicly. Thanks for the tip <a href="https://github.com/svdoever" target="_blank" rel="noopener noreferrer">Serge</a>.

Keep in mind that this is not a definitive best practice, but it would have helped me tremendously if I knew about this when I started developing about 10 years ago. That's why I think this is useful especially for starting developers. The project is small, though includes many features that make it sustainable in time. Let me explain that a bit more. 

## Folder structure
The folder structure is functional/feature based:
- `Counter` - feature
- `KanyeRest` - feature
- `assets` - for global assets like styles or icons
- `store` - for global state initialization

Within the `Counter` and `KanyeRest` features a more technical folder structure exists, which makes it predictable and easy to navigate through:
- `components` - where the .tsx files live
- `hooks` - for custom React hooks
- `state` - for feature specific state management
- `styles` - for feature specific styling
- `types` - for the feature specific types

## State management
The global state is set up using <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> together with <a href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">redux-toolkit</a>, which makes the Redux implementation in React (especially in combination with Typescript) much much more user friendly. 
 
The one thing I'm really enthusiastic about are so called <a href="https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice" target="_blank" rel="noopener noreferrer">slices</a> which basically brings the actions and reducers together in great harmony. It uses <a href="https://github.com/immerjs/immer" target="_blank" rel="noopener noreferrer">immer</a> in the background for immutable state modification, which I also really like. 

## Fetched data management
What are the basic stages of fetching data? Loading state, data fetched, error occurred? Lucky you, it's all in here! Take a look at the `useKanyeRest.ts` hook to see how it's pushed to the global state and view `KanyeRest.tsx` to see how it's consumed. 

## Custom hook
The custom React hook I use in the `KanyeRest` feature was created in the name of separation of concerns. It fetches some data from the <a href="https://kanye.rest/" target="_blank" rel="noopener noreferrer">KanyeRest API</a> and stores it in the global store. That's code you absolutely don't want in your components. The only thing that's exported is the `load()` function which _is_ called in the component. 

## CSS naming convention
For this example I use the <a href="http://getbem.com/naming/" target="_blank" rel="noopener noreferrer">BEM</a> naming methodology. BEM stands for Block Element Modifier and helps you structure your CSS-class names. I absolutely love this naming convention, which makes the most difficult part of programming, naming things, much easier. <a href="http://getbem.com/naming/" target="_blank" rel="noopener noreferrer">This article</a> explains perfectly how it works. 

Let me know if this helped you or what you do differently!