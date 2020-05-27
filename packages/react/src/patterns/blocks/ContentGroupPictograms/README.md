# Content Group — with Pictograms

> The Content Group — with Pictograms pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-group-pictograms/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentGroupPictograms styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroupPictograms } from '@carbon/ibmdotcom-react';
import { Desktop, Touch, Pattern } from '@carbon/pictograms-react';
import 'yourapplication.scss';

const heading = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const items = [
  {
    heading: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      type: 'local',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor',
    },
    pictogram: {
      src: Desktop,
      'aria-label': 'Desktop Pictogram',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      type: 'local',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor',
    },
    pictogram: {
      src: Touch,
      'aria-label': 'Touch Pictogram',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      type: 'local',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor',
    },
    pictogram: {
      src: Pattern,
      'aria-label': 'Pattern Pictogram',
    },
  },
];

function App() {
  return <ContentGroupPictograms heading={heading} items={items} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the Content Group Pictograms styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Markdown

Italic is accepted in the copy of the content item using markdown sytanx: single
`_` (underscore) or `*` (asterisk)

Example:

```javascript
{
  copy: '_Lorem_ ipsum *dolor* sit amet.',
  ...
}
```

Renders:

_Lorem_ ipsum _dolor_ sit amet.

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                  |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | null          | Main title of Content Group — with Pictograms pattern                                                                                                                        |
| `items`   | YES      | Array     | null          | Array of PictogramItems, check [PictogramItem](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/PictogramItem/README.md) |
| 👀        |

## Stable selectors

| Name                                  | Description |
| ------------------------------------- | ----------- |
| `dds--content-group-pictograms`       | Component   |
| `dds--content-group-pictograms__item` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
