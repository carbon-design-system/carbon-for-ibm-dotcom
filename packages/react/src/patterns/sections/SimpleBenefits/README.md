# Simple Benefits

> The Simple Benefits pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sections/simplebenefits/index.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the SimpleBenefits
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleBenefits } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

const title = 'Lorem ipsum dolor sit amet.';

const content = [
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
  },
  {
    title: 'Aliquam',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_self',
    },
  },
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Aenean et ultricies est. Aenean et ultricies est.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_self',
    },
  },
  {
    title: 'Aliquam condimentum interdum ultricies est',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_self',
    },
  },
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
  },
  {
    title: 'Aliquam condimentum interdum',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
    link: {
      href: 'https://www.example.com',
      text: 'Learn more',
      target: '_self',
    },
  },
];

function App() {
  return <SimpleBenefits content={content} title={title} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the simplebenefits styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_SIMPLEBENEFITS=true
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/patterns-react/.env.example)
> for more information

## Props

| Name      | Required | Data Type | Default Value | Description                                          |
| --------- | -------- | --------- | ------------- | ---------------------------------------------------- |
| `title`   | YES      | String    | n/a           | Main title of the pattern.                           |
| `content` | NO       | Array     | null          | Array of content group objects. See `content` below. |

### content

| Name    | Data Type | Description                                                  |
| ------- | --------- | ------------------------------------------------------------ |
| `title` | String    | Title of the Content Card item.                              |
| `copy`  | String    | Copy of the Content Card item.                               |
| `link`  | Object    | Object containing target and href of link. See `link` below. |

### link

| Name     | Data Type | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `href`   | String    | Url of link.                                               |
| `text`   | String    | Link text.                                                 |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |

## Stable selectors

| Name                                | Description |
| ----------------------------------- | ----------- |
| `dds--simplebenefits`               | Component   |
| `dds--simplebenefits__content`      | Component   |
| `dds--simplebenefits__content-item` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
