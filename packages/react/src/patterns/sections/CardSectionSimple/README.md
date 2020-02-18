# CardSectionSimple

> The CardSection Simple pattern is to be utilized within IBM.com.

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
import { CardSectionSimple } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const CardSectionSimple = [
  {
    heading: 'Nunc convallis lobortis',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Fusce gravida eu arcu',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Interdum et malesuada',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Nunc convallis loborti',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    heading: 'Nunc convallis lbortis',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    cta: {
      href: 'https://www.example.com',
    },
  },
];

function App() {
  return (
    <CardSectionSimple
      cards={CardSectionSimple}
      heading="Aliquam condimentum interdum"
    />
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

> 💡 Card accepts the folloing information for this `CardSectionSimple` pattern.

- Copy
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

| Name                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `CardSectionSimple` | Array of objects with heading, copy and cta properties of each card. |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
