---
slug: netlify-cms-dynamic-select-widget-values
date: 2019-07-12
title: 'Use the Netlify CMS select widget with dynamic values'
description: 'How to create a custom widget using the existing Netlify CMS select widget and add dynamic values'
published: true
---

What I wanted to achieve was a custom select widget, filled with dynamic values, thus not set in the config.yml. The default select widget of the Netlify CMS is very useful though, since it supports search-as-you-type functionality.

I spent some time figuring out how to add a custom select widget to the Netlify CMS with dynamic values. Turned out not to be so straight forward as I expected it to be. For example you can't make the control widget a Functional Component, that's when you'll end up with this error: `netlify-cms-app.js:247 Uncaught TypeError: this.wrappedControlValid is not a function`. 

How it actually does work is like this. 
```typescript
import React from 'react';
import CMS from 'netlify-cms-app';
import Immutable, { Map, List } from 'immutable';

type SelectOptions = List<{ label: string; value: string | number }>;
type ControlProps = {
    field: Map<string, string | SelectOptions>;
}

export class Control extends React.Component<ControlProps> {
    render() {
        const SelectControl = CMS.getWidget('select').control;
        const selectProps = { ...this.props };

        selectProps.field = selectProps.field.set('options',
            Immutable.List([
                { label: 'Hello', value: 1 },
                { label: 'Goodbye', value: 2 }
            ])
        );

        console.log(selectProps.field);

        return (
            <SelectControl {...selectProps} />
        );
    }
}
```

Be aware that you need to modify the props of the component, to do that, I made a copy of the original props and called it selectProps. This way the original props don't get mutated. 

Next up we need to change the options within the `props.field`. This is a `Map` from the `immutable` library. It returns the adjusted value, so we need to set `selectProps.field` with the new value. Next up we need to change the options list, that's a `List` from the `immutable` library. See above how you can change it. 

You can imagine it's now easy to set it with any value you want. You can fetch new values from an API or set them as static values in Javascript. 

The widget preview I haven't worked out completely, but a really basic implementation looks like this:

```typescript

export const preview = (props) => {
    return (
        <div>{props.value}</div>
    );
}
```

That being said, I added these 2 lines of code to `/src/cms/cms.tsx`:
```typescript
import { Control as customSelectorControl, Preview as customSelectorPreview } from './widgets/CustomSelector';

CMS.registerWidget('customSelector', customSelectorControl, customSelectorPreview);
```

And now you can use it like this in your `static/admin/config.yml` file:

```yml
- label: Custom selector
  name: customFields
  widget: customSelector
```

And that gives you a custom select component in the Netlify CMS with dynamic values.

