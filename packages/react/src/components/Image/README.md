# Image

> The Image component will be used as the primary way of embedding images on
> pages.

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

> 💡 Only import fonts once per usage. Don't forget to import the Image styles
> from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'yourapplication.scss';

function App() {
  const sources = [
    {
      src: 'https://dummyimage.com/320x160',
      breakpoint: 320,
    },
    {
      src: 'https://dummyimage.com/400x400',
      breakpoint: 400,
    },
    {
      src: 'https://dummyimage.com/672x672',
      breakpoint: 672,
    },
  ];

  return <Image sources={image} defaultSrc={image.default} alt={image.alt} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the image styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

## Props

| Name              | Required | Data Type | Default Value  | Description                                   |
| ----------------- | -------- | --------- | -------------- | --------------------------------------------- |
| `defaultSrc`      | YES      | String    | n/a            | Featured                                      |
| `alt`             | YES      | String    | 'sample image' | Alternate text for image component            |
| `longDescription` | NO       | String    | null           | Visible to screen readers, hidden from users. |
| `sources`         | NO       | Array     | null           | Array of image objects. See `sources` below.  |

### sources

| Name         | Data Type     | Description                                  |
| ------------ | ------------- | -------------------------------------------- |
| `src`        | String        | Url of Image.                                |
| `breakpoint` | Num OR String | min-width breakpoint to render the image src |

## Stable selectors

| Name                         | Description |
| ---------------------------- | ----------- |
| `dds--imagecomponent`        | Interactive |
| `dds--imagecomponent__image` | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
