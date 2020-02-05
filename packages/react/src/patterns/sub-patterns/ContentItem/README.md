# Content Item

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/content-item';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroup } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem ipsum dolor sit amet.';
  const copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  const image = {
    images: [
      { src: 'https://picsum.photos/id/2/288/144', minWidth: 'sm' },
      { src: 'https://picsum.photos/id/2/448/224', minWidth: 'md' },
      { src: 'https://picsum.photos/id/2/352/176', minWidth: 'lg' },
    ],
    alt: 'content item image',
    defaultImage: 'https://picsum.photos/id/2/352/176',
  };

  return <ContentItem heading={heading} copy={copy} image={image} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the content group styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                      |
| --------- | -------- | --------- | ------------- | -------------------------------- |
| `heading` | NO       | String    | null          | Heading text                     |
| `copy`    | NO       | String    | null          | Copy text                        |
| `image`   | NO       | object    | null          | Image object. See `image` below. |

### image (optional)

| Name      | Data Type | Description                                                                  |
| --------- | --------- | ---------------------------------------------------------------------------- |
| `images`  | Array     | Array of image spec objects including src of image and min-width breakpoint. |
| `default` | String    | Default image, usually for largest breakpoint.                               |
| `alt`     | String    | Alt description of the image                                                 |

## Stable selectors

| Name                         | Description                   |
| ---------------------------- | ----------------------------- |
| `dds--content-item`          | Content item wrapper element. |
| `dds--content-item__heading` | Content item heading element. |
| `dds--content-item__copy`    | Content item copy element.    |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
