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
    sources: [
      {
        src: 'https://dummyimage.com/288x144/ee5396/161616&text=2:1',
        breakpoint: 'sm',
      },
      {
        src: 'https://dummyimage.com/448x224/ee5396/161616&text=2:1',
        breakpoint: 'md',
      },
      {
        src: 'https://dummyimage.com/352x176/ee5396/161616&text=2:1',
        breakpoint: 'lg',
      },
    ],
    alt: 'Image alt text',
    defaultSrc: 'https://dummyimage.com/352x176/ee5396/161616&text=2:1',
  };

  const cta = {
    type: 'jump',
    copy: 'Click here',
    href: 'www.ibm.com',
  };

  return <ContentItem heading={heading} copy={copy} image={image} cta={cta} />;
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
| `cta`     | NO       | object    | null          | CTA object. See `cta` below.     |
| `image`   | NO       | object    | null          | Image object. See `image` below. |

### cta (optional)

Visit the
[CTA documentation](https://ibmdotcom-react.mybluemix.net/?path=/story/components-cta--default)
for more details on the CTA options.

### image (optional)

Visit the
[ImageWithCaption documentation](https://ibmdotcom-react.mybluemix.net/?path=/story/components-imagewithcaption--default)
for more details on the ImageWithCaption options.

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
