# Masthead

> The masthead component is a required navigational pattern for IBM.com that
> displays consistently at the bottom of each page. It also includes search and
> profile services for IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/components/masthead/masthead.scss';
```

> 💡 Only import fonts once per usage. 💡 Don't forget to import the Masthead
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Method 1: Fetch Navigation data and return Masthead markup (recommended)

This method will fetch the default navigation data, then inject into the
masthead template and return the final markup to use. While the approach below
shows the client-side way of rendering, this can also be used for server-side
rendering approaches. ​

```javascript
import { Masthead } from '@carbon/ibmdotcom-vanilla';
​
const content = Masthead.getMastheadWithData(); // fetches the default masthead content, then returns the masthead markup
const elem = document.getElementById('yourMastheadDiv');
elem.innerHTML = content; // sets the masthead content into the element
Masthead.init(); // initializes the masthead
```

### Method 2: Return masthead markup with manual data injection

This method will return the masthead markup, where the configuration and
navigation data is manually injected into the ES6 template literal itself. ​

```javascript
import { Masthead, mastheadTemplate } from '@carbon/ibmdotcom-vanilla';
​
const content = mastheadTemplate(
  navigation,
  platform,
  hasNavigation,
  hasProfile,
  searchProps,
); // returns the markup
const elem = document.getElementById('yourMastheadDiv');
elem.innerHTML = content; // sets the masthead content into the element
Masthead.init(elem); // initializes the masthead
```

## Props

| Name                           | Required | Data Type        | Default Value       | Description                                                         |
| ------------------------------ | -------- | ---------------- | ------------------- | ------------------------------------------------------------------- |
| `navigation`                   | NO       | String OR Object | null                | Navigation data object/string for Masthead. See `navigation` below. |
| `hasProfile`                   | NO       | Boolean          | true                | Determines whether to render IBM Profile Menu component.            |
| `hasNavigation`                | NO       | Boolean          | true                | Determines whether to render.navigation                             |
| `platform`                     | NO       | Object           | null                | Platform name that appears on L0. See `platform` below.             |
| `searchProps`                  | NO       | Object           | null                | Search properties.                                                  |
| `searchProps.hasSearch`        | NO       | Boolean          | true                | Determines whether to render SearchBar component.                   |
| `searchProps.placeHolderText`  | NO       | String           | `Search all of IBM` | Placeholder value for search input.                                 |
| `searchProps.searchOpenOnload` | NO       | Boolean          | false               | Determines whether the SearchBar is open on page load.              |

## navigation

| Behavior          | Data Type | Description                                 | Example                                   |
| ----------------- | --------- | ------------------------------------------- | ----------------------------------------- |
| custom navigation | Object    | Pass in custom navigation data as an object | `mastheadTemplate(myNavObj, platform...)` |

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

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
