# Content Block - Cards

> The Content Block - Simple pattern is a decorator of `ContentBlock`, and
> includes a single `CardGroup`.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentBlockCards } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <ContentBlockCards heading={'Aliquam condimentum interdum'} cards={data} />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)..

```
  SASS_PATH=node_modules:src
```

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                          |
| --------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `heading` | YES      | String    | n/a           | Main title of ContentBlockCards pattern.                                                                                                                                             |
| `cards`   | YES      | Array     | null          | Array of objects. See [Card props](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/ContentBlockCards#card-props---simple). |

### Card props - simple

| Name       | Required | Data Type | Description                            |
| ---------- | -------- | --------- | -------------------------------------- |
| `copy`     | YES      | String    | Copy of the card.                      |
| `heading`  | YES      | String    | Heading of the card.                   |
| `cta.href` | YES      | String    | URI for internal or external resource. |

### Card props - image

| Name       | Required | Data Type | Description                              |
| ---------- | -------- | --------- | ---------------------------------------- |
| `image`    | YES      | Object    | Contains source and alt text properties. |
| `eyebrow`  | YES      | String    | Eyebrow of the card.                     |
| `heading`  | YES      | String    | Heading of the card.                     |
| `cta.href` | YES      | String    | URI for internal or external resource.   |

> See
> [Card](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/blocks/Card)
> sub-pattern for all card options. 👀

## Stable selectors

| Name                       | Description |
| -------------------------- | ----------- |
| `dds--content-block-cards` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
