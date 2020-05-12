# Callout With Media

> The "Callout With Media" is a decorator of `Callout`, which includes
> `Content Block Simple`.

## Getting started

Here's a quick example to get your started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/callout-with-media/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> CalloutWithMedia styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CalloutWithMedia } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const copy = 'lorum ipsum dolor sit ameet';
  const heading = 'lorum ipsum dolor sit amet';
  const mediaData = {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: {
      sources: [
        {
          src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
          breakpoint: 320,
        },
        {
          src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
          breakpoint: 400,
        },
        {
          src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
          breakpoint: 672,
        },
      ],
      alt: 'Image alt text',
      defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
    },
  };
  const mediaType = 'image';

  return (
    <CalloutWithMedia
      heading={heading}
      copy={copy}
      mediaType={mediaType}
      mediaData={mediaData}
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

## Props

| Name                           | Required | Data Type | Default Value | Description                                                                                                                                                                            |
| ------------------------------ | -------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `props for ContentBlockSimple` | YES      | Object    | null          | Content Block Simple. See [ContentBlockSimple](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/patterns/blocks/ContentBlockSimple/README.md) |

## Stable selectors

| Name                      | Description |
| ------------------------- | ----------- |
| `dds--callout-with-media` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
