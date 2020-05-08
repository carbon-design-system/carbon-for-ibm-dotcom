# Card Link

> The card link component uses
> [Carbon's Clickable Tile component](https://www.carbondesignsystem.com/components/tile/code#clickable-tile)
> while presenting content in a concise and readable style.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/card/index.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the Card styles
> from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return <Card title="Lorem ipsum dolor sit amet" href="https://example.com" />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the card link styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name              | Required | Data Type | Default Value | Description                                                                                                     |
| ----------------- | -------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| `copy`            | NO       | String    | null          | Paragraph of text that further describing the resource with added detail.                                       |
| `customClassName` | NO       | String    | null          | Classname to be assigned to the Card component                                                                  |
| `heading`         | NO       | String    | n/a           | Concise yet descriptive string of text describing the linked resource.                                          |
| `type`            | NO       | String    | n/a           | Determines whether card is clickable or static.                                                                 |
| `image`           | NO       | String    | null          | Image source to be passed as a property to the to the Card component. See link to Image component below.        |
| `inverse`         | NO       | Boolean   | false         | Sets the high contrast for Card                                                                                 |
| `eyebrow`         | NO       | String    | null          | Eyebrow text to be passed as a property to the Card component. Style for Card component has been set to "text". |
| `cta`             | YES      | Object    | n/a           | Cta options. See 'cta' below.                                                                                   |

### cta (required)

| Name   | Data Type | Description                                                                                                                      |
| ------ | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `href` | String    | Valid URL for a the location of an internal or external resource                                                                 |
| `icon` | String    | Provide an optional icon to the footer from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
| `copy` | String    | Optional text for CTA                                                                                                            |
| `type` | String    | type of CTA (local or external) when Card type is static                                                                         |

Visit the
[CTA storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/components-cta--default)
for more details on the CTA options.

Visit the
[Image storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/components-image--default)
for more details on the Image component.

## Stable selectors

| Name        | Description |
| ----------- | ----------- |
| `dds--card` | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
