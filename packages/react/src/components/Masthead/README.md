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

## Types

| Name      | Description                           |
| --------- | ------------------------------------- |
| `default` | Default navigation data from IBM.com. |
| `custom`  | Custom navigation data.               |
| `none`    | No navigation.                        |

> 💡 `Custom` navigation data must follow the same structure and key names as
> `default`. See `mastheadNav` >
> [here](https://www.ibm.com/common/v18/js/data/jsononly/usen.json) for an
> example.

## Options

| Name            | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `with platform` | Includes platform name (only available with `default` and `custom`). |

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
| `masthead__l0-sidenav`                 | Component   |
| `masthead__l0-sidenav--nav-${item}`    | Interactive |
| `masthead__l0-sidenav--subnav-${item}` | Interactive |

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
