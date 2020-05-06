# Callout Quote

> The "Callout Quote" is a decorator of `Callout`, which includes a `Quote`.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/callout-quote/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the CalloutQuote
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CalloutQuote } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const quote = {
    copy: 'Lorem ipsum dolor sit amet',
    source: {
      heading: 'Lorem ipsum',
      copy: 'dolor sit amet',
    },
    cta: {
      copy: 'Link with Icon',
      type: 'local',
      href: 'https://example.com',
    },
  };

  return <CalloutQuote quote={quote} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the CalloutQuote styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name    | Required | Data Type | Default Value | Description                                                                                                                                                     |
| ------- | -------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quote` | YES      | Object    | null          | Quote object. See [Quote](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/patterns/sub-patterns/Quote/README.md)! 👀. |

## Stable selectors

| Name                 | Description |
| -------------------- | ----------- |
| `dds--callout-quote` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
