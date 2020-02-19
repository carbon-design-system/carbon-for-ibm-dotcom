# Content Block - Segmented

> The Content Block - Segmented pattern includes a single Content Item, optional
> media (image), and ends with an optional CTA.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockSegmented } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <ContentBlockSimple
      copy={copy}
      heading={heading}
      contentGroup={contentGroup}
      cta={cta}
      ctaStyle={ctaStyle}
      ctaType={ctaType}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Props

| Name           | Required | Data Type | Default Value | Description                                       |
| -------------- | -------- | --------- | ------------- | ------------------------------------------------- |
| `heading`      | YES      | Boolean   | false         | Determines whether to render bottom border.       |
| `copy`         | YES      | Object    | null          | Short copy to support the heading.                |
| `contentGroup` | YES      | Object    | null          | Content group elements. See `contentGroup` below. |
| `cta`          | NO       | Object    | null          | Object with CTA data. See `cta` below.            |
| `ctaStyle`     | n/a      | String    | null          | Determines type of CTA style.                     |
| `ctaType`      | n/a      | String    | null          | Determines CTA link behavior.                     |

### contentGroup

| Name        | Data Type | Description                                                      |
| ----------- | --------- | ---------------------------------------------------------------- |
| `heading`   | String    | Short copy describing content.                                   |
| `mediaType` | String    | Type of media, currently only `image` supported.                 |
| `mediaData` | String    | Media data.                                                      |
| `items`     | Array     | Array of content paragraphs.                                     |
| `cta`       | Object    | CTA object for child content. Supports `text` and `card` styles. |

### cta (for ContentBlock)

| Name    | Data Type | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| `href`  | String    | CTA link.                                       |
| `title` | String    | CTA title.                                      |
| `text`  | String    | CTA link text.                                  |
| `type`  | String    | CTA link behavior (`local`, `jump`, `external`) |

## Stable selectors

| Name                        | Description |
| --------------------------- | ----------- |
| `dds--content-block-simple` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
