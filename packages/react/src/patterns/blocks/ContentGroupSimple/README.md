# Content Group - Simple

> The Content Group – Simple pattern includes a heading, Content Items, an
> optional CTA Component, and an optional media (image or video).

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-group-simple/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentGroupSimple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroupSimple } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const heading = 'Lorem ipsum dolor sit amet';

const mediaData = {
  sources: [
    {
      src: 'https://dummyimage.com/320x160/ee5396/161616&text=2x1',
      breakpoint: 320,
    },
    {
      src: 'https://dummyimage.com/400x400/ee5396/161616&text=1x1',
      breakpoint: 400,
    },
    {
      src: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
      breakpoint: 672,
    },
  ],
  alt: 'Image alt text',
  defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
};

const mediaType = 'image';

const items = [
  {
    heading: 'Lorem ipsum dolor sit amet.',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
  },
  {
    heading: 'Lorem ipsum dolor sit amet.',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
  },
  {
    heading: 'Lorem ipsum dolor sit amet.',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
  },
  {
    heading: 'Lorem ipsum dolor sit amet.',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
  },
];

const cta = {
  title: 'Lorem ipsum dolor',
  href: 'https://www.example.com',
};

function App() {
  return (
    <ContentGroupSimple
      mediaType={mediaType}
      mediaData={mediaData}
      heading={heading}
      items={items}
      cta={cta}
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

> 💡 Don't forget to import the content-group-simple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | YES      | String    | n/a           | Main heading of the pattern.                                                                                                                                                                                                                                                                                                                                     |
| `items`     | YES      | Array     | n/a           | Data to be used on ContentItems. Check [ContentItem](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/ContentItem/README.md)👀                                                                                                                                                                    |
| `cta`       | No       | Object    | n/a           | Data to be used on CTA. Check [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/CTA/README.md)👀                                                                                                                                                                                                        |
| `mediaType` | NO       | String    | n/a           | Determines media type (image or video).                                                                                                                                                                                                                                                                                                                          |
| `mediaData` | NO       | Object    | n/a           | Media Data for either image or video. See the [`ImageWithCaption`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ImageWithCaption) or [`VideoPlayer`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/VideoPlayer) component for full usage details. |

## Stable selectors

| Name                               | Description                                     |
| ---------------------------------- | ----------------------------------------------- |
| `dds--content-group-simple`        | Main Wrapper for Content Group - Simple pattern |
| `dds--content-group-simple__media` | Wrapper for the media component.                |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
