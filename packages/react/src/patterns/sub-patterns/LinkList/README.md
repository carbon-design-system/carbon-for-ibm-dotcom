# Link List

> The Link List component will be used to have list of different cta types.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/link-list/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the LinkList
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LinkList } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const items = [
    {
      heading: 'Containerization: A Complete Guide',
      type: 'local',
      copy: 'Lorem ipsum dolor sit amet',
      href: 'https://ibm.com',
    },
    {
      heading: 'Why should you use microservices and containers?',
      type: 'external',
      copy: 'Lorem ipsum dolor sit amet',
      href: 'https://ibm.com',
    },
    {
      type: 'video',
      media: {
        src: '0_uka1msg4',
        type: 'video',
      },
    },
  ];
  return <LinkList heading={heading} items={items} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the LinkList styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value | Description                                          |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------- |
| `heading` | YES      | String    | text          | Describes heading of LinkList.                       |
| `items`   | YES      | Array     | null          | Describes the list of CTA. For more See below `CTA`. |

### CTA

| Name      | Description                                                                             |
| --------- | --------------------------------------------------------------------------------------- |
| `heading` | Describing the resource with added detail.                                              |
| `type`    | Describes after onClick where to load. It has `external`, `local`, and `video` options. |

> 👀 See more here
> [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/CTA/README.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
