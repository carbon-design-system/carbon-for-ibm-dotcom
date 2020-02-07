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

> 💡 Only import font's once per usage 💡 Don't forget to import the footer
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

| Name         | Required | Data Type | Default Value | Description                        |
| ------------ | -------- | --------- | ------------- | ---------------------------------- |
| `footerMenu` | NO       | Object    | null          | Navigation data object for Footer  |
| `footerThin` | NO       | Object    | null          | Legal Nav data object for Footer   |
| `type`       | NO       | String    | null          | Type of Footer. See below `types`. |

### types (optional)

| Name    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| `tall`  | Default footer variant includes additional navigation taking up more space. |
| `short` | Short footer variant reduces space by removing any additional navigation.   |

### footerMenu (data structure)

```json
[
  {
    "title": "Discover",
    "links": [
      {
        "title": "Marketplace",
        "url": "https://www.ibm.com/products?lnk=fdi"
      },
      {
        "title": "Redbooks",
        "url": "https://www.redbooks.ibm.com/?lnk=fdi"
      },
      {
        "title": "Services",
        "url": "https://www.ibm.com/services?lnk=fdi"
      },
      {
        "title": "Industries",
        "url": "https://www.ibm.com/industries?lnk=fdi"
      },
      {
        "title": "IBM Research",
        "url": "https://research.ibm.com/?lnk=fdi"
      },
      {
        "title": "Case studies",
        "url": "https://www.ibm.com/case-studies?lnk=fdi"
      },
      {
        "title": "Demos",
        "url": "https://www.ibm.com/demos/?lnk=fdi"
      },
      {
        "title": "Financing",
        "url": "https://www.ibm.com/financing?ref=ibmfooter&lnk=fdi"
      }
    ]
  },
  {
    "title": "Information for...",
    "links": [
      {
        "title": "Developers",
        "url": "https://www.ibm.com/developerworks/?lnk=fif"
      },
      {
        "title": "Business Partners",
        "url": "https://www-356.ibm.com/partnerworld/wps/servlet/ContentHandler/partnerworld-home?lnk=fif"
      },
      {
        "title": "Federal and state contracts",
        "url": "https://www.ibm.com/industries/sled-contracts?lnk=fif"
      }
    ]
  },
  {
    "title": "Connect with us",
    "links": [
      {
        "title": "Support",
        "url": "https://support.ibm.com?lnk=fcw"
      },
      {
        "title": "Find a Business Partner",
        "url": "https://www.ibm.com/partnerworld/wps/bplocator/search.jsp?lnk=fcw"
      }
    ]
  },
  {
    "title": "About IBM",
    "links": [
      {
        "title": "Careers",
        "url": "https://www.ibm.com/employment/?lnk=fab"
      },
      {
        "title": "Events",
        "url": "https://www.ibm.com/events?lnk=fab"
      },
      {
        "title": "Latest news",
        "url": "https://newsroom.ibm.com/?lnk=fab"
      },
      {
        "title": "Investor relations",
        "url": "https://www.ibm.com/investor/?lnk=fab"
      },
      {
        "title": "Diversity and inclusion",
        "url": "https://www.ibm.com/employment/us/diverse/?lnk=fab"
      },
      {
        "title": "Corporate responsibility",
        "url": "https://www.ibm.org/?lnk=fab"
      },
      {
        "title": "About IBM",
        "url": "https://www.ibm.com/ibm/us/en/?lnk=fab"
      }
    ]
  },
  {
    "title": "Social",
    "links": [
      {
        "linkClass": "ibm-twitter-encircled-link",
        "title": "Twitter",
        "url": "https://www.twitter.com/ibm"
      },
      {
        "linkClass": "ibm-linkedin-encircled-link",
        "title": "LinkedIn",
        "url": "https://www.linkedin.com/company/ibm"
      },
      {
        "linkClass": "ibm-facebook-encircled-link",
        "title": "Facebook",
        "url": "https://www.facebook.com/ibm"
      },
      {
        "linkClass": "ibm-youtube-encircled-link",
        "title": "YouTube",
        "url": "https://www.youtube.com/ibm"
      }
    ]
  }
]
```

### footerThin (data structure)

```json
[
  {
    "title": "Contact IBM",
    "url": "https://www.ibm.com/contact/us/en/?lnk=flg-cont-usen"
  },
  {
    "title": "Privacy",
    "url": "https://www.ibm.com/privacy/us/en/?lnk=flg-priv-usen"
  },
  {
    "title": "Terms of use",
    "url": "https://www.ibm.com/us-en/legal?lnk=flg-tous-usen"
  },
  {
    "title": "Accessibility",
    "url": "https://www.ibm.com/accessibility/us/en/?lnk=flg-acce-usen"
  }
]
```

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

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
