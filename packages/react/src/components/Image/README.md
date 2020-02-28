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

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'yourapplication.scss';

function App() {
  return (
    <Image
      images={sortImages(image)}
      defaultImage={image.default}
      alt={image.alt}
      customClassName={customClassName}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the image styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

## Props

| Name              | Required | Data Type | Default Value | Description                                 |
| ----------------- | -------- | --------- | ------------- | ------------------------------------------- |
| `defaultImage`    | YES      | String    | null          | Default image.                              |
| `alt`             | YES      | String    | null          | Alternate text for image.                   |
| `customClassName` | NO       | String    | null          | User-defined class name.                    |
| `images`          | NO       | Array     | null          | Array of Image objects. See `Images` below. |

### Images

| Name       | Data Type | Description        |
| ---------- | --------- | ------------------ |
| `src`      | String    | Url of Image.      |
| `minWidth` | int       | min Width of image |

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
