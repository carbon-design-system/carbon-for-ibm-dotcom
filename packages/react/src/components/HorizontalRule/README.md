# Horizontal Rule

> The horizontal rule component is to be utilized within IBM.com for thematic
> breaks within the content of the page.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/horizontalrule/index.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the HorizontalRule
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { HorizontalRule } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return <HorizontalRule />;
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the horizontal rule styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name       | Required | Data Type | Default Value     | Description                               |
| ---------- | -------- | --------- | ----------------- | ----------------------------------------- |
| `style`    | NO       | String    | 'solid'           | Style of the HR. See `styles` below.      |
| `size`     | NO       | String    | 'fluid'           | Length of the HR. See `sizes` below.      |
| `contrast` | NO       | String    | 'medium-contrast' | Contrast of the HR. See `contrast` below. |
| `weight`   | NO       | String    | 'thin'            | Weight of the HR. See `weights` below.    |

### styles (optional)

| Name     | Description                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| `solid`  | Default style variant of the horizontal rule                                   |
| `dashed` | Dashed/dotted style variant (style is applied in conjuction with `fluid` size) |

### sizes (optional)

| Name     | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| `fluid`  | Default size variant - horizontal rule takes full width of the grid |
| `small`  | Shorter fixed-length variant with a max-width of 32px               |
| `medium` | Medium fixed-length variant with a max-width of 48px                |
| `large`  | Longer fixed-length variant with a max-width of 64px                |

### contrast types (optional)

| Name              | Description                    |
| ----------------- | ------------------------------ |
| `medium-contrast` | Default contrast color variant |
| `low-contrast`    | Lighter contrast color variant |
| `high-contrast`   | Darker contrast color variant  |

### weights (optional)

| Name    | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| `thin`  | Default weight variant                                                               |
| `thick` | Slightly thicker weight variant (this only applied in conjunction with `fluid` size) |

## Stable selectors

| Name              | Description |
| ----------------- | ----------- |
| `dds--hr`         | Component   |
| `dds--hr--${mod}` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
