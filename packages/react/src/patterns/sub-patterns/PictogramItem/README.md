# Pictogram Item

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/pictogram-item';
```

> 💡 Only import font's once per usage

```javascript
import { Desktop } from '@carbon/pictograms-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { PictogramItem } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem ipsum dolor sit amet.';
  const copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  const cta = {
    type: 'text',
    href: 'https://www.example.com',
    copy: 'Lorem ipsum dolor',
  };

  return (
    <PictogramItem
      heading={heading}
      copy={copy}
      cta={cta}
      Pictogram={Desktop}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the pictogram item styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                                                                                                                |
| ----------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | YES      | String    | null          | Heading text                                                                                                                                               |
| `copy`      | YES      | String    | null          | Copy text                                                                                                                                                  |
| `Pictogram` | YES      | Component | null          | Pictogram component imported from `@carbon/pictograms-react` package                                                                                       |
| `cta`       | NO       | Object    | null          | Object with cta data, check [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/CTA/README.md) |

## Stable selectors

| Name                            | Description                                        |
| ------------------------------- | -------------------------------------------------- |
| `dds--pictogram-item`           | Pictogram item wrapper element.                    |
| `dds--pictogram-item_content`   | Pictogram item wrapper for Content Item component. |
| `dds--pictogram-item_pictogram` | Pictogram item SVG.                                |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
