# Content Block With Media

> The "Content Block - With Media" is a decorator of `ContentBlock`, which
> includes a number of `Content Group - Simple`, and ends with a `Feature Card`.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-media/index';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockMedia } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem Ipsum';
  const copy = 'Lorem Ipsum';
  const contentGroup = [
    {
      title: 'Aliquam condimentum interdum',
      image: {
        uri: {
          sm: 'https://via.placeholder.com/640x320',
          md: 'https://via.placeholder.com/768x384',
          lg: 'https://via.placeholder.com/1024x512',
        },
        alt: 'Place Holder Image',
      },
      lists: [
        {
          title: 'Nunc convallis lobortis',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        },
        {
          title: 'Interdum et malesuada',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
        },
      ],
      link: {
        href: 'https://www.example.com',
        title: 'Vivamus interdum ligula',
        target: '_self',
      },
    },
  ];

  const cta = {
    type: 'local'|'jump'|'external'
    heading: 'Feature Link heading',
    card: {
      href: 'https://ibm.com',
      title: 'Consectetur adipisicing elit',
      image: {
        defaultImage: 'https://picsum.photos/id/2/672/672',
        alt: 'featured link image',
      },
    }
  },

  return (
    <ContentBlockWithMedia
      copy={copy}
      heading={heading}
      contentGroup={contentGroup}
      cta={cta}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the ContentBlockWithMedia styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name           | Required | Data Type | Default Value | Description                                                        |
| -------------- | -------- | --------- | ------------- | ------------------------------------------------------------------ |
| `copy`         | no       | String    | null          | Short copy to suppport title.                                      |
| `heading`      | yes      | String    | n/a           | Main title of ContentBlockWithMedia pattern.                       |
| `contentGroup` | yes      | Array     | n/a           | Array of contentGroup objects to render. See `contentGroup` below. |
| `cta`          | no       | Object    | null          | Object for optional CTA. Must be `Feature Link`. See `cta` below.  |

### contentGroup

| Name      | Data Type | Description                                                                                         |
| --------- | --------- | --------------------------------------------------------------------------------------------------- |
| `heading` | String    | Describes the block that it is a part of.                                                           |
| `image`   | Object    | Content group image including different aspect ratios for different breakpoints. See `image` below. |
| `lists`   | Array     | Array of list objects to render within the content group. See `lists` below.                        |
| `link`    | Object    | Object with the href, text, and target properties of the content group link. See `link` below.      |
| `title`   | String    | Content group title.                                                                                |

#### image

| Name  | Data Type | Description                                                                           |
| ----- | --------- | ------------------------------------------------------------------------------------- |
| `alt` | String    | Alt description of image.                                                             |
| `uri` | Object    | Image object containing urls to the image for different breakpoints. See `uri` below. |

#### uri

| Name | Data Type | Description                                               |
| ---- | --------- | --------------------------------------------------------- |
| `sm` | String    | Image with aspect ration (640 x 320) for `sm` breakpoint  |
| `md` | String    | Image with aspect ration (768 x 384) for `md` breakpoint  |
| `lg` | String    | Image with aspect ration (1024 x 512) for `lg` breakpoint |

#### lists

| Name    | Data Type | Description                    |
| ------- | --------- | ------------------------------ |
| `copy`  | String    | Content group list item copy.  |
| `title` | String    | Content gropu list item title. |

#### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Content group link.                                        |
| `text`   | String    | Content group link text.                                   |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

### CTA

| Name         | Data Type | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `heading`    | String    | Describes the CTA.                                 |
| `card.href`  | String    | Feature link url.                                  |
| `card.title` | String    | Feature link text.                                 |
| `card.image` | String    | Feature link `defaultImage` and `alt`.             |
| `type`       | String    | Link behavior options `local`, `jump`, `external`. |

## Stable selectors

| Name                                          | Description                     |
| --------------------------------------------- | ------------------------------- |
| `dds--content-block-media`                    | Pattern                         |
| `dds--content-block-media--group`             | Pattern                         |
| `dds--content-block-media--group__img`        | Content group image element     |
| `dds--content-block-media--group__card`       | Content group card link element |
| `dds--content-block-media--group--item`       | Content group item component    |
| `dds--content-block-media--group--item__link` | Content group item link element |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
