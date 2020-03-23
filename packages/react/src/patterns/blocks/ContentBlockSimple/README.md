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

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/content-block-simple/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ContentBlockSimple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockSimple } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <ContentBlockSimple heading={heading} copy={copy} image={image} cta={cta} />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the ContentBlockSimple styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                           |
| --------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | n/a           | Title of the content block.                                                                                                                                                           |
| `copy`    | YES      | String    | n/a           | Simple content item. Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.         |
| `image`   | NO       | Array     | n/a           | See the [`ImageWithCaption`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/ImageWithCaption) component for full usage details. |
| `cta`     | NO       | Object    | n/a           | CTA used at the end of content body. `Text` and `Card` styles supported.                                                                                                              |

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
