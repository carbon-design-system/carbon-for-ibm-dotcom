# Button Group

> The button group component is to be utilized within IBM.com for grouping two
> or more Button components together.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ArrowRight20, ArrowDown20 } from '@carbon/icons-react';
import { ButtonGroup } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/buttongroup/_buttongroup.scss';
function App() {
  return;
  <ButtonGroup
    buttons={[
      {
        href: '',
        copy: 'Primary action button',
        renderIcon: ArrowDown20,
      },
      {
        href: '',
        copy: 'Secondary action button',
        renderIcon: ArrowRight20,
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

| Name      | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `buttons` | Array of button objects to render. See `Button Item` below. |

### Button Item

| Name         | Description                           |
| ------------ | ------------------------------------- |
| `href`       | URL for the button item               |
| `copy`       | Button copy                           |
| `renderIcon` | Custom Icon to render with the button |

Visit the
[Button documentation](http://react.carbondesignsystem.com/?path=/story/buttons--default)
from Carbon for a full list of available props.

## Stable selectors

| Name                         | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `dds--button-group`          | `ButtonGroup` wrapper layer                 |
| `dds--button-group-${index}` | `Button` component within the `ButtonGroup` |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
