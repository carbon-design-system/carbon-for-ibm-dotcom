# Locale Modal

> The locale modal allows users to change geographic regions and translate pages
> to those region languages, if available.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleModal } from '@carbon/ibmdotcom-react';

import '@carbon/ibmdotcom-styles/scss/components/local-modal/_locale-modal.scss';

function App() {
  return <LocaleModal />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the footer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Options

| Name                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| `isOpen`             | Set initial modal open state                      |
| `headerLabel`        | Header label                                      |
| `headerTitle`        | Header title                                      |
| `availabilityText`   | Description of region and language availablilty   |
| `unavailabilityText` | Description of region and language unavailablilty |
| `labelText`          | Label for search input accessibility              |
| `placeHolderText`    | Placeholder text for search input                 |

> 💡 Props default to English if not provided. See Carbon's
> [composed modal](http://react.carbondesignsystem.com/?path=/story/composedmodal--using-child-nodes)
> for a complete list of configurations.

## Stable selectors

| Name                                   | Description |
| -------------------------------------- | ----------- |
| `dds--locale-modal`                    | Component   |
| `dds--locale-modal__geo-btn-${region}` | Interactive |
| `dds--locale-modal__filter`            | Interactive |
| `dds--locale-modal__locales`           | Interactive |
| `dds--locale-modal__region-back`       | Interactive |

## CORS Proxy

This component makes cross-origin requests to `www.ibm.com`, which will require
a cors proxy to be configured to make successful calls from a lower environment.

A cors proxy can be configured using the following
[environment variable](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
