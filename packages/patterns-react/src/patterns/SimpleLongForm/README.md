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
  return <SimpleLongForm />;
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

| Name        | Description                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `title`     | Simple long form title                                                                                                      |
| `copy`      | Simple long form content                                                                                                    |
| `variation` | Simple long form variation ( _standard_,_standard with simple link_, _standard with card link_, _standard with jump link_ ) |
| `link`      | Simple long form link object with _href, text and target_ properties                                                        |

## Variations

| Name                   | Description                             |
| ---------------------- | --------------------------------------- |
| `standard`             | Default Simple long form without link   |
| `standardWithJumpLink` | Default Simple long form with jump link |
| `standardWithCardLink` | Default Simple long form with card link |

## Stable selectors

| Name                                 | Description |
| ------------------------------------ | ----------- |
| `bx--simplelongform`                 | Pattern     |
| `bx--simplelongform--with-jump-link` | interactive |
| `bx--simplelongform--with-card-link` | interactive |
| `bx--simplelongform__container`      | interactive |
| `bx--simplelongform__row`            | interactive |
| `bx--simplelongform__col`            | interactive |
| `bx--simplelongform__title`          | interactive |
| `bx--simplelongform__content`        | interactive |
| `bx--simplelongform__link__col`      | interactive |
| `bx--simplelongform__divider__col`   | interactive |
| `bx--simplelongform__divider`        | interactive |
| `bx--simplelongform__link`           | component   |
| `bx--simplelink`                     | interactive |
| `bx--simplelink__text`               | interactive |
| `bx--simplelink__icon`               | interactive |
| `bx--jumplink`                       | component   |
| `bx--jumplink__text`                 | interactive |
| `bx--jumplink__icon`                 | interactive |
| `bx--cardlink`                       | component   |
| `bx--cardlink__card`                 | interactive |
| `bx--cardlink__card__text`           | interactive |
| `bx--cardlink__card__icon`           | interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
