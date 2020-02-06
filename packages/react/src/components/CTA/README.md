# CTA

> The CTA component will be used to select different cta types pages.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/imagecomponent/imagecomponent';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTA } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <CTA style="text" type="local" copy="IBM Homepage" href="www.ibm.com" />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the image styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name    | Required | Data Type | Default Value | Description                                                    |
| ------- | -------- | --------- | ------------- | -------------------------------------------------------------- |
| `style` | YES      | String    | text          | Describes style type, for more information see `Styles` below. |
| `type`  | YES      | String    | local         | Describes icon type, for more information see `Types` below.   |

## Styles

| Style     | Component Name | Description                                                                                                                                                      |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`    | LinkWithIcon   | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/components-link-with-icon--default)!👀         |
| `button`  | ButtonGroup    | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/patterns-sub-patterns-buttongroup--default)!👀 |
| `card`    | Card           | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/patterns-sub-patterns-card--link)!👀           |
| `feature` | FeatureCard    | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/patterns-sub-patterns-card--link)!👀           |

## Types

| Type       | SVG element Name | Description                                                                                      |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page. For more details click `Icons` below.    |
| `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target. For more details click `Icons` below. |
| `external` | Launch20         | Describes launch arrow onClick which loads in new tab. For more details click `Icons` below.     |

## Icons

- [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
- [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)!👀
- [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
