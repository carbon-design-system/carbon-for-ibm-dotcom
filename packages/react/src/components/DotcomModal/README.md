# DotcomModal

> The DotcomModal provides users with information in a secondary window while
> maintaining the context of the page. It has slight layout differences from the
> [Carbon modal](https://www.carbondesignsystem.com/components/modal/code) to
> provide a more expressive experience.

## Getting started

Here's a quick example to get you started.

### Content

```javascript
import React from 'react';

const content = (
  <>
    <p>Your content here (probably include something nicer than this! 😄)</p>
  </>
);

export default content;
```

### DotcomModal

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { DotcomModal } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/dotcom-modal/index.scss';

const buttons = [
  {
    link: 'https://www.ibm.com',
    copy: 'Primary action button',
    renderIcon: 'ArrowRight',
  },
];

function App() {
  return <DotcomModal dotcomButtons={buttons}>{content}</DotcomModal>;
}
```

> 💡 > And don't forget to import the DotcomModal styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

## Data and content

| Name            | Description        |
| --------------- | ------------------ |
| `children`      | User content       |
| `dotcomButtons` | Expressive buttons |

> 💡 See the
> [Carbon modal](https://www.carbondesignsystem.com/components/modal/code) for a
> complete list of configurations.

## Stable selectors

| Name                        | Description |
| --------------------------- | ----------- |
| `dds--dotcom-modal`         | Component   |
| `dds--dotcom-modal-content` | Component   |
| `dds--dotcom-modal-footer`  | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
