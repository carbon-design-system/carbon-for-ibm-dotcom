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

@import '@carbon/ibmdotcom-styles/scss/components/dotcom-shell/dotcom-shell';
```

> 💡 Only import fonts once per usage. Don't forget to import the DotcomShell
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Content

```javascript
import React from 'react';
import 'yourapplication.scss';

const content = (
  <>
    <p>Your content here (probably include something nicer than this! 😄)</p>
  </>
);

export default content;
```

### DotcomShell

```javascript
import React from 'react';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';
import content from 'content';

function App() {
  return (
    <DotcomShell navigation={navigation} footerType="short">
      {content}
    </DotcomShell>
  );
}
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 And don't forget to import the DotcomShell styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

## Data and content

| Name          | Description     |
| ------------- | --------------- |
| `children`    | User content    |
| `footer`      | Footer type     |
| `navigtation` | Navigation data |

> 💡 See the
> [Masthead](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Masthead)
> and
> [Footer](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Footer)
> component documentation for their specific usage.

## Props

| Name            | Required | Data Type        | Default Value | Description                                                                   |
| --------------- | -------- | ---------------- | ------------- | ----------------------------------------------------------------------------- |
| `children`      | YES      | Array OR Node    | n/a           | Component(s) to render within the UI shell                                    |
| `footerNav`     | NO       | Object           | null          | Navigation data for the Footer                                                |
| `footerType`    | NO       | String           | null          | Type of Footer (short OR tall). See `Footer` README.md for more details.      |
| `mastheadProps` | NO       | Object           | null          | Additional Props for the Masthead. See `Masthead` README.md for more details. |
| `navigation`    | NO       | String OR Object | null          | Navigation data for the Masthead                                              |

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

NOTE: The `CORS_PROXY` is not necessary when publishing to production (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it unconfigured when pushing your application to production.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
