# Content Item - Horizontal

> The ContentItemHorizontal sub-pattern displays information in a horizontal
> orientation.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/content-item-horizontal/content-item-horizontal';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> content-item-horizontal styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardGroup } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const eyebrow = 'Lorem ipsum';
  const heading = 'Aliquam condimentum';
  const copy =
    'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.';
  const cta = [
    {
      type: 'local',
      copy: 'Link text',
      href: 'https://example.com',
    },
    {
      type: 'external',
      copy: 'External link text',
      href: 'https://example.com',
    },
  ];

  return (
    <ContentItemHorizontal
      eyebrow={eyebrow}
      heading={heading}
      copy={copy}
      cta={cta}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)..

```
  SASS_PATH=node_modules:src
```

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                                                    |
| --------- | -------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eyebrow` | NO       | String    | null          | Optional text displayed above the heading.                                                                                                                                                                     |
| `heading` | YES      | String    | null          | Heading of the content item.                                                                                                                                                                                   |
| `copy`    | YES      | String    | null          | Copy of the content item. Accepts _italic_ markdown formatting.                                                                                                                                                |
| `cta`     | NO       | Array     | null          | Optional CTA links displayed below the copy. See [CTA props](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/sub-patterns/ContentItemHorizontal#cta-props). |

### CTA Props

| Name   | Required | Data Type | Description                                |
| ------ | -------- | --------- | ------------------------------------------ |
| `type` | YES      | Object    | Link type. Accepts `local` and `external`. |
| `copy` | YES      | String    | Link text.                                 |
| `href` | YES      | String    | URI for internal or external resource.     |

## Stable selectors

| Name                                          | Description                   |
| --------------------------------------------- | ----------------------------- |
| `dds--content-item-horizontal__item`          | Content item wrapper element. |
| `dds--content-item-horizontal__item--eyebrow` | Content item eyebrow element. |
| `dds--content-item-horizontal__item--heading` | Content item heading element. |
| `dds--content-item-horizontal__item--copy`    | Content item copy element.    |
| `dds--content-item-horizontal__item--cta`     | Content item cta element.     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
