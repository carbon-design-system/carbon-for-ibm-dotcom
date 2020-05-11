# Expressive modal

> The expressive modal is based on
> [Carbon's Modal component](https://www.carbondesignsystem.com/components/modal/code)
> with slight styling updates to increase readability and reduce strain.

> 💡 Check out
> [Carbon's Modal component](https://www.carbondesignsystem.com/components/modal/code)
> for props and other usage documentation.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/expressive-modal/expressive-modal.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the
> ExpressiveModal styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ExpressiveModal } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <>
      <ExpressiveModal open={true}>Hello world!</ExpressiveModal>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the expressive modal styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type       | Default Value | Description                                         |
| ----------- | -------- | --------------- | ------------- | --------------------------------------------------- |
| `children`  | NO       | Node            | null          | Components/Elements to be rendered within the Modal |
| `className` | NO       | String OR Array | null          | Custom classname(s) for the Modal                   |
| `fullwidth` | NO       | Boolean         | false         | Sets whether the Modal is fullwidth or not          |
| `onClose`   | NO       | Function        | null          | Function to be triggered on close of Modal          |
| `open`      | NO       | Boolean         | false         | Sets whether the Modal is open/close                |

## Stable selectors

| Name                           | Description |
| ------------------------------ | ----------- |
| `dds--expressive-modal`        | Component   |
| `dds--expressive-modal__close` | Interactive |

## Stable selectors

| Name                           | Description |
| ------------------------------ | ----------- |
| `dds--expressive-modal`        | Component   |
| `dds--expressive-modal__close` | Interactive |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
