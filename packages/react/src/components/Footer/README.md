# Footer

> The footer component is a required navigational pattern for IBM.com that
> displays consistently at the bottom of each page.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from '@carbon/ibmdotcom-react';

import '@carbon/ibmdotcom-styles/scss/components/footer/index.scss';

function App() {
  return <Footer />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the footer styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
FOOTER_LOCALE_BUTTON=true
```

> See [feature-flags.md](../../../docs/feature-flags.md) and
> [.env.example](../../../.env.example) for more information

## Types (optional)

| Name             | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `tall`/`default` | Default footer variant includes additional navigation taking up more space. |
| `short`          | Short footer variant reduces space by removing any additional navigation.   |

## Stable selectors

| Name                     | Description |
| ------------------------ | ----------- |
| `footer`                 | Component   |
| `footer-nav`             | Component   |
| `footer-nav-group`       | Component   |
| `footer-nav-group__link` | Interactive |
| `footer-logo`            | Component   |
| `footer-logo__link`      | Interactive |
| `footer-locale-btn`      | Interactive |
| `legal-nav`              | Component   |
| `legal-nav__link`        | Interactive |
| `locale-modal`           | Component   |

## CORS Proxy

This component makes cross-origin requests to `www.ibm.com`, which will require
a cors proxy to be configured to make successful calls from a lower environment.

A cors proxy can be configured using the following
[environment variable](../../../docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
