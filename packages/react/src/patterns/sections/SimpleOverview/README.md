# Simple Overview

> The Simple Overview pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sections/simpleoverview/index.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the SimpleOverview
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleOverview } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const label = 'Lorem ipsum dolor sit amet, consectetur';
const heading =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod';
const copy =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const link = {
  copy: 'Lorem Ipsum',
  href: 'https://www.example.com',
  target: '_blank',
};

function App() {
  return (
    <SimpleOverview label={label} heading={heading} copy={copy} link={link} />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the simpleoverview styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_SIMPLE_OVERVIEW=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name      | Required | Data Type | Default Value | Description                             |
| --------- | -------- | --------- | ------------- | --------------------------------------- |
| `label`   | YES      | String    | n/a           | Side label for Simple Overview pattern  |
| `heading` | YES      | String    | n/a           | Heading for Simple Overview pattern     |
| `copy`    | YES      | String    | n/a           | Copy for Simple Overview pattern        |
| `link`    | NO       | Object    | n/a           | Link Object for Simple Overview pattern |

### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Url of link.                                               |
| `copy`   | String    | Link copy.                                                 |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

## Stable selectors

| Name                  | Description |
| --------------------- | ----------- |
| `dds--simpleoverview` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
