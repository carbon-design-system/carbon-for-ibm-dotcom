# Lead Space

> The Lead Space pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpace } from '@carbon/ibmdotcom-patterns-react';
import '@carbon/ibmdotcom-styles/scss/patterns/leadspace/index.scss';
function App() {
  return <LeadSpace />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
LEADSPACE=true
```

> See [feature-flags.md](../../../docs/feature-flags.md) and
> [.env.example](../../../.env.example) for more information

## Variations

| Name                   | Description                             |
| ---------------------- | --------------------------------------- |
| `expressive`/`default` | Expressive style of the leadspace title |
| `productive`           | Productive style of the leadspace title |

## Stable selectors

| Name                     | Description    |
| ------------------------ | -------------- |
| `leadspace`              | Pattern        |
| `leadspace__cta--${key}` | LeadSpace CTAs |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
