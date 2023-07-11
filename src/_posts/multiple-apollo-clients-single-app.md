---
date: '2023-06-29T00:00:00.000Z'
title: 'Multiple Apollo clients in a single application'
description: "Sometimes it's inevitable to consume 2 GraphQL endpoints in a single application, here's how to do that"
template: "post"
draft: false
category: "GraphQL"
tags:
  - "GraphQL"
  - "JavaScript"
  - "Typescript"
  - "Apollo Client"
---

<a href="https://github.com/marcveens/multiple-graphql-endpoints" target="_blank" rel="noopener noreferrer">⌨️ View on GitHub</a>

Imagine this, you spent day and night working on the perfect web application. You worked together with the backend devs to craft the smoothest and most stable GraphQL endpoint there ever was. Filtering, sorting, paging, all the parts were there. New collection? No problem at all, it's added in no-time. Amazing! Until... It was decided to add a second GraphQL endpoint. Wait what, can't we add it as a collection to the current endpoint? No? But wait, we can do schema stitching, right? Right??

Well the answer was no. Here we are with 2 GraphQL endpoints that both need to be consumed simultaneously. We're using [Apollo Client](https://www.apollographql.com/docs/react/), which by default only supports a single endpoint. Next to that, we're also using the [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) for converting the schema and `operations.graphql` files to Typescript types and documents. A generic, solid solution was mandatory to support both of these libs, so I went ahead and created a structure that you can also reuse in your projects. 

## Used endpoints
I created a demo application on <a href="https://github.com/marcveens/multiple-graphql-endpoints" target="_blank" rel="noopener noreferrer">GitHub</a>. In this demo I consumed data from a free-to-use SpaceX GraphQL endpoint and a countries GraphQL endpoint.

## Consumption of data
First I want to show what I ended up with on the consumption part of the application. 
(embed https://github.com/marcveens/multiple-graphql-endpoints/blob/main/src/components/HelloWorld.tsx)

<github-embed owner="marcveens"></github-embed>

As you can see, instead of the default `useQuery` hook from Apollo I now have `useSpacexQuery` and `useCountriesQuery` hooks. As you can imagine, they both fetch data from their corresponding data source. I made `useSpacexMutation` and `useCountriesMutation` available as well, I just don't use them in this example.

## Setting up Apollo clients
In (embed https://github.com/marcveens/multiple-graphql-endpoints/blob/main/src/apollo/useApollo.ts) I made the hooks available. What I basically do, is create a generic instance of `useQuery` and inject the correct Apollo Client based on whether you want SpaceX data or Countries data.

In (embed https://github.com/marcveens/multiple-graphql-endpoints/blob/main/src/apollo/useApolloClient.ts) you can see how to return the correct GraphQL endpoint for your data. By creating 2 Apollo Clients (or more if you need them) you can use either of them in your data calls. 

Because we created the custom `useXQuery` hook, we don't ever have to think of configuring the Apollo Client again, we can just use it as easily as when you only had one `useQuery` hook. Pretty easy, huh?!

