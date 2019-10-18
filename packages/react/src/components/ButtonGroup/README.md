# Button Group

> The button group component is to be utilized within IBM.com for grouping two
> Button components together.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/buttongroup/_buttongroup.scss';
function App() {
  return;
  <ButtonGroup
    buttons={[
      {
        link: '',
        copy: 'Primary action button',
        renderIcon: 'ArrowDown',
      },
      {
        link: '',
        copy: 'Secondary action button',
        renderIcon: 'ArrowRight',
      },
    ]}
  />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the button group styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
BUTTON_GROUP=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Buttons

| Name      | Description                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------- |
| `buttons` | Array of button objects to render. Each object should contain `link`, `copy`, and `renderIcon` |

## Stable selectors

| Name                        | Description                                 |
| --------------------------- | ------------------------------------------- |
| `dds--buttongroup`          | `ButtonGroup` wrapper layer                 |
| `dds--buttongroup-${index}` | `Button` component within the `ButtonGroup` |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
