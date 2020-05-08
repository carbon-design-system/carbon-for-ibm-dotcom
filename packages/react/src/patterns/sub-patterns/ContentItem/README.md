# Content Item

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/content-item';
```

> 💡 Only import fonts once per usage. Don't forget to import the ContentItem
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentItem } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem ipsum dolor sit amet.';
  const copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  const mediaType = 'image';
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

  const cta = {
    type: 'jump',
    copy: 'Click here',
    href: 'www.ibm.com',
  };

  return (
    <ContentItem
      inverse={false}
      heading={heading}
      copy={copy}
      mediaType={mediaType}
      mediaData={mediaData}
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

> 💡 Don't forget to import the content group styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | NO       | String    | null          | Heading text                                                                                                                                                                                                                                                                                                                                                     |
| `copy`      | NO       | String    | null          | Copy text                                                                                                                                                                                                                                                                                                                                                        |
| `cta`       | NO       | object    | null          | CTA object. See `cta` below.                                                                                                                                                                                                                                                                                                                                     |
| `mediaType` | NO       | String    | n/a           | Determines media type (image or video).                                                                                                                                                                                                                                                                                                                          |
| `mediaData` | NO       | Object    | n/a           | Media Data for either image or video. See the [`ImageWithCaption`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ImageWithCaption) or [`VideoPlayer`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/VideoPlayer) component for full usage details. |
| `inverse`   | NO       | Boolean   | `false`       | Changes theme to inverse/default                                                                                                                                                                                                                                                                                                                                 |

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
| `dds--content-item__media`   | Content item media element.   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
