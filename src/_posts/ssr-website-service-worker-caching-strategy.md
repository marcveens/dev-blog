---
date: '2021-03-23T00:00:00.000Z'
title: 'Client-side caching strategy and offline support for SSR websites using the Service Worker'
description: "How to cache your client-side assets and use them offline by using the Service Worker when working with a server-side rendered website"
template: "post"
draft: false
excerpt: "How to cache your client-side assets using the Service Worker when working with a server-side rendered website..."
category: "Service Worker"
tags:
  - "Service Worker"
  - "caching"
  - "offline"
  - "SSR"
---

Used TS files:<br />
📎 <a href="https://gist.github.com/marcveens/57b32abdff7d3b8d77ef4bbf8c3b934c#file-service-worker-ts" target="_blank" rel="noopener noreferrer">service-worker.ts</a><br />
📎 <a href="https://gist.github.com/marcveens/57b32abdff7d3b8d77ef4bbf8c3b934c#file-googlefontscache-ts" target="_blank" rel="noopener noreferrer">googleFontsCache.ts</a>

---
 
This post is for everyone wanting to make use of client-side asset caching using the Service Worker. There will also be a highlight on what you need to keep in mind when you're using server-side rendering (SSR) as well. How the Service Worker works behind the scenes isn't explained in this post. 

Currently I am working on a React website that makes use of the <a href="https://github.com/airbnb/hypernova" target="_blank" rel="noopener noreferrer">Hypernova</a> server-side rendering service. There are a couple of reasons why we use SSR. The main one is SEO, it makes sure your React site gets indexed the best way possible. The second reason is performance; every time a page gets requested, basically only a cached HTML file gets served. It won't get much quicker than that.

All good to have the backend optimized, but a subject that is skipped very often is front-end caching. I rarely hear and read about people using the Service Worker, even though it has become much more accessible in the last couple of years. 

## Service Worker
The <a href="https://developers.google.com/web/ilt/pwa/introduction-to-service-worker" target="_blank" rel="noopener noreferrer">Service Worker</a> is a type of web worker. It's essentially a JavaScript file that runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages. 

## Workbox
In our project we make use of <a href="https://developers.google.com/web/tools/workbox" target="_blank" rel="noopener noreferrer">Workbox</a> to ease the implementation of the Service Worker. Workbox provides a set of scripts for precaching, runtime caching, caching strategies and request routing.

## The strategy
Before implementing client-side caching you need to determine what strategy/strategies fit(s) best. For our project I decided to make use <a href="https://developers.google.com/web/tools/workbox/modules/workbox-precaching" target="_blank" rel="noopener noreferrer">precaching</a> and the <a href="https://developers.google.com/web/tools/workbox/modules/workbox-strategies#network_only" target="_blank" rel="noopener noreferrer">NetworkOnly</a>, <a href="https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network" target="_blank" rel="noopener noreferrer">CacheFirst</a> and <a href="https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate" target="_blank" rel="noopener noreferrer">Stale-While-Revalidate</a> strategies.

- __precaching__: used for storing all webpack-handled assets in the browser cache. This includes JS, CSS, imported images, JSON files etc.
- __NetworkOnly__: used for serving an index.html file when the browser is offline. 
- __CacheFirst__: used for serving Google Font files
- __Stale-While-Revalidate__: used for all non-imported images, other webfonts and some XHR responses.    

## The implementation
At the top of this post I provided links to the files I used at the project. I will explain them a bit more over here.

```typescript
declare const self: ServiceWorkerGlobalScope;
```

Since the Service Worker lives separately from the main browser thread, it has its own scope. You can use `self` to refer to this scope.

```typescript
clientsClaim();
```

This will make sure unclaimed clients are <a href="https://developers.google.com/web/tools/workbox/modules/workbox-core#skip_waiting_and_clients_claim" target="_blank" rel="noopener noreferrer">claimed again</a>. I read sometimes that people might not need this, so see for yourself if you find this necessary. I don't think it hurts if you add it anyway. 

```typescript
const manifest = self.__WB_MANIFEST;
const thirtyDaysInSeconds = 60 * 60 * 24 * 30;
const cacheNames = {
    appImages: 'app-image',
    appFetch: 'app-fetch'
};
```

`self.__WB_MANIFEST` is a piece of magic. Since Workbox v5 it is used as the main injection point for all assets that are processed through webpack. After the build the variable will automatically be replaced by an `array` including all your assets so they can be precached. 

The `thirtyDaysInSeconds` variable I created to use in an `ExpirationPlugin` to make sure some files will automatically expire after 30 days.

I also keep track of the different caches I use, which I store in `cacheNames`. I do this to be able to delete any other cache that I don't use (anymore). 

```typescript
precacheAndRoute(manifest);
```

Over here I make sure all the injected asset references are precached. 

```typescript
self.addEventListener('install', function () {
    console.log('Installed service worker');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    cleanOldCaches(event);
});
```

Adding two event listeners to the Service Worker scope. On install I make sure the new SW instance is activated immediately, instead of waiting for the next refresh. Why I chose to do this you can read in the tips below. 

On activate I make sure all the old caches are deleted. This way no storage is spilled. 

