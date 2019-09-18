# DotcomShell

> The DotcomShell component includes the `Masthead`, `Footer`, and `Content`
> components, all wrapped in a UI shell using Carbon's grid.

## Getting started

The `DotcomShell` uses Carbon's `Content` component. All user-provided content
should be placed here. This can be anything from HTML to a React component.
Here's a quick example to get you started.

### Content

```javascript
import React from 'react';
import { Button, StructuredListBody } from 'carbon-components-react';

const content = (
  <>
    <p>Your content here (probably include something nicer than this! 😄)</p>
    <Button />
    <StructuredListBody />
  </>
);

export default content;
```

### DotcomShell

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/masthead/masthead.scss';
import '@carbon/ibmdotcom-styles/scss/components/footer/footer.scss';
import content from 'content';

function App() {
  return (
    <DotcomShell navigation={navigation} footerType="short">
      {content}
    </DotcomShell>
  );
}
```

> 💡 > And don't forget to import the masthead and footer styles from
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
