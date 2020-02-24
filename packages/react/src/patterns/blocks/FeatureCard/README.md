# FeatureCard

> The FeatureCard pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/feature-card/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { FeatureCard } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';
const heading = 'Lorem ipsum dolor sit amet.';
const card = [
  {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    cta: {
      target: '_blank',
      href: 'https://www.example.com',
    },
  },
];
function App() {
  return <FeatureCard heading={heading} card={card} />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the FeatureCard styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                               |
| --------- | -------- | --------- | ------------- | --------------------------------------------------------- |
| `heading` | YES      | String    | n/a           | Main title of the pattern.                                |
| `card`    | YES      | Object    | null          | Object containing Feature Card details. See `card` below. |

### card

| Name      | Data Type | Description                                                        |
| --------- | --------- | ------------------------------------------------------------------ |
| `heading` | String    | Title of the Card item.                                            |
| `image`   | Object    | Image object used in the FeatureCard component. See `image` below. |
| `cta`     | Object    | Object containing target and href of link. See `cta` below.        |

### image

| Name      | Required | Data Type | Description                              |
| --------- | -------- | --------- | ---------------------------------------- |
| `mobile`  | NO       | String    | Device in which needs to pass image      |
| `tablet`  | NO       | String    | Device in which needs to pass image      |
| `default` | YES      | String    | Max width of the device                  |
| `alt`     | NO       | String    | Alternate text for FeatureCard component |

### cta

| Name     | Data Type | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank'). |
| `href`   | String    | Url of the FeatureCard component.                           |

## Stable selectors

| Name                | Description |
| ------------------- | ----------- |
| `dds--feature-card` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
