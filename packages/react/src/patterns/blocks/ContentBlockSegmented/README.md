# Content Block - Segmented

> The Content Block - Segmented pattern allows for larger groups of content to
> be presented at once.

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
  return <ContentBlockSegmented copy={copy} heading={heading} items={items} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Props

| Name           | Required | Data Type | Default Value | Description                                          |
| -------------- | -------- | --------- | ------------- | ---------------------------------------------------- |
| `copy`         | yes      | String    | null          | Short copy to suppport title.                        |
| `heading`      | yes      | String    | n/a           | Main title of pattern.                               |
| `contentGroup` | yes      | Array     | n/a           | Array of content items to render. See `items` below. |

### items

| Name        | Data Type | Description                                                      |
| ----------- | --------- | ---------------------------------------------------------------- |
| `heading`   | String    | Short copy describing content.                                   |
| `mediaType` | String    | Type of media, currently only `image` supported.                 |
| `mediaData` | String    | Media data.                                                      |
| `items`     | Array     | Array of content paragraphs.                                     |
| `cta`       | Object    | CTA object for child content. Supports `text` and `card` styles. |

### cta

| Name    | Data Type | Description                                              |
| ------- | --------- | -------------------------------------------------------- |
| `style` | String    | CTA style. Supports `card` and `text`.                   |
| `href`  | String    | CTA link.                                                |
| `title` | String    | CTA title.                                               |
| `copy`  | String    | CTA link text.                                           |
| `type`  | String    | CTA link behavior. Supports `local`, `jump`, `external`. |

## Stable selectors

| Name                                         | Description |
| -------------------------------------------- | ----------- |
| `dds--content-block-segmented`               | Pattern     |
| `dds--content-block-segmented__media`        | Element     |
| `dds--content-block-segmented__content-item` | Element     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
