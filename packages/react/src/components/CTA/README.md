# CTA

> The CTA component will be used to select different cta types pages.

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

> 💡 Only import fonts once per usage. Don't forget to import the CTA styles
> from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Text Link

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTA } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <CTA
      style="text"
      type="local"
      copy="IBM Homepage"
      href="https://www.example.com"
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### Video Link

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTA } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <CTA
      style="text"
      type="video"
      media={{
        src: '0_uka1msg4',
        type: 'video',
      }}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### Feature Card

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTA } from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';
import 'yourapplication.scss';

function App() {
  return (
    <CTA
      style="feature"
      type="local"
      heading="Lorem Ipsum"
      image: {{
        defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
        alt: 'Image alt text'
      }}
      cta={{
        href: 'https://www.example.com',
        icon: {
          src: ArrowRight20
        }
      }}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### Button(s)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTA } from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';
import 'yourapplication.scss';

function App() {
  return (
    <CTA
      style="feature"
      type="local"
      heading="Lorem Ipsum"
      buttons={[
        {
          type: 'video',
          href: 'https://www.example.com',
          copy: 'Lorem Ipsum',
          media: {
            src: '0_uka1msg4',
            type: 'video',
          },
        },
        {
          type: 'external',
          href: 'https://www.example.com',
          copy: 'Lorem Ipsum',
          renderIcon: ArrowRight20,
        },
      ]}
    />
  );
}
```

### Card

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CTA } from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';
import 'yourapplication.scss';

function App() {
  return (
    <CTA
      style="card"
      type="local"
      copy="Lorem Ipsum"
      cta={{
        href: 'https://www.example.com',
      }}
    />
  );
}

function AppVideo() {
  return (
    <CTA
      style="card"
      type="video"
      copy="Lorem Ipsum"
      media={{
        src: '0_uka1msg4',
        type: 'video',
      }}
    />
  );
}
```

## Resolving Dependencies

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the image styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name    | Required | Data Type | Default Value | Description                                                    |
| ------- | -------- | --------- | ------------- | -------------------------------------------------------------- |
| `style` | YES      | String    | text          | Describes style type, for more information see `Styles` below. |
| `type`  | YES      | String    | local         | Describes icon type, for more information see `Types` below.   |

## Styles

| Style     | Component Name | Description                                                                                                                                                      |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`    | LinkWithIcon   | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/components-link-with-icon--default)!👀         |
| `button`  | ButtonGroup    | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/patterns-sub-patterns-buttongroup--default)!👀 |
| `card`    | Card           | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/patterns-sub-patterns-card--link)!👀           |
| `feature` | FeatureCard    | Use their props here. For more details [see here](https://ibmdotcom-react-experimental.mybluemix.net/?path=/story/patterns-sub-patterns-card--link)!👀           |

## Types

| Type       | SVG element Name | Description                                                                                            |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page. For more details click `Icons` below.          |
| `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target. For more details click `Icons` below.       |
| `external` | Launch20         | Describes launch arrow onClick which loads in new tab. For more details click `Icons` below.           |
| `video`    | PlayOutline20    | Describes play icon onClick which loads the video in a lightbox. For more details click `Icons` below. |

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
