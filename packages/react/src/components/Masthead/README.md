# Masthead

> The masthead component is a required navigational pattern for IBM.com that
> displays consistently at the top of each page. It also includes search and
> profile services for IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Masthead } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/masthead/masthead.scss';
function App() {
  return <Masthead />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the masthead styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

## Types (optional)

| Name            | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `default`       | Default masthead variant.                                         |
| `with platform` | Includes platform name to the right of IBM logo (e.g. IBM Cloud). |

## Stable selectors

| Name                                   | Description |
| -------------------------------------- | ----------- |
| `masthead`                             | Component   |
| `masthead__hamburger`                  | Interactive |
| `masthead__logo`                       | Interactive |
| `masthead__platform-name`              | Interactive |
| `masthead__l0-nav`                     | Component   |
| `masthead__l0-nav--nav-${item}`        | Interactive |
| `masthead__l0-nav--subnav-${item}`     | Interactive |
| `masthead__l0-sidenav--subnav-${item}` | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
