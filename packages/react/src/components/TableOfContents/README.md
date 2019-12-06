# Sticky Table of Contents

> The Sticky Table of Contents component is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { TableOfContents } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/tableofcontents/index.scss';

const theme = ''; //Empty for light, g100 for dark

const menuItems = [
  {
    title: 'Cras molestie condimentum',
    id: '8',
  },
  {
    title: 'Praesent fermentum sodales',
    id: '7',
  },
];

function App() {
  return (
    <TableOfContents theme={theme} menuItems={menuItems}>
      <a name="8"></a>
      <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
        Cras molestie condimentum
      </h3>
      <p>
        Elementum dui gravida non. Mauris et nisl semper, elementum quam non,
        lacinia purus. Vivamus aliquam vitae sapien volutpat efficitur.
      </p>

      <a name="7"></a>
      <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
        Praesent fermentum sodales
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie
        condimentum consectetur. Nulla tristique lacinia elit.
      </p>
    </TableOfContents>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the tableofcontents styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_TOC=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name        | Required | Data Type | Default Value | Description                                                                      |
| ----------- | -------- | --------- | ------------- | -------------------------------------------------------------------------------- |
| `children`  | NO       | Array     | null          | Content to display next to the side nav.                                         |
| `menuItems` | NO       | Array     | null          | Array of menu item objects to render within the side nav. See `menuItems` below. |
| `menuLabel` | NO       | String    | `Jump to`     | Placeholder value for menu label                                                 |

## menuItems

| Name    | Data Type | Default value                                  | Description |
| ------- | --------- | ---------------------------------------------- | ----------- |
| `theme` | String    | `` | Set the dark theme if the value is `g100` |

## Stable selectors

| Name                                                        | Description |
| ----------------------------------------------------------- | ----------- |
| `dds--tableofcontents`                                      | component   |
| `dds--tableofcontents__sidebar`                             | interactive |
| `dds--tableofcontents__content`                             | interactive |
| `dds--tableofcontents__content-wrapper`                     | component   |
| `dds--tableofcontents__desktop`                             | component   |
| `dds--tableofcontents__desktop__item-${item.id}`            | interactive |
| `dds--tableofcontents__mobile`                              | component   |
| `dds--tableofcontents__mobile__select__option-${option.id}` | interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
