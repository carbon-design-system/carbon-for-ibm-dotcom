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

| Name    | Required | Data Type | Default Value | Description                                                          |
| ------- | -------- | --------- | ------------- | -------------------------------------------------------------------- |
| `style` | YES      | String    | text          | Describes style type, for more information See `Style type's` below. |
| `type`  | YES      | String    | local         | Describes which type (`local`                                        | `jump` | `external`) icon. |

## Style type's

| Style Type | Component Name | Description                                                               |
| ---------- | -------------- | ------------------------------------------------------------------------- |
| `text`     | LinkWithIcon   | See the documentation of LinkWithIcon component and use thier props here. |
| `button`   | ButtonGroup    | See the documentation of ButtonGroup component and use thier props here.  |
| `card`     | Card           | See the documentation of Card component and use thier props here.         |
| `feature`  | FeatureCard    | See the documentaion of FeatureCard component and user their props here.  |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
