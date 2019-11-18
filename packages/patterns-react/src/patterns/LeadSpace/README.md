# Lead Space

> The Lead Space pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpace } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';
import '@carbon/ibmdotcom-styles/scss/patterns/leadspace/index.scss';
function App() {
  return <LeadSpace />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
LEADSPACE=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Variations

| Name                   | Description                             |
| ---------------------- | --------------------------------------- |
| `expressive`/`default` | Expressive style of the leadspace title |
| `productive`           | Productive style of the leadspace title |

## Stable selectors

| Name                    | Description                |
| ----------------------- | -------------------------- |
| `dds--leadspace`        | Pattern                    |
| `dds--leadspace__image` | LeadSpace background image |
| `dds--leadspace__cta`   | LeadSpace CTAs             |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
