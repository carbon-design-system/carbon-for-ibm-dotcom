# Content Group Cards

> The Content Group Cards pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/contentgroupcards/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroupCards } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const heading = 'Lorem ipsum dolor sit amet.';

const items = [
  {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: {
      href: 'https://www.example.com',
    },
  },
];

function App() {
  return <ContentGroupCards heading={heading} content={content} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the ContentGroupCards styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                          |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------- |
| `heading` | YES      | String    | n/a           | Main heading of the pattern.                         |
| `items`   | NO       | Array     | null          | Array of content group objects. See `content` below. |

### content

| Name      | Data Type | Description                                                |
| --------- | --------- | ---------------------------------------------------------- |
| `heading` | String    | Title of the Content Card item.                            |
| `copy`    | String    | Copy of the Content Card item.                             |
| `cta`     | Object    | Object containing target and href of cta. See `cta` below. |

### cta

| Name   | Data Type | Description                       |
| ------ | --------- | --------------------------------- |
| `href` | String    | Url of the Content Card item cta. |

## Stable selectors

| Name                           | Description |
| ------------------------------ | ----------- |
| `dds--contentgroupcards`       | Component   |
| `dds--contentgroupcards-group` | Component   |
| `dds--contentgroupcards-item`  | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
