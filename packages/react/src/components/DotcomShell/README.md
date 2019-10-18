# DotcomShell

> The DotcomShell component includes the `Masthead`, and `Footer` components,
> all wrapped in a UI shell using Carbon's grid.

## Getting started

Here's a quick example to get you started.

### Content

```javascript
import React from 'react';

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
import '@carbon/ibmdotcom-styles/scss/components/dotcom-shell/_dotcom-shell.scss';
import content from 'content';

function App() {
  return (
    <DotcomShell navigation={navigation} footerType="short">
      {content}
    </DotcomShell>
  );
}
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

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
