# Card Link

> The card link component uses
> [Carbon's Clickable Tile component](https://www.carbondesignsystem.com/components/tile/code#clickable-tile)
> while presenting content in a concise and readable style.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardLink } from '@carbon/ibmdotcom-react';

import '@carbon/ibmdotcom-styles/scss/components/card-link/index.scss';

function App() {
  return (
    <CardLink title="Lorem ipsum dolor sit amet" href="https://example.com" />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the card link styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
CARD_LINK=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/.env.example)
> for more information

## Props

| Name                  | Description                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `title`_`(required)`_ | Concise yet descriptive string of text describing the linked resource.                                                           |
| `href`_`(required)`_  | Valid URL for a the location of an internal or external resource.                                                                |
| `icon`                | Provide an optional icon to the footer from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
| `content`             | Paragraph of text that further describing the resource with added detail.                                                        |

## Stable selectors

| Name             | Description |
| ---------------- | ----------- |
| `dds--card-link` | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