```typescript
const navigationHandler = async (params) => {
    try {
        // Attempt a network request.
        return await new NetworkOnly().handle(params);
    } catch (error) {
        // If it fails, return the cached HTML.
        return caches.match(indexHtmlKey);
    }
};
const navigationRoute = new NavigationRoute(navigationHandler);
registerRoute(navigationRoute);
```

This piece of code was necessary to make the Service Worker SSR compatible. What you read most of the time is that the website is served by a single index.html, because that's how progressive web apps work. That's cool and all until you work with a combination of backend routing, client-side routing and SSR. 

With SSR you want the server to serve a HTML page with all HTML already included. That page is not a page you want to cache, since a website can consist of many hundred, if not more, pages. This piece of code does a network request, if it succeeds, you're online and good to serve the page as is. If it fails, it does return the index.html in the catch clause so your offline PWA takes over. 

```typescript
googleFontsCache();
```

We use some Google fonts, which are perfect to cache. They don't change at all, and the request returns on every single page. I didn't write the code behind this myself, the guys at developer.google.com did a brilliant job at this. You can find the file behind this function call <a href="https://gist.github.com/marcveens/57b32abdff7d3b8d77ef4bbf8c3b934c#file-googlefontscache-ts" target="_blank" rel="noopener noreferrer">over here</a>.

```typescript
registerRoute(
    ({ url, sameOrigin }) => {
        const match = url.pathname.match(/app\/images\/(.*)\.(jpe?g|png|woff2?|svg)$/);

        return sameOrigin && match && match.length > 0;
    },
    new StaleWhileRevalidate({
        cacheName: cacheNames.appImages,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: thirtyDaysInSeconds
            }),
        ]
    })
);
```

This is where I make sure all non-imported images and fonts are cached for fast delivery and offline use. As you can see I only allow images from the same origin, and check if the path contains `/app/images`, that's where our images live. 

I use `CacheableResponsePlugin` to make sure only responses with a HTTP header until 200 are cached, and set an expiration date of 30 days. If images changed before that, `StaleWhileRevalidate` will make sure they're updated before that expiry date anyway. 

```typescript
registerRoute(
    ({ url, sameOrigin }) => {
        const isPageLayout = url.search.includes('/sitesettings/pagelayout');

        return sameOrigin && isPageLayout;
    },
    new StaleWhileRevalidate({
        cacheName: cacheNames.appFetch,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);
```

Last but not least, I cache an XHR response which occurs on every page and is also vital for offline use. This request returns the header and footer links of our website, so think about if you might want to cache similar calls. It's this simple to cache XHR responses! Please note that we use `url.search` here because that part of the URL is in our queryString. More often than not you'd use `url.pathname`. 

## My tips
- Implement a feature flag for production environments that allows you to register/unregister all Service Workers. Client-side caching can be unforgiving because making a mistake can cause a file to be cached almost indefinitely. If you have a feature flag you can unregister the Service Worker on all clients immediately. 
- Always use `skipWaiting()` to make sure your new Service Worker is installed immediately after page load, instead of waiting for the next refresh. If you don't use it, the "old" cached JS files will be used momentarily even though after a deployment an API call has changed for example. That means that your old JS code communicates with a new API endpoint. A recipe for disaster if you ask me.
- Make sure old caches are cleaned up. Either by using the Workbox ExpirationPlugin, the precaching script which removes old entries automatically, or write a script for it yourself. You don't want the cache to pile up with old files. 
- If you have problems with clients not registering your Service Worker, see if the `scope` is set correctly at the registration of the Service Worker. We serve all our files from `/app`, but the root of our site obviously lives at `/`. That's why I explicitly had to set the scope to `/`. 
- Test your Service Worker locally before you deploy it. Test it, test it, test it. See if resources are updated correctly after a change, try offline mode, make use of the Lighthouse devtools in Chrome to see if there are any problems. Test, test, test! 

## Footnote
I've been working with Service Workers for a while now, but I think I only recently kind of got the hang of it. Service Workers are quite overwhelming when you start working with them. That's why the <a href="https://developers.google.com/web/fundamentals/primers/service-workers" target="_blank" rel="noopener noreferrer">Google developer docs</a> are a perfect place to start. The very basics are explained over there as well as more advances implementations. Other than that, try it out yourself. Build a small proof-of-concept and see for yourself how it works. Again, make sure you test it really well before publishing anything to a production environment, because once cached in the wrong way, it's hard to undo it. The cache might live on thousands of devices and cannot be undone easily.

In the end I got very excited about Service Workers and was surprised how easy they are implemented with the help of Workbox.

If you've got any questions, please let me know!

---

Files used in this post:
<br />
📎 <a href="https://gist.github.com/marcveens/57b32abdff7d3b8d77ef4bbf8c3b934c#file-service-worker-ts" target="_blank" rel="noopener noreferrer">service-worker.ts</a><br />
📎 <a href="https://gist.github.com/marcveens/57b32abdff7d3b8d77ef4bbf8c3b934c#file-googlefontscache-ts" target="_blank" rel="noopener noreferrer">googleFontsCache.ts</a>
