# Card Section - Simple

> The CardSection Simple pattern is to be utilized within IBM.com. See
> [CardSection](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sections/CardSection/README.md)👀

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
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> See
> [Card Object](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sections/CardSection/__stories__/data/cards.json)
> 👀

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                                    |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | null          | Cards with or without images heading.                                                                                                                                                          |
| `cards`   | YES      | Array     | null          | Array of objects. [Card Array Example](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/card/README.md). For more details See `Cards Props`. |
| `theme`   | NO       | String    | 'white'       | Color theme for pattern. See `theme` below.                                                                                                                                                    |
| `cta`     | NO       | Object    | null          | CTA options. See `Card` README with the above link.                                                                                                                                            |

### Card Props

Card accepts the folloing information for this `CardSectionSimple` pattern

| Name       | Required | Data Type | Description                                                       |
| ---------- | -------- | --------- | ----------------------------------------------------------------- |
| `Copy`     | YES      | String    | Copy of the Card.                                                 |
| `Heading`  | YES      | String    | Heading of the Card.                                              |
| `cta.href` | YES      | String    | Valid URL for a the location of an internal or external resource. |

> See
> [Card](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/card/README.md)
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
