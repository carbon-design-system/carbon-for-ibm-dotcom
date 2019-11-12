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
    <TableOfContents
      layoutType="1-4 - 3/4 layout"
      menuItems={menuItems}
      marginTop="none"
      marginBottom="none">
      <div data-driverlocation="1" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>
          {' '}
          Cras molestie condimentum{' '}
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie
          condimentum consectetur. Nulla tristique lacinia elit, at elementum
          dui gravida non. Mauris et nisl semper,
        </p>
      </div>
      <div data-driverlocation="2" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}> Praesent fermentum sodales </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie
          condimentum consectetur. Nulla tristique lacinia elit, at elementum
          dui gravida non. Mauris et nisl semper,
        </p>
      </div>
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

| Name           | Description                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layoutType`   | Type of layout for table of content `1-4 - 3/4 layout`                                                                                             |
| `menuItems`    | Menu items for table of content `{menuItems: [ {title, id} ]}`                                                                                     |
| `marginTop`    | Margin top based on carbon spacing layout tokens `[ none | layout-01 | layout-02 | layout-03 | layout-04 | layout-05 | layout-06 | layout-07 ]`    |
| `marginBottom` | Margin bottom based on carbon spacing layout tokens `[ none | layout-01 | layout-02 | layout-03 | layout-04 | layout-05 | layout-06 | layout-07 ]` |

## Stable selectors

| Name                  | Description |
| --------------------- | ----------- |
| `dds--tableofcontent` | component   |
| `dds--layout`         | component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
