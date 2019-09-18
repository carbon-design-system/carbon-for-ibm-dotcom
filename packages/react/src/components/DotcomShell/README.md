# DotcomShell

> The DotcomShell component includes the `Masthead` and `Footer` components, all
> wrapped in a UI shell using Carbon's grid.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/masthead/masthead.scss';
import '@carbon/ibmdotcom-styles/scss/components/footer/footer.scss';
function App() {
  return <DotcomShell />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the masthead and footer styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

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
