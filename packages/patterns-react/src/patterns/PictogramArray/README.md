# Content array with pictograms

> The Content array with pictograms pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/pictogramarray/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { PictogramArray } from '@carbon/ibmdotcom-patterns-react';
import { Desktop, Touch, Pattern } from '@carbon/pictograms-react';
import 'yourapplication.scss';

const title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const contentGroup = [
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_blank',
    },
    pictogram: Desktop,
  },
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_blank',
    },
    pictogram: Touch,
  },
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_blank',
    },
    pictogram: Pattern,
  },
];

function App() {
  return <PictogramArray title={title} contentGroup={contentGroup} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_PICTOGRAM_ARRAY=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name           | Required | Data Type | Default Value | Description                                               |
| -------------- | -------- | --------- | ------------- | --------------------------------------------------------- |
| `title`        | YES      | String    | n/a           | Main title of Pictogram Array pattern                     |
| `contentGroup` | NO       | Array     | null          | Array of content group objects. See `contentGroup` below. |

### contentGroup

| Name        | Data Type | Description                                                                                                                                            |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`     | String    | Title of content item.                                                                                                                                 |
| `copy`      | Object    | Copy of content item.                                                                                                                                  |
| `link`      | Object    | Object with the href, text, and target properities of the link. See `link` below.                                                                      |
| `pictogram` | Object    | Pictogram object to be rendered with content item from [Carbon's Pictogram library](https://www.carbondesignsystem.com/guidelines/pictograms/library/) |

### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Url of link.                                               |
| `text`   | String    | Link text.                                                 |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

## Stable selectors

| Name                       | Description |
| -------------------------- | ----------- |
| `dds--pictogramarray`      | Component   |
| `dds--pictogramarray-item` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
