# Sticky Table of Contents

> The Sticky Table of Contents pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { TableOfContents } from '@carbon/ibmdotcom-patterns-react';
import '@carbon/ibmdotcom-styles/scss/patterns/tableofcontents/index.scss';

function App() {
  return (
    <TableOfContents menuLabel={menuLabel} menuItems={menuItems}>
      <a name="8"></a>
      <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
        Cras molestie condimentum
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie
        condimentum consectetur. Nulla tristique lacinia elit, at elementum dui
        gravida non. Mauris et nisl semper, elementum quam non, lacinia purus.
        Vivamus aliquam vitae sapien volutpat efficitur.
      </p>

      <a name="7"></a>
      <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
        Praesent fermentum sodales
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie
        condimentum consectetur. Nulla tristique lacinia elit, at elementum dui
        gravida non. Mauris et nisl semper, elementum quam non, lacinia purus.
        Vivamus aliquam vitae sapien volutpat efficitur. Curabitur sagittis
        neque facilisis magna posuere consectetur.
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
TABLE_OF_CONTENTS=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name        | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `menuLabel` | Label for mobile menu `Jump to ...`                             |
| `menuItems` | Menu items for table of contents `{menuItems: [ {title, id} ]}` |

## Stable selectors

| Name                   | Description |
| ---------------------- | ----------- |
| `dds--tableofcontents` | component   |
| `dds--layout`          | component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
