# Content Group

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/content-group';
```

> 💡 Only import fonts once per usage. Don't forget to import the ContentGroup
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContentGroup } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const heading = 'Lorem ipsum dolor sit amet.';
  const cta = {
    title: 'Lorem ipsum dolor sit amet',
    href: 'https://www.example.com',
  };

  return (
    <ContentGroup heading={heading} cta={cta}>
      //Children goes here
    </ContentGroup>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the content group styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name        | Required | Data Type | Default Value | Description                                 |
| ----------- | -------- | --------- | ------------- | ------------------------------------------- |
| `heading`   | NO       | String    | null          | Heading text                                |
| `children`  | NO       | Object    | null          | Container for other components.             |
| `cta`       | NO       | CTA       | Card          | CTA type for more details see `CTA` below.  |
| `className` | NO       | String    | null          | class to be applied to the containing node. |

## CTA

| Name  | Style | Type  | Description                                                                                                                                                     |
| ----- | ----- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CTA` | Card  | local | Allowed style is Card and type is local for more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/components-cta--default)!👀 |

## Stable selectors

| Name                           | Description                   |
| ------------------------------ | ----------------------------- |
| `dds--content-group`           | Content group wrapper element |
| `dds--content-group__cta`      | Content group CTA element     |
| `dds--content-group__title`    | Content group title element   |
| `dds--content-group__children` | Wrapper for children elements |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
