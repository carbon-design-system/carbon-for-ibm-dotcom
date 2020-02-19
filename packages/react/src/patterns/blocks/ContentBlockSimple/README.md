# Content Block - Simple

> The Content Block - Simple pattern is a decorator of `ContentBlock`, and
> includes a single `ContentItem`, optional media (image), and ends with a CTA.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-simple/content-block-simple';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleLongForm } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <ContentBlockSimple
      heading={heading}
      copy={copy}
      items={items}
      mediaData={mediaData}
      mediaType={mediaType}
      cta={cta}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the simplelongform styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                                              |
| ----------- | -------- | --------- | ------------- | ------------------------------------------------------------------------ |
| `heading`   | YES      | String    | n/a           | Title of the content block.                                              |
| `copy`      | YES      | String    | n/a           | Introduction copy briefly describing the section.                        |
| `items`     | YES      | Array     | n/a           | Array of content items for use as content body.                          |
| `mediaData` | NO       | Array     | n/a           | Array of image sizes for use with content items.                         |
| `mediaType` | NO       | String    | 'image'       | Type of media. Currently only supports `image`.                          |
| `cta`       | NO       | Object    | n/a           | CTA used at the end of content body. `Text` and `Card` styles supported. |

### items

| Name      | Data Type | Description          |
| --------- | --------- | -------------------- |
| `heading` | String    | Item section heading |
| `copy`    | String    | Item section copy    |

### mediaData

| Name           | Data Type | Description                                            |
| -------------- | --------- | ------------------------------------------------------ |
| `src`          | String    | Url of image.                                          |
| `minWidth`     | String    | Minimum width of image. Supports multiple breakpoints. |
| `alt`          | String    | Image alt text.                                        |
| `defaultImage` | String    | Default image to use.                                  |

### CTA

| Name    | Data Type | Description                                                  |
| ------- | --------- | ------------------------------------------------------------ |
| `style` | String    | CTA style. Supports `text` and `card`.                       |
| `type`  | String    | CTA link behavior. Supports `external`, `jump`, and `local`. |
| `title` | String    | CTA title.                                                   |
| `href`  | String    | CTA url.                                                     |
| `copy`  | String    | CTA copy.                                                    |

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
