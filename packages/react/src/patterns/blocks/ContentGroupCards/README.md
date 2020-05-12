# Content Group Cards

> The Content Group Cards pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-group-cards/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentGroupCards styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

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

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
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
| `heading` | String    | Title for the Card.                                        |
| `copy`    | String    | Copy for the Card.                                         |
| `cta`     | Object    | Object containing target and href of cta. See `cta` below. |

### cta

| Name   | Data Type | Description                       |
| ------ | --------- | --------------------------------- |
| `href` | String    | Url of the Content Card item cta. |

## Stable selectors

| Name                             | Description |
| -------------------------------- | ----------- |
| `dds--content-group-cards`       | Component   |
| `dds--content-group-cards-group` | Component   |
| `dds--content-group-cards-item`  | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
