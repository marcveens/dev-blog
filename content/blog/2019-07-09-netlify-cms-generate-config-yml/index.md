---
slug: netlify-cms-generate-config-yml
date: 2019-07-09
title: 'Generate your Netlify CMS config.yml using Typescript'
description: 'Make use of the power of Typescript in order to generate a Netlify CMS config.yml.'
published: true
---

Regularly while working with a [Netlify CMS](https://www.netlifycms.org/) you need the `config.yml` file to configure your entire CMS. I found this to suboptimal and wanted to use the power of Typescript to generate the config file. In the end it's really easy to do.

Start by creating a `config.src.ts` file in the `static/admin` folder, next to the `config.yml`. I added `.src` to it just to indicate the difference between the files.

This is what the file looks like:
<script src="https://gist.github.com/marcveens/c723f6ce70f7f231ebde323b71ce7954.js"></script>


First you need to install the [`ts-node`](https://www.npmjs.com/package/ts-node) npm package. 