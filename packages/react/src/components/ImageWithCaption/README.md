# Image With Caption

> The ImageWithCaption component will be used as the primary way of embedding
> images on pages.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/image-with-caption/image-with-caption';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ImageWithCaption styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'yourapplication.scss';

function App() {
  const heading = 'this is the caption text.';
  const image = {
    defaultSrc: 'https://dummyimage.com/672x672',
    alt: 'image with caption alt text',
  };

  return <ImageWithCaption image={image} heading={heading} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the image styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

## Props

| Name    | Required | Data Type | Default Value | Description                                                            |
| ------- | -------- | --------- | ------------- | ---------------------------------------------------------------------- |
| image   | YES      | Object    | n/a           | Image object needed for ImageWithCaption component. See `image` below. |
| heading | YES      | string    | n/a           | Caption text for ImageWithCaption component.                           |

### image

Visit the
[Image storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/components-image--default)
for more details on the Image component.

## Stable selectors

| Name                      | Description |
| ------------------------- | ----------- |
| `dds--image-with-caption` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
