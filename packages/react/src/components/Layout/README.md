# Layout

> The Layout component is to be utilized within IBM.com for various abstract
> layout configurations.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/layout/_layout.scss';
function App() {
  return (
    <Layout>
      <div>Column 1 content</div>
      <div>Column 2 content</div>
    </Layout>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

If setting one of the columns as a sticky column, the attribute
`data-sticky="true"` can be added:

```javascript
function App() {
  return (
    <Layout>
      <div data-sticky="true">Column 1 content sticky</div>
      <div>Column 2 content</div>
    </Layout>
  );
}
```

> 💡 Don't forget to import the layout styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

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
