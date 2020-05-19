# Content Block - Segmented

> The Content Block - Segmented pattern allows for larger groups of content to
> be presented at once.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-segmented/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentBlockSegmented styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockSegmented } from '@carbon/ibmdotcom-react';
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
    <ContentBlockSegmented
      copy={copy}
      cta={cta}
      heading={heading}
      mediaType={mediaType}
      mediaData={mediaData}
      items={items}
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

| Name        | Required | Data Type | Default Value | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copy`      | YES      | String    | null          | Short copy to suppport title.                                                                                                                                                                                                                                                                                                                                    |
| `cta`       | NO       | Object    | n/a           | Supports `text` and `card` styles. See the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details.                                                                                                                                                                   |
| `heading`   | YES      | String    | n/a           | Main title of pattern.                                                                                                                                                                                                                                                                                                                                           |
| `items`     | YES      | Array     | n/a           | Array of content items to render. See `items` below.                                                                                                                                                                                                                                                                                                             |
| `mediaType` | NO       | String    | n/a           | Determines media type (image or video).                                                                                                                                                                                                                                                                                                                          |
| `mediaData` | NO       | Object    | n/a           | Media Data for either image or video. See the [`ImageWithCaption`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ImageWithCaption) or [`VideoPlayer`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/VideoPlayer) component for full usage details. |
| `aside`     | NO       | Object    | n/a           | Elements to be rendered on right panel of the content block. See `ContentBlock` README for more info.                                                                                                                                                                                                                                                            |

### items

| Name      | Required | Data Type | Description                                                                                                                                                                                                             |
| --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | Short copy describing content item.                                                                                                                                                                                     |
| `image`   | NO       | Object    | See the [`Image`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Image) component for full usage details.                                                         |
| `cta`     | NO       | Object    | `jump` and `local` types are allowed, for more information, see the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |
| `copy`    | YES      | String    | Item content.                                                                                                                                                                                                           |

## Stable selectors

| Name                                  | Description   |
| ------------------------------------- | ------------- |
| `dds--content-block-segmented`        | Pattern       |
| `dds--content-block-segmented__media` | Media element |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
