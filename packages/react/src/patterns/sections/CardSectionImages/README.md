# CardSectionImages

> The CardSection Images pattern is to be utilized within IBM.com.

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

const CardSectionImages = [
  {
    image: {
      defaultImage: 'https://picsum.photos/id/1003/1056/480',
      alt: 'cards with image',
    },
    eyebrow: 'Topic',
    heading: 'Natural language processing.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultImage: 'https://picsum.photos/id/1018/1056/480',
      alt: 'cards with image',
    },
    eyebrow: 'Blog',
    heading: 'Natural language processing.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultImage: 'https://picsum.photos/id/1076/1056/480',
      alt: 'cards with image',
    },
    eyebrow: 'Topic',
    heading: 'Natural language processing.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultImage: 'https://picsum.photos/id/102/1056/480',
      alt: 'cards with image',
    },
    eyebrow: 'Blog',
    heading: 'Serving society ethically in the age of Artificial Intelligence.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultImage: 'https://picsum.photos/id/1032/1056/480',
      alt: 'cards with image',
    },
    eyebrow: 'Topic',
    heading: 'Serving society ethically in the age of Artificial Intelligence.',
    cta: {
      href: 'https://www.example.com',
    },
  },
];

function App() {
  return (
    <CardSectionImages cards={CardSectionImages} heading="Read more about it" />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the card-section styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                                                   |
| --------- | -------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | null          | Cards with or without images heading.                                                                                                                                         |
| `cards`   | YES      | Array     | null          | Array of card objects. See [CardSection](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/sections/CardSection/README.md)👀 |

> 💡 Card accepts the folloing information for this `CardSectionImages` pattern.

- Image
- Eyebrow
- Heading
- cta.href

### theme (optional)

| Name    | Data Type | Description                  |
| ------- | --------- | ---------------------------- |
| `white` | String    | Carbon White theme           |
| `g10`   | String    | Carbon Gray 10 (g10) theme   |
| `g90`   | String    | Carbon Gray 90 (g90) theme   |
| `g100`  | String    | Carbon Gray 100 (g100) theme |

### cardType

| Name                | Description                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| `CardSectionImages` | Array of objects with image object, eyebrow, heading and link properties of each card. |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
