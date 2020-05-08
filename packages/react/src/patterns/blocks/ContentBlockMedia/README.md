# Content Block With Media

> The "Content Block - With Media" is a decorator of `ContentBlock`, which
> includes a number of `Content Group - Simple`, and ends with a `Feature Card`.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-media/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentBlockMedia styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockMedia } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem Ipsum';
  const copy = 'Lorem Ipsum';
  const items={[
    {
      mediaType: 'image',
      mediaData: {
        heading: 'Lorem ipsum dolor sit amet.',
        image: {
          sources: [
            {
              src:
                'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
              breakpoint: 320,
            },
            {
              src:
                'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
              breakpoint: 400,
            },
            {
              src:
                'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
              breakpoint: 672,
            },
          ],
          alt: 'Image alt text',
          defaultSrc:
            'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
        },
      },
      heading: 'Lorem ipsum dolor sit amet',
      items: [
        {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
      cta: {
        cta: {
          href: 'https://www.example.com',
        },
        style: 'card',
        type: 'local',
        copy: 'Lorem ipsum dolor sit ametttt',
      },
    }
  ]};

  const cta = {
    type: 'local'|'jump'|'external'
    heading: 'Feature Link heading',
    card: {
      href: 'https://www.example.com',
      title: 'Consectetur adipisicing elit',
      image: {
        defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
        alt: 'Image alt text',
      },
    }
  };

  return (
    <ContentBlockWithMedia
      copy={copy}
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

> 💡 Don't forget to import the ContentBlockWithMedia styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                                       |
| --------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copy`    | NO       | String    | null          | Short copy to suppport title.                                                                                                                                                                     |
| `heading` | YES      | String    | n/a           | Main title of ContentBlockWithMedia pattern.                                                                                                                                                      |
| `items`   | YES      | Array     | n/a           | Array of content items objects to render. See `items` below.                                                                                                                                      |
| `cta`     | NO       | Object    | null          | Optional CTA. Must be `Feature Link`. See the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |
| `aside`   | NO       | Object    | n/a           | Elements to be rendered on right panel of the content block. See `ContentBlock` README for more info.                                                                                             |

### items

| Name        | Required | Data Type | Description                                                                                                                                                                        |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`   | YES      | String    | Describes the block that it is a part of.                                                                                                                                          |
| `mediaData` | YES      | Object    | See `mediaData` below.                                                                                                                                                             |
| `cta`       | NO       | Object    | Supports `card` style. See the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |

### mediaData

| Name      | Description                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | Describes the media section                                                                                                                                   |
| `image`   | See the [Image](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Image) component for full usage details. |

## Stable selectors

| Name                       | Description |
| -------------------------- | ----------- |
| `dds--content-block-media` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
