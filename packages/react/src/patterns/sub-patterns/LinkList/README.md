# LinkList

> The LinkList component will be used to have list of different cta types.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/link-list';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LinkList } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const items = [
      {
        heading: 'Containerization: A Complete Guide',
        type: local,
        style: 'text',
        title: 'Lorem ipsum dolor sit amet',
        href: 'https://ibm.com',
      },
      {
        heading: 'Why should you use microservices and containers?',
        type: external,
        style: 'text',
        title: 'Lorem ipsum dolor sit amet',
        href: 'https://ibm.com',
      },

  return (
    <LinkList heading={heading} items={items} />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the LinkList styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                                                                                                                             |
| --------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | YES      | String    | text          | Describes heading of LinkList.                                                                                                                          |
| `items`   | NO       | Array     | null          | Describes the list of CTA. For more See [CTA](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/components/CTA/README.md)!👀 |

## Styles

| Style  | Component Name | Description                                                                                                                                              |
| ------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` | LinkWithIcon   | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/components-link-with-icon--default)!👀 |

## Types

| Type       | SVG element Name | Description                                                                                   |
| ---------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page. For more details click `Icons` below. |
| `external` | Launch20         | Describes launch arrow onClick which loads in new tab. For more details click `Icons` below.  |

## Icons

- [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
- [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)!👀
- [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
