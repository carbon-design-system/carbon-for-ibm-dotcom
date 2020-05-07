# Logo Grid

> The Logo Grid pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/blocks/logo-grid/index.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the LogoGrid
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LogoGrid } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const title =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const logosGroup = [
  {
    title: 'Company A',
    imgSrc: 'https://dummyimage.com/140x140',
    altText: 'Image alt text',
  },
  {
    title: 'Company B',
    imgSrc: 'https://dummyimage.com/140x140',
    altText: 'Image alt text',
  },
];

function App() {
  return <LogoGrid title={title} logosGroup={logosGroup} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the logogrid styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_LOGO_GRID=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name         | Required | Data Type | Default Value | Description                                       |
| ------------ | -------- | --------- | ------------- | ------------------------------------------------- |
| `title`      | NO       | String    | n/a           | title for Logo Grid pattern                       |
| `logosGroup` | NO       | Array     | n/a           | LogosGroup array of Objects for Logo Grid pattern |

### logosGroup

| Name      | Data Type | Description                         |
| --------- | --------- | ----------------------------------- |
| `label`   | String    | Label for logo placeholder.         |
| `imgSrc`  | String    | image source for logo placeholder.  |
| `altText` | String    | alternate text for ogo placeholder. |

## Stable selectors

| Name             | Description |
| ---------------- | ----------- |
| `dds--logo-grid` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
