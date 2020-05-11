# Content Block - Mixed Groups

> The "Content Block - Mixed Groups" pattern leverages the Content Block as the
> overall container of this pattern, and allows only a few opinionated block
> patterns to be included.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-mixed/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentBlockMixed styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockMixed } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'This is the content block heading.';
  const copy = `__This__ *is* the content block intro copy.`;
  const cta = {
    cta: {
      href: 'https://www.ibm.com',
    },
    style: 'card',
    type: 'local',
    copy: 'Content Block CTA copy',
    heading: 'Content Block CTA heading',
  };

  const items = [
    {
      type: 'ContentGroupCards',
      heading: 'ContentGroupCards heading',
      items: [
        {
          heading: 'ContentGroupCards item heading',
          copy: 'ContentGroupCards item copy.',
          cta: {
            href: 'https://www.ibm.com',
          },
        },
      ],
    },
    {
      type: 'ContentGroupPictograms',
      heading: 'ContentGroupPictograms heading',
      items: [
        {
          heading: 'ContentGroupPictograms item heading.',
          copy: 'ContentGroupPictograms item copy.',
          cta: {
            cta: {
              href: 'https://www.ibm.com',
            },
            type: 'local',
            copy: 'ContentGroupPictograms CTA copy',
          },
          pictogram: {
            src: Desktop,
            'aria-label': 'Desktop',
          },
        },
      ],
    },
    {
      type: 'ContentGroupSimple',
      mediaType: 'image',
      mediaData: {
        sources: [
          { src: 'https://your-image.com/320/160', breakpoint: 320 },
          { src: 'https://your-image.com/400/400', breakpoint: 400 },
          { src: 'https://your-image.com/672/672', breakpoint: 672 },
        ],
        alt: 'Image alt',
        defaultSrc: 'https://your-image.com/672/672',
      },
      heading: 'ContentGroupSimple heading.',
      items: [
        {
          heading: 'ContentGroupSimple item heading.',
          copy: 'ContentGroupSimple item copy.',
        },
      ],
      cta: {
        cta: {
          href: 'https://www.ibm.com',
        },
        style: 'text',
        type: 'local',
        copy: 'ContentGroupSimple CTA copy',
        heading: 'ContentGroupSimple CTA heading',
      },
    },
  ];

  return (
    <ContentBlockMixed heading={heading} copy={copy} cta={cta} items={items} />
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

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | n/a           | Title of the content block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `copy`    | YES      | String    | n/a           | Simple content item. Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.                                                                                                                                                                                                                                                                                                                                                            |
| `cta`     | NO       | Object    | n/a           | CTA used at the end of content body. `Card` style supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `items`   | YES      | Object    | null          | Supports [`ContentGroupCards`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentGroupCards), [`ContentGroupPictograms`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentGroupPictograms), and [`ContentGroupSimple`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentGroupSimple) pattern groups. See patterns for full usage details. |
| `aside`   | NO       | Object    | n/a           | Elements to be rendered on right panel of the content block. See `ContentBlock` README for more info.                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### Stable selectors

| Name                             | Description |
| -------------------------------- | ----------- |
| `dds--content-block-mixedgroups` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
