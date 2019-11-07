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
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
MASTHEAD_L1=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/.env.example)
> for more information

## Navigation Types

| Name      | Description                          |
| --------- | ------------------------------------ |
| `default` | Default navigation data from IBM.com |
| `custom`  | Custom navigation data               |
| `none`    | No navigation                        |

> 💡 `Custom` navigation data must follow the same structure and key names as
> `default`. See
> [this](https://www.ibm.com/common/v18/js/data/jsononly/usen.json) for an
> example.

## Options

| Name               | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `platform`         | Includes platform name (only available with `default` and `custom`) |
| `hasProfile`       | Includes IBM profile menu                                           |
| `hasSearch`        | Includes IBM search                                                 |
| `searchOpenOnload` | Has the search open by default                                      |
| `placeHolderText`  | Placeholder value for search input                                  |

```javascript
const topNavProps = {
  platform: {
    name: 'IBM Cloud',
    url: 'https://www.ibm.com/cloud',
  },
};

<Masthead {...topNavProps} />;
```

## Stable selectors

| Name                                        | Description |
| ------------------------------------------- | ----------- |
| `dds--masthead`                             | Component   |
| `dds--masthead__hamburger`                  | Interactive |
| `dds--masthead__logo`                       | Interactive |
| `dds--masthead__platform-name`              | Interactive |
| `dds--masthead__l0-nav`                     | Component   |
| `dds--masthead__l0-nav--nav-${item}`        | Interactive |
| `dds--masthead__l0-nav--subnav-${item}`     | Interactive |
| `dds--masthead__l0-sidenav`                 | Component   |
| `dds--masthead__l0-sidenav--nav-${item}`    | Interactive |
| `dds--masthead__l0-sidenav--subnav-${item}` | Interactive |

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
