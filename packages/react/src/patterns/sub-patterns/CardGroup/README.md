# Card Group

> The CardGroup sub-pattern is a collection of Card components that can be used
> in block and group -level patterns.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/card-group/card-group';
```

> 💡 Only import fonts once per usage. Don't forget to import the card-group
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardGroup } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return <CardGroup cards={cards} cta={cta} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

## Props

| Name    | Required | Data Type | Default Value | Description                                                                                                                                                                                    |
| ------- | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cards` | YES      | Array     | null          | Array of objects. [Card Array Example](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/card/README.md). For more details See `Cards Props`. |
| `cta`   | NO       | Object    | null          | CTA options. See `Card` README with the above link.                                                                                                                                            |

### Card Props

Card accepts the folloing information for this `CardSectionImages` pattern

| Name       | Required | Data Type | Description                                                       |
| ---------- | -------- | --------- | ----------------------------------------------------------------- |
| `Image`    | YES      | Object    | It contains defaultSrc and alt text properties.                   |
| `Eyebrow`  | YES      | String    | Eyebrow of the Card.                                              |
| `Heading`  | YES      | String    | Heading of the Card.                                              |
| `cta.href` | YES      | String    | Valid URL for a the location of an internal or external resource. |

## Stable selectors

| Name              | Description |
| ----------------- | ----------- |
| `dds--card-group` | Component   |

> See
> [Card](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/card/README.md)
> 👀

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
