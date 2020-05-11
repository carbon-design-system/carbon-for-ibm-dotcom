# Callout

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/callout/callout';
```

> 💡 Only import fonts once per usage. Don't forget to import the Callout styles
> from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Callout } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <Callout>
      <p>hello world</p>
    </Callout>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `env` file at the root of your project,
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the callout styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

## Props

| Name       | Required | Data Type | Default Value | Description                                             |
| ---------- | -------- | --------- | ------------- | ------------------------------------------------------- |
| `children` | NO       | Object    | null          | The component being imported into the callout container |

## Stable selectors

| Name                      | Description             |
| ------------------------- | ----------------------- |
| `dds--callout__container` | Callout element wrapper |
| `dds--column__column`     | Callout column wrapper  |
| `dds--column__content`    | Callout content wrapper |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
