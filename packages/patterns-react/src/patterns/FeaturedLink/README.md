# Featued Link Cards

> The Featured Link Cards pattern is to be utilized within IBM.com.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/featuredlink/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardArray } from '@carbon/ibmdotcom-patterns-react';
import 'yourapplication.scss';

const title = 'Lorem ipsum dolor sit amet.';

const content = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    copy:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: {
      target: '_blank',
      href: 'https://www.example.com',
    },
  },
];

function App() {
  return <FeaturedLink title={title} content={content} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the Featured Link styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### Feature Flags

To utilize the following features, set the following variable's to `true` within
your `.env` file or your application build settings.

```
DDS_FEATURED_LINK=true
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
| `image`   | NO       | object    | n/a           | An object. See `image` below.                        |

### content

| Name    | Data Type | Description                                                  |
| ------- | --------- | ------------------------------------------------------------ |
| `title` | String    | Title of the Content Card item.                              |
| `copy`  | String    | Copy of the Content Card item.                               |
| `link`  | Object    | Object containing target and href of link. See `link` below. |

### link

| Name     | Data Type | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `target` | String    | Open within current tab or new tab ('\_self' or '\_blank'). |
| `href`   | String    | Url of the Content Card item link.                          |

## Stable selectors

| Name                      | Description |
| ------------------------- | ----------- |
| `dds--featuredlink`       | Component   |
| `dds--featuredlink-group` | Component   |
| `dds--featuredlink-item`  | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
