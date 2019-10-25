# Simple Long Form

> The Simple Long Form pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleLongForm } from '@carbon/ibmdotcom-patterns-react';
import '@carbon/ibmdotcom-styles/scss/patterns/simplelongform/index.scss';

function App() {
  return (
    <SimpleLongForm title={title} copy={copy} linkType={linkType} link={link} />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the simplelongform styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
SIMPLELONGFORM=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name       | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| `title`    | Simple long form title `{title}`                                      |
| `copy`     | Simple long form content `{copy}`                                     |
| `linkType` | Simple long form link type `{linkType: { none, simple, card, jump }}` |
| `link`     | Simple long form link object `{link: { href, text, target }}`         |

## Link type

| Name     | Description                       |
| -------- | --------------------------------- |
| `none`   | Simple long form without link     |
| `simple` | Simple long form with simple link |
| `jump`   | Simple long form with jump link   |
| `card`   | Simple long form with card link   |

## Stable selectors

| Name                  | Description |
| --------------------- | ----------- |
| `dds--simplelongform` | component   |
| `dds--simplelink`     | interactive |
| `dds--jumplink`       | interactive |
| `dds--cardlink`       | interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
