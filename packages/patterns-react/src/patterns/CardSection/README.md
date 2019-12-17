# CardSection

> The CardSection layout pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/cards-with-images/index.scss';
@import '@carbon/ibmdotcom-styles/scss/patterns/cards-without-images/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardSection } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

function App() {
  return <CardSection cardsGroup={data[type]} type={type} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the cards-with-images and cards-without-images
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_CARD_SECTION=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## cardSection ( Array of Objects )

| Name        | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `title`     | Cards with images title                                                           |
| `groupCard` | groupCard, array with href, text and target properties                            |
| `cards`     | Cards, array of objects with imgSrc, altText, title, copy and link properties     |
| `type`      | type, property value help to identify the object type withImages or withoutImages |

## Stable selectors

| Name                                               | Description |
| -------------------------------------------------- | ----------- |
| `dds--cards-with-images`                           | Component   |
| `dds--cards-with-images-group`                     | Component   |
| `dds--cards-with-images-group__card-${card.title}` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
