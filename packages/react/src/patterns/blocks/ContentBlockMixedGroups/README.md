# Content Block - Mixed Groups

> The "Content Block - Mixed Groups" pattern leverages the Content Block as the
> overall contain of this patter, and allows only a few opinionated block
> patterns to be included.

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
import { ContentBlockMixedGroups } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <ContentBlockMixedGroups heading={heading} copy={copy} cta={cta}>
      <ContentGroupCards heading={heading} items={items} />
      <ContentGroupPictograms heading={heading} items={items} />
      <ContentGroupSimple
        mediaType={mediaType}
        mediaData={mediaData}
        heading={heading}
        items={items}
        cta={cta}
      />
    </ContentBlockMixedGroups>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Props

| Name       | Required | Data Type | Default Value | Description                                                           |
| ---------- | -------- | --------- | ------------- | --------------------------------------------------------------------- |
| `copy`     | YES      | String    | null          | Short copy to suppport title.                                         |
| `heading`  | YES      | String    | n/a           | Main title of ContentBlockWithMedia pattern.                          |
| `children` | YES      | Component | n/a           | Supported patterns. See `children` section below.                     |
| `cta`      | NO       | Object    | null          | Object for optional CTA. Supports `text` and `card`. See `cta` below. |

### children

| Name                     | Data Type | Description                                                                                                                                                                                                 |
| ------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ContentGroupCards`      | Component | See [`ContentGroupCards`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentGroupCards) for full details on usage of this pattern.           |
| `ContentGroupPictograms` | Component | See [`ContentGroupPictograms`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentGroupPictograms) for full details on usage of this pattern. |
| `ContentGroupSimple`     | Component | See [`ContentGroupSimple`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentGroupSimple) for full details on usage of this pattern.         |

### CTA

| Name         | Data Type | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `heading`    | String    | Describes the CTA.                                 |
| `card.href`  | String    | CTA link url.                                      |
| `card.copy`  | String    | CTA link text.                                     |
| `card.title` | String    | CTA link title.                                    |
| `type`       | String    | Link behavior options `local`, `jump`, `external`. |

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
