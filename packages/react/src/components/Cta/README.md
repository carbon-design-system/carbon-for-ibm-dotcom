# Cta

> The Cta component will be used to select different cta types pages.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/imagecomponent/imagecomponent';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'yourapplication.scss';

function App() {
  return <CTA style={style} type={type} {...cta} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the image styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name    | Required | Data Type | Default Value | Description                                    |
| ------- | -------- | --------- | ------------- | ---------------------------------------------- |
| `style` | NO       | String    | text          | Deafult style is text (LinkWithIcon component) |
| `cta`   | NO       | Object    | null          | Contains type, href,copy title, heading, image |
| `type`  | NO       | String    | local         | Contains type, href,copy title, heading, image |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
