# LinkWithIcon

> The LinkWithIcon component should be used primarily as a navigational element,
> with an icon as an indicator to the type of content being referenced, e.g.
> url, external url, file.

## Getting started

```javascript
import React from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { LinkWithIcon } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/link-with-icon/_link-with-icon.scss';

function App() {
  return (
    <LinkWithIcon href="https://www.ibm.com">
      <span>Link text</span>
      <ArrowRight20 />
    </LinkWithIcon>
  );
}
```

> 💡 And don't forget to import the LinkWithIcon styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

## Data

| Name       | Description        |
| ---------- | ------------------ |
| `children` | Link text and icon |
| `href`     | url                |

> 💡 See the
> [Carbon link](https://www.carbondesignsystem.com/components/link/code) for a
> complete list of configurations.

## Stable selectors

| Name                  | Description |
| --------------------- | ----------- |
| `dds--link-with-icon` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
