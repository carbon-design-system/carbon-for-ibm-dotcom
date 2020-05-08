# Sticky Table of Contents

> The Sticky Table of Contents component is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/tableofcontents/index.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> TableOfContents styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { TableOfContents } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

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

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the tableofcontents styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name           | Required | Data Type | Default Value | Description                                                                      |
| -------------- | -------- | --------- | ------------- | -------------------------------------------------------------------------------- |
| `children`     | NO       | Array     | null          | Content to display next to the side nav.                                         |
| `menuItems`    | NO       | Array     | null          | Array of menu item objects to render within the side nav. See `menuItems` below. |
| `menuLabel`    | NO       | String    | `Jump to`     | Placeholder value for menu label                                                 |
| `theme`        | NO       | String    | `white`       | Defines the color theme for the pattern (See `Theme` bellow)                     |
| `stickyOffset` | NO       | Number    | null          | Defines the offset for the sticky column                                         |

## menuItems

| Properties Name | Data Type | Description     |
| --------------- | --------- | --------------- |
| title           | String    | Menu title text |
| id              | String    | Menu id         |

### Dynamic menuItems

If `menuItems` is not passed in as a prop, the menu items are dynamically
generated based on anchor links that exist on the page. The anchor links should
follow the following format:

```html
<a name="name-of-section" data-title="Lorem Ipsum"></a>
```

## Theme (optional)

| Name            | Description                              |
| --------------- | ---------------------------------------- |
| white / default | White theme applied to pattern           |
| g100            | Gray 100 (g100) theme applied to pattern |

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
