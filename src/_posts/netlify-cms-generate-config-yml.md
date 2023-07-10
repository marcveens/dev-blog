---
date: '2019-07-09T00:00:00.000Z'
title: 'Generate your Netlify CMS config.yml using Typescript'
description: 'Make use of the power of Typescript in order to generate a Netlify CMS config.yml.'
excerpt: "Regularly while working with a Netlify CMS you need the config.yml file to configure your entire CMS. I found this to be suboptimal and wanted to use the power of Typescript to generate the config file. In the end it's really easy to do."
template: "post"
draft: false
category: "Netlify CMS"
tags:
  - "React"
  - "Netlify CMS"
  - "Typescript"
---

Regularly while working with a [Netlify CMS](https://www.netlifycms.org/) you need the `config.yml` file to configure your entire CMS. I found this to be suboptimal and wanted to use the power of Typescript to generate the config file. In the end it's really easy to do.

In order to run this "tool" you need a couple of npm packages:
 - `yml` ([npm](https://www.npmjs.com/package/yaml)) - Used for converting to yml
 - `node-ts` ([npm](https://www.npmjs.com/package/ts-node)) - Used for running the script in NodeJS

Now start by creating a `config.src.ts` file in the `static/admin` folder, next to the `config.yml`. I added `.src` to it just to indicate the difference between the files.

This is what my basic version of the file looks like:

```typescript
import { CmsConfig, CmsCollection, CmsField } from 'netlify-cms-core';
import * as YAML from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

const defaultMetaFields: CmsField[] = [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Page URL', name: 'url', widget: 'string' },
    {
        label: 'Meta', name: 'meta', widget: 'object', fields: [
            { label: 'Title', name: 'title', widget: 'string' },
            { label: 'Description', name: 'description', widget: 'string' }
        ]
    }
];

const demoPage: CmsCollection = {
    name: 'demopage',
    label: 'Demo page',
    folder: 'src/pages/demopage',
    create: true,
    delete: true,
    extension: 'md',
    slug: '{{url}}',
    fields: [
        { label: 'Template Key', name: 'templateKey', widget: 'hidden', default: 'demoPage' },
        ...defaultMetaFields,
        { label: 'Body', name: 'body', widget: 'markdown' },
    ]
};

const config: CmsConfig = {
    backend: {
        name: 'git-gateway',
        branch: 'master'
    },
    media_folder: 'static/img',
    public_folder: '/img',
    publish_mode: 'editorial_workflow',
    logo_url: 'https://example.com/logo.png',
    collections: [
        demoPage
    ]
};

// To generate the end file
const configDisclaimer = '# This file is generated\n# Only edit the config.src.ts file\n\n'; 
const configString = `${configDisclaimer}${YAML.stringify(config)}`;

fs.writeFile(path.resolve(__dirname, 'config.yml'), configString, (err) => {
    if (err) console.log(err);
    console.log('Generated the config.yml');
});
```

As you can see the Typescript is placed on top. After that the generation code is written. It adds a comment to the top of the yml file so everyone will see it's generated. Easy as that! Now we only need to add a script to the `package.json`:

```json
"scripts": {
    "generate-config-yml": "ts-node static/admin/config.src.ts"
}
```
