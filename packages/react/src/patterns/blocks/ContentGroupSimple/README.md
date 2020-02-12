# Content Group - Simple

> The Content Group – Simple pattern includes a heading, Content Items, an
> optional CTA Component, and an optional media (image or video).

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-group-simple/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroupSimple } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const heading = 'Lorem ipsum dolor sit amet';

const mediaData = {
  images: [
    { src: 'https://picsum.photos/id/2/320/160', minWidth: 320 },
    { src: 'https://picsum.photos/id/2/400/400', minWidth: 400 },
    { src: 'https://picsum.photos/id/2/672/672', minWidth: 672 },
  ],
  alt: 'lead space image',
  defaultImage: 'https://picsum.photos/id/2/672/672',
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
  copy: 'Lorem ipsum dolor',
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

> 💡 Don't forget to import the content-group-simple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                                                                                                                                                   |
| ----------- | -------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | YES      | String    | n/a           | Main heading of the pattern.                                                                                                                                                                  |
| `items`     | YES      | Array     | n/a           | Data to be used on ContentItems. Check [ContentItem](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/ContentItem/README.md)👀 |
| `cta`       | No       | Object    | n/a           | Data to be used on CTA. Check [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/CTA/README.md)👀                                     |
| `mediaData` | NO       | Object    | n/a           | Data for the media, check [Image](hhttps://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/Image/README.md)👀                                    |
| `mediaType` | NO       | String    | n/a           | Type of media to be shown, 'image' or 'video'.                                                                                                                                                |

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
