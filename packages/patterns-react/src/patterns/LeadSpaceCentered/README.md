# Lead Space Centered

> The Lead Space Centered pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/leadspace-centered/leadspace-centered';
```

> 💡 Only import fonts once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LeadSpaceCentered } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

function App() {
  return <LeadSpaceCentered />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the leadspace styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LEADSPACE_CENTERED=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Theme (optional)

| Name              | Description                              |
| ----------------- | ---------------------------------------- |
| `white`/`default` | White theme applied to pattern           |
| `g100`            | Gray 100 (g100) theme applied to pattern |

## Stable selectors

| Name                       | Description |
| -------------------------- | ----------- |
| `dds--leadspace--centered` | Pattern     |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
