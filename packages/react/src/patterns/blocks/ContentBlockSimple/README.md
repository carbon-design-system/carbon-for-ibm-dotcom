# Content Block - Simple

> The Content Block - Simple pattern is a decorator of `ContentBlock`, and
> includes a single `ContentItem`, optional media (image), and ends with a CTA.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-simple/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentBlockSimple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockSimple } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
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

  return (
    <ContentBlockSimple
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

> 💡 Don't forget to import the ContentBlockSimple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | YES      | String    | n/a           | Title of the content block.                                                                                                                                                                                                                                                                                                                                      |
| `copy`      | YES      | String    | n/a           | Simple content item. Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.                                                                                                                                                                                    |
| `mediaType` | NO       | String    | n/a           | Determines media type (image or video).                                                                                                                                                                                                                                                                                                                          |
| `mediaData` | NO       | Object    | n/a           | Media Data for either image or video. See the [`ImageWithCaption`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ImageWithCaption) or [`VideoPlayer`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/VideoPlayer) component for full usage details. |
| `cta`       | NO       | Object    | n/a           | CTA used at the end of content body. `Text` and `Card` styles supported.                                                                                                                                                                                                                                                                                         |
| `aside`     | NO       | Object    | n/a           | Elements to be rendered on right panel of the content block. See `ContentBlock` README for more info.                                                                                                                                                                                                                                                            |
| `inverse`   | NO       | Boolean   | `false`       | Changes theme to inverse/default                                                                                                                                                                                                                                                                                                                                 |

## Stable selectors

| Name                                 | Description     |
| ------------------------------------ | --------------- |
| `dds--content-block-simple`          | Pattern         |
| `dds--content-block-simple__content` | Pattern content |
| `dds--content-block-simple__media`   | Media content   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
