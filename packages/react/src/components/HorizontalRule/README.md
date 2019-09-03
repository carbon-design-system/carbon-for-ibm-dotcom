# Horizontal Rule

> The horizontal rule component is to be utilized within IBM.com for thematic
> breaks within the content of the page.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { HorizontalRule } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/horizontalrule/index.scss';
function App() {
  return <HorizontalRule />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the horizontal rule styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

## Styles (optional)

| Name              | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `solid`/`default` | Default style variant of the horizontal rule                                   |
| `dashed`          | Dashed/dotted style variant (style is applied in conjuction with `fluid` size) |

## Sizes (optional)

| Name              | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `fluid`/`default` | Default size variant - horizontal rule takes full width of the grid |
| `small`           | Shorter fixed-length variant with a max-width of 32px               |
| `medium`          | Medium fixed-length variant with a max-width of 48px                |
| `large`           | Longer fixed-length variant with a max-width of 64px                |

## Contrast types (optional)

| Name                        | Description                    |
| --------------------------- | ------------------------------ |
| `medium-contrast`/`default` | Default contrast color variant |
| `low-contrast`              | Lighter contrast color variant |
| `high-contrast`             | Darker contrast color variant  |

## Weights (optional)

| Name             | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| `thin`/`default` | Default weight variant                                                               |
| `thick`          | Slightly thicker weight variant (this only applied in conjunction with `fluid` size) |

## Stable selectors

| Name | Description |
| ---- | ----------- |
| `hr` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
