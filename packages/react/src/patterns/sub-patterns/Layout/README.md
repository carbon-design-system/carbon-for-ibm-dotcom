# Layout

> The Layout component is to be utilized within IBM.com for various abstract
> layout configurations.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/layout/layout';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';
import '@carbon/grid/scss/grid.scss';

function App() {
  return (
    <Layout>
      <div data-sticky="true">Column 1 content (sticky)</div>
      <div>Column 2 content</div>
    </Layout>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the layout styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name           | Required | Data Type | Default Value | Description                                               |
| -------------- | -------- | --------- | ------------- | --------------------------------------------------------- |
| `children`     | NO       | Node      | null          | Component/Element to render within Layout                 |
| `marginBottom` | NO       | String    | null          | Bottom Margin value for Layout. See `marginBottom` below. |
| `marginTop`    | NO       | String    | null          | Top Margin value for Layout. See `marginTop` below.       |
| `type`         | YES      | String    | null          | Layout type. See `type` below.                            |

## type

| Name  | Description             |
| ----- | ----------------------- |
| `1-3` | 1/4 - 3/4 column layout |

## marginTop (optional)

| Name                    | Description                            |
| ----------------------- | -------------------------------------- |
| `layout-01 - layout-07` | Layout token values for the top margin |

## marginBottom (optional)

| Name                    | Description                               |
| ----------------------- | ----------------------------------------- |
| `layout-01 - layout-07` | Layout token values for the bottom margin |

## data-sticky="true"

When adding the data attribute `data-sticky="true"` to one of the child columns,
this will set that column to have `position: sticky` with the correct supporting
HTML structure.

## Stable selectors

| Name          | Description |
| ------------- | ----------- |
| `dds--layout` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
