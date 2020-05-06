# Card Section - Simple

> The Card Section - Simple pattern is a collection of simple cards presented in
> a section with a left-column header.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@include '@carbon/ibmdotcom-styles/scss/patterns/sections/card-section-images/card-section-simple';
```

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardSectionSimple } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <CardSectionSimple
      cards={cards}
      heading="Aliquam condimentum interdum"
      theme={theme}
      cta={cta}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                         |
| --------- | -------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | null          | Section heading.                                                                                                                                                                    |
| `cards`   | YES      | Array     | null          | Array of objects. See [Card props](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/sections/CardSectionSimple#props).            |
| `theme`   | NO       | String    | `white`       | Color theme for pattern. See [theme](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/sections/CardSectionSimple#theme-optional). |
| `cta`     | NO       | Object    | null          | Optional CTA card for group. Always displays as last item.                                                                                                                          |

### Card props

| Name       | Required | Data Type | Description                            |
| ---------- | -------- | --------- | -------------------------------------- |
| `copy`     | YES      | String    | Copy of the card.                      |
| `heading`  | YES      | String    | Heading of the card.                   |
| `cta.href` | YES      | String    | URI for internal or external resource. |

> See example
> [card data](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/CardGroup/__stories__/data/cards.json).
> 👀

### Theme (optional)

| Name    | Data Type | Description                  |
| ------- | --------- | ---------------------------- |
| `white` | String    | Carbon White theme           |
| `g10`   | String    | Carbon Gray 10 (g10) theme   |
| `g90`   | String    | Carbon Gray 90 (g90) theme   |
| `g100`  | String    | Carbon Gray 100 (g100) theme |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
