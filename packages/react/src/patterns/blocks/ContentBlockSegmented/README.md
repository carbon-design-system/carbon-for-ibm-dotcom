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
  return (
    <ContentBlockSegmented
      copy={copy}
      cta={cta}
      heading={heading}
      image={image}
      items={items}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                   |
| --------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copy`    | YES      | String    | null          | Short copy to suppport title.                                                                                                                                 |
| `cta`     | NO       | Object    | n/a           | Supports `text` and `card` styles. See the [`CTA`]() component for full usage details.                                                                        |
| `heading` | YES      | String    | n/a           | Main title of pattern.                                                                                                                                        |
| `items`   | YES      | Array     | n/a           | Array of content items to render. See `items` below.                                                                                                          |
| `image`   | NO       | Array     | n/a           | See the [`Image`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |

### items

| Name      | Required | Data Type | Description                                                                                                                                                     |
| --------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | Short copy describing content item.                                                                                                                             |
| `image`   | NO       | Array     | See the [`Image`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Image) component for full usage details. |
| `items`   | YES      | Array     | Array of content paragraphs.                                                                                                                                    |

## Stable selectors

| Name                           | Description |
| ------------------------------ | ----------- |
| `dds--content-block-segmented` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
