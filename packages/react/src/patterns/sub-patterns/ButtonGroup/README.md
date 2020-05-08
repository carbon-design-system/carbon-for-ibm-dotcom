# Button Group

> The button group component is to be utilized within IBM.com for grouping two
> or more Button components together.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/buttongroup/buttongroup';
```

> 💡 Only import fonts once per usage. Don't forget to import the ButtonGroup
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Base example

This is the base example 'ButtonGroup'. Note, the buttons will not resize based
on text size.

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ArrowRight20, ArrowDown20 } from '@carbon/icons-react';
import { ButtonGroup } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <ButtonGroup
      buttons={[
        {
          href: 'https://example.com',
          copy: 'Primary action button',
          renderIcon: ArrowDown20,
        },
        {
          href: 'https://example.com',
          copy: 'Secondary action button',
          renderIcon: ArrowRight20,
        },
      ]}
    />
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Only import fonts once per usage. 💡

### Example with buttons based on text size

This example utilizes the grid system in order to adjust the button size based
on text size. Adjust the columns as needed.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ArrowRight20, ArrowDown20 } from '@carbon/icons-react';
import { ButtonGroup } from '@carbon/ibmdotcom-react';
import '@carbon/grid/scss/grid.scss';
import 'yourapplication.scss';
function App() {
  return (
    <div className="bx-grid">
      <div className="row">
        <div className="bx--col-lg-12 bx--col-md-8 bx--col-sm-16">
          <ButtonGroup
            buttons={[
              {
                href: 'https://example.com',
                copy: 'Primary action button',
                renderIcon: ArrowDown20,
              },
              {
                href: 'https://example.com',
                copy: 'Secondary action button',
                renderIcon: ArrowRight20,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

> Don't forget to import the button group styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                                 |
| --------- | -------- | --------- | ------------- | ----------------------------------------------------------- |
| `buttons` | NO       | Array     | null          | Array of button objects to render. See `Button Item` below. |

### Button Item

| Name         | Data Type | Description                                                                                                                    |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `href`       | String    | URL for the button item                                                                                                        |
| `copy`       | String    | Button copy                                                                                                                    |
| `renderIcon` | Object    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |

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
