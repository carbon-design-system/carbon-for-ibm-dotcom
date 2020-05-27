# Content Group - Horizontal

> The ContentGroupHorizontal block pattern contains a collection of
> [ContentItemHorizontal](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ContentItemHorizontal)
> content items.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/components/content-group-horizontal/content-group-horizontal';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> content-group-horizontal styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroupHorizontal } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const items = [
    {
      eyebrow: 'Lorem ipsum',
      heading: 'Aliquam condimentum',
      copy:
        'Lorem ipsum dolor sit amet, _consectetur_ sellus at elit sollicitudin.',
      cta: {
        items: [
          {
            type: 'local',
            copy: 'Link text',
            cta: {
              href: 'https://example.com',
            },
          },
          {
            type: 'external',
            copy: 'External link text',
            cta: {
              href: 'https://example.com',
            },
          },
        ],
      },
    },
    {
      eyebrow: 'Lorem ipsum',
      heading: 'Aliquam condimentum',
      copy:
        'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
    },
  ];

  return <ContentGroupHorizontal heading="Aliquam condimentum" items={items} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)..

```
  SASS_PATH=node_modules:src
```

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                                        |
| --------- | -------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | null          | Heading of the content group.                                                                                                                                                                      |
| `items`   | YES      | Array     | null          | Array of content items. See [ContentItemHorizontal](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ContentItemHorizontal) for usage details. |

## Stable selectors

| Name                            | Description |
| ------------------------------- | ----------- |
| `dds--content-group-horizontal` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
