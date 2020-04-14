# DotcomShell

> The DotcomShell component includes the `Masthead`, and `Footer` components,
> all wrapped in a UI shell using Carbon's grid.

## Getting started

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

import '@carbon/ibmdotcom-styles/scss/components/dotcom-shell/_dotcom-shell.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the DotcomShell
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Content

```javascript
const content = `
  <p>Your content here (probably include something nicer than this! 😄)</p>
`;

export default content;
```

### DotcomShell

```javascript
import { DotcomShell } from '@carbon/ibmdotcom-vanilla';
import content from 'content';

const dotcomShellProps = {
  masthead: {
    navigation: 'default',
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    },
    hasSearch: true,
    ...
  },
  footer: {
    footerType: 'short'
  }
};

async function _loadDotcomShell() {
  const template = await DotcomShell.getDotcomShellWithData({content, ...dotcomShellProps});
  const yourapp = document.getElementById('yourapp');
  yourapp.innerHTML = template;
  DotcomShell.init(yourapp);
}

_loadDotcomShell();
```

> 💡 And don't forget to import the DotcomShell styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

## Data and content

| Name                        | Description    |
| --------------------------- | -------------- |
| `content`                   | User content   |
| `dotcomshellProps.masthead` | Masthead props |
| `dotcomshellProps.footer`   | Footer props   |

> 💡 See the
> [Masthead](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/vanilla/src/components/masthead)
> and
> [Footer](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/vanilla/src/components/footer)
> component documentation for their specific usage.

## Props

| Name                          | Required | Data Type     | Default Value | Description                                                                   |
| ----------------------------- | -------- | ------------- | ------------- | ----------------------------------------------------------------------------- |
| `children`                    | YES      | Array OR Node | n/a           | HTML to render within the UI shell                                            |
| `dotcomshellProps.masthead`   | NO       | Object        | null          | Additional Props for the Masthead. See `Masthead` README.md for more details. |
| `dotcomshellProps.footerType` | NO       | String        | null          | Type of Footer (short OR tall). See `Footer` README.md for more details.      |

## Stable selectors

| Name                         | Description |
| ---------------------------- | ----------- |
| `dds--dotcom-shell`          | Component   |
| `dds--dotcom-shell__content` | Component   |

## CORS Proxy

This component makes cross-origin requests to `www.ibm.com`, which will require
a cors proxy to be configured to make successful calls from a lower environment.

A cors proxy can be configured using the following
[environment variable](../../../docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

> NOTE: The `CORS_PROXY` is not necessary when publishing to production
> (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it
> unconfigured when pushing your application to production.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
