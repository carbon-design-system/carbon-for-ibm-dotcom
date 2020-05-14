# Pictogram Item

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/pictogram-item';
```

> 💡 Only import fonts once per usage. Don't forget to import the PictogramItem
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

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
    type: 'local',
    href: 'https://www.example.com',
    copy: 'Lorem ipsum dolor',
  };

  const pictogram = {
    src: Desktop,
    ariaLabel: 'Desktop pictogram',
  };

  return (
    <PictogramItem
      heading={heading}
      copy={copy}
      cta={cta}
      Pictogram={pictogram}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the pictogram item styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                                                                                                             |
| ----------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | YES      | String    | null          | Heading text                                                                                                                                            |
| `copy`      | YES      | String    | null          | Copy text                                                                                                                                               |
| `pictogram` | YES      | Object    | null          | See `Pictogram` bellow. package                                                                                                                         |
| `cta`       | NO       | Object    | null          | Object with CTA data, check [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA/README.md)👀 |

## pictogram

| Name | Required | Data Type | Default Value | Description | | `src` | YES |
Component | null | Pictogram component imported from `@carbon/pictograms-react`

## Accessibility

In order to make the component acessible to screen readers, you can provide aria
attributes inside the pictogram object.

```javascript
const pictogram = {
  src: Desktop,
  'aria-label': 'Description for the screen reader',
};
```

## Stable selectors

| Name                             | Description                                        |
| -------------------------------- | -------------------------------------------------- |
| `dds--pictogram-item`            | Pictogram item wrapper element.                    |
| `dds--pictogram-item__content`   | Pictogram item wrapper for Content Item component. |
| `dds--pictogram-item__pictogram` | Pictogram item SVG.                                |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
