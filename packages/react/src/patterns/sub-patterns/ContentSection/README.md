# Content Section

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/content-group';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentSection } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem ipsum dolor sit amet.';

  return (
    <ContentSection heading={heading}>
      //Children goes here
    </ContentGroup>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the content group styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name       | Required | Data Type | Default Value | Description                     |
| ---------- | -------- | --------- | ------------- | ------------------------------- |
| `heading`  | YES      | String    | null          | Heading text                    |
| `children` | NO       | Object    | null          | Container for other components. |

## Stable selectors

| Name                             | Description                   |
| -------------------------------- | ----------------------------- |
| `dds--content-section`           | Content group wrapper element |
| `dds--content-section__heading`  | Content group title element   |
| `dds--content-section__children` | Wrapper for children elements |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
