# CTA Section

> The CTASection pattern is to be utilized within IBM.com. See
> [CardSection](https://github.com/mkothur/ibm-dotcom-library/blob/master/packages/react/src/patterns/sections/CTASection/README.md)👀

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

@import '@carbon/ibmdotcom-styles/scss/patterns/sections/ctasection/index';
```

> 💡 Only import fonts once per usage. Don't forget to import the CTA Section
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

#### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTASection } from '@carbon/ibmdotcom-react';

import 'yourapplication.scss';

const ctaProps = {
  style: 'button',
  type: 'local',
  buttons: [
    {
      type: 'local',
      copy: ['Contact sales'],
    },
  ],
};

const contentBlockProps = {
  heading: 'Take the next step',
  copy: `Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.`,
};

const contentItemsProps = [
  {
    heading: 'Get connected',
    copy: `
      IBM DevOps partners have a wide range of expertise.
      Find one to build the right solution for you.
      `,
    cta: {
      copy: 'Find a partner',
      type: 'local',
      href: 'https://example.com/',
    },
  },
  {
    heading: 'Learn how',
    copy: 'Dig into more self-directed learning about DevOps methodologies.',
    cta: {
      copy: 'Browse tutorials',
      type: 'local',
      href: 'https://example.com/',
    },
  },
];

function App() {
  return (
    <CTASection
      {...contentBlockProps}
      cta={ctaProps}
      items={contentItemsProps}
    />
  );
}
ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line in your `.env` file at the root of your project.
[See more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage).

```
  SASS_PATH=node_modules:src
```

## Props

| Name            | Required | Data Type | Default Value | Description                                                                                                                                               |
| --------------- | -------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading`       | YES      | String    | n/a           | The heading for the CTA Section pattern                                                                                                                   |
| `copy`          | YES      | Markdown  | n/a           | The copy for the CTA Section pattern                                                                                                                      |
| `cta`           | YES      | CTA       | n/a           | See [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA#cta)                                   |
| `items`         | YES      | Array     | n/a           | See [ContentItem](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/internal/components/ContentItem#content-item) |
| `items.heading` | YES      | String    | n/a           | The heading for the content item                                                                                                                          |
| `items.copy`    | YES      | Markdown  | n/a           | The copy for the content item                                                                                                                             |
| `items.cta`     | YES      | CTA       | n/a           | See [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA#cta)                                   |
| `theme`         | NO       | String    | 'g10'         | Color theme for pattern. See `themes` below                                                                                                               |

### themes (optional)

| Name    | Data Type | Description           |
| ------- | --------- | --------------------- |
| `white` | String    | Carbon White theme    |
| `g10`   | String    | Carbon Gray 10 theme  |
| `g90`   | String    | Carbon Gray 90 theme  |
| `g100`  | String    | Carbon Gray 100 theme |

## Stable selectors

| Name               | Description |
| ------------------ | ----------- |
| `dds--cta-section` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
