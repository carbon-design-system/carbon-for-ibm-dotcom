# Footer

> The footer component is a required navigational pattern for IBM.com that
> displays consistently at the bottom of each page.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

import '@carbon/ibmdotcom-styles/scss/components/footer/index.scss';
```

> 💡 Only import fonts once per usage. 💡 Don't forget to import the Footer
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Method 1: Fetch Navigation data and return Footer markup (recommended)

This method will fetch the default navigation data, then inject into the footer
template and return the final markup to use. While the approach below shows the
client-side way of rendering, this can also be used for server-side rendering
approaches. ​

```javascript
import { Footer } from '@carbon/ibmdotcom-vanilla';
​
const content = Footer.getFooterWithData(); // fetches the default footer content, then returns the footer markup
const elem = document.getElementById('yourFooterDiv');
elem.innerHTML = content; // sets the footer content into the element
Footer.init(elem); // initializes the footer
```

### Method 2: Return footer markup with manual data injection

This method will return the footer markup, where the configuration and
navigation data is manually injected into the ES6 template literal itself. ​

```javascript
import { Footer, footerTemplate } from '@carbon/ibmdotcom-vanilla';
​
const content = footerTemplate({
  type: 'tall',
  footerMenu: { ...footer menu content ... }
  footerThin: { ... footer thin content ... }
}); // returns the markup
const elem = document.getElementById('yourFooterDiv');
elem.innerHTML = content; // sets the footer content into the element
Footer.init(elem); // initializes the footer
```

## Props

| Name         | Required | Data Type | Default Value | Description                                                                                                                                                                              |
| ------------ | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `footerMenu` | NO       | Object    | null          | Navigation data object for Footer. [Example data](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/Footer/__data__/footer-menu.json) |
| `footerThin` | NO       | Object    | null          | Legal Nav data object for Footer. [Example data](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/Footer/__data__/footer-thin.json)  |
| `type`       | NO       | String    | null          | Type of Footer. See below `types`.                                                                                                                                                       |

### types (optional)

| Name    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| `tall`  | Default footer variant includes additional navigation taking up more space. |
| `short` | Short footer variant reduces space by removing any additional navigation.   |

## Stable selectors

| Name                          | Description |
| ----------------------------- | ----------- |
| `dds--footer`                 | Component   |
| `dds--footer-nav`             | Component   |
| `dds--footer-nav-group`       | Component   |
| `dds--footer-nav-group__link` | Interactive |
| `dds--footer-logo`            | Component   |
| `dds--footer-logo__link`      | Interactive |
| `dds--footer-locale-btn`      | Interactive |
| `dds--legal-nav`              | Component   |
| `dds--legal-nav__link`        | Interactive |
| `dds--locale-modal`           | Component   |

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
