# Masthead

> The masthead component is a required navigational pattern for IBM.com that
> displays consistently at the top of each page. It also includes search and
> profile services for IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/masthead/masthead.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the Masthead
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Masthead } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';
function App() {
  return <Masthead />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the masthead styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_MASTHEAD_L1=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/.env.example)
> for more information

## Props

| Name               | Required | Data Type        | Default Value       | Description                                                         |
| ------------------ | -------- | ---------------- | ------------------- | ------------------------------------------------------------------- |
| `navigation`       | NO       | String OR Object | null                | Navigation data object/string for Masthead. See `navigation` below. |
| `hasProfile`       | NO       | Boolean          | true                | Determines whether to render IBM Profile Menu component.            |
| `hasSearch`        | NO       | Boolean          | true                | Determines whether to render SearchBar component.                   |
| `placeHolderText`  | NO       | String           | `Search all of IBM` | Placeholder value for search input.                                 |
| `platform`         | NO       | Object           | null                | Platform name that appears on L0. See `platform` below.             |
| `searchOpenOnload` | NO       | Boolean          | false               | Determines if the search field is open on page load.                |
| `title`            | NO       | String           | null                | Title for the masthead L1 (experimental).                           |
| `eyebrowText`      | NO       | String           | null                | Text for the eyebrow link in masthead L1 (experimental).            |
| `eyebrowLink`      | NO       | String           | null                | URL for the eyebrow link in masthead L1 (experimental).             |

## navigation

| Behavior           | Data Type | Description                                 | Example                             |
| ------------------ | --------- | ------------------------------------------- | ----------------------------------- |
| default navigation | String    | Default navigation data from IBM.com        | `<Masthead navigation="default" />` |
| custom navigation  | Object    | Pass in custom navigation data as an object | `<Masthead navigation={myNavObj}/>` |
| none               | null      | No navigation                               | `<Masthead />`                      |

> 💡 `Custom` navigation data must follow the same structure and key names as
> `default`. See
> [this](https://www.ibm.com/common/v18/js/data/jsononly/usen.json) for an
> example.

## platform

Includes platform name (only available with `default` and `custom navigation`).
Object requires `name` and `url`.

```javascript
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

<Masthead platform={platformData} navigation="default" />;
```

## Stable selectors

| Name                                                       | Description |
| ---------------------------------------------------------- | ----------- |
| `dds--masthead`                                            | Component   |
| `dds--masthead__hamburger`                                 | Interactive |
| `dds--masthead__logo`                                      | Interactive |
| `dds--masthead__platform-name`                             | Interactive |
| `dds--masthead__l0-nav`                                    | Component   |
| `dds--masthead__l0-nav--nav-${item}`                       | Interactive |
| `dds--masthead__l0-nav--subnav-col${item}-item${item}`     | Interactive |
| `dds--masthead__l0-sidenav`                                | Component   |
| `dds--masthead__l0-sidenav--nav-${item}`                   | Interactive |
| `dds--masthead__l0-sidenav--subnav-col${item}-item${item}` | Interactive |

## CORS Proxy

This component makes cross-origin requests to `www.ibm.com`, which will require
a cors proxy to be configured to make successful calls from a lower environment.

A cors proxy can be configured using the following
[environment variable](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

> NOTE: The `CORS_PROXY` is not necessary when publishing to production
> (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it
> unconfigured when pushing your application to production.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
