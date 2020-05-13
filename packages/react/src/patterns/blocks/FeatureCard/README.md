# Feature Card

> The Feature Card pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/feature-card/feature-card.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the FeatureCard
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { FeatureCard } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';
const heading = 'Lorem ipsum dolor sit amet.';
const card = [
  {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    cta: {
      href: 'https://www.example.com',
    },
    image: {
      defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
      alt: 'Image alt text',
    },
  },
];
function App() {
  return <FeatureCard heading={heading} card={card} />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
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

### cta

| Name   | Data Type | Description                       |
| ------ | --------- | --------------------------------- |
| `href` | String    | Url of the FeatureCard component. |

### image

Visit the
[Image storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/components-image--default)
for more details on the Image component.

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
