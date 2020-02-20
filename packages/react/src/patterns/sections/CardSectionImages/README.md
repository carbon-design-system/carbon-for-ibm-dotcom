# CardSectionImages

> The CardSection Images pattern is to be utilized within IBM.com. See
> [CardSection](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sections/CardSection/README.md)👀

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sections/card-section/index';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardSectionImages } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return <CardSectionImages cards={cards} heading="Read more about it" />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> See
> [Card Object](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sections/CardSection/__stories__/data/cards.json)
> 👀

> 💡 Don't forget to import the card-section styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                                    |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | null          | Cards with or without images heading.                                                                                                                                                          |
| `cards`   | YES      | Array     | null          | Array of objects. [Card Array Example](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/card/README.md). For more details See `Cards Props`. |
| `theme`   | NO       | String    | 'white'       | Color theme for pattern. See `theme` below.                                                                                                                                                    |

## Card Props

Card accepts the folloing information for this `CardSectionImages` pattern

| Name       | Required | Data Type | Description                                                       |
| ---------- | -------- | --------- | ----------------------------------------------------------------- |
| `Image`    | YES      | Object    | It contains defaultImage and alt text properties.                 |
| `Eyebrow`  | YES      | String    | Eyebrow of the Card.                                              |
| `Heading`  | YES      | String    | Heading of the Card.                                              |
| `cta.href` | YES      | String    | Valid URL for a the location of an internal or external resource. |

> See
> [Card](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/card/README.md)
> 👀

### theme (optional)

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
