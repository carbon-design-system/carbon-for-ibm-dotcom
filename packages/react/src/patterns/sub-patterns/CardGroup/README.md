# Card Group

> The CardGroup sub-pattern is a collection of Card components that can be used
> in block and group -level patterns.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
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

##### JS

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
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

## Props

| Name    | Required | Data Type | Default Value | Description                                                                                                                                                                         |
| ------- | -------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cards` | YES      | Array     | null          | Array of objects. See [Cards props](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/sub-patterns/CardGroup#card-props---simple). |
| `cta`   | NO       | Object    | null          | Optional CTA card for group. Always displays as last item.                                                                                                                          |

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
> [Card](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/patterns/sub-patterns/Card)
> sub-pattern for all card options. 👀

## Stable selectors

| Name              | Description |
| ----------------- | ----------- |
| `dds--card-group` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
