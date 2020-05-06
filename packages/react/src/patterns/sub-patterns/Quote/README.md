# Quote

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/patterns/sub-patterns/quote';
```

> 💡 Only import fonts once per usage. Don't forget to import the Quote styles
> from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import { Desktop } from '@carbon/pictograms-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Quote } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  const copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  const cta = {
    type: 'local',
    href: 'https://www.example.com',
    copy: 'Lorem ipsum dolor',
  };

  const source = {
    heading: 'lorem ipsum',
    copy: 'dolor sit amet',
  };

  return <Quote copy={copy} cta={cta} source={source} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the quote styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Props

| Name      | Required | Data Type | Default Value  | Description                                                                                                                                             |
| --------- | -------- | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copy`    | YES      | String    | null           | Main Quote                                                                                                                                              |
| `type`    | NO       | String    | `doubleCurved` | See `Types` bellow.                                                                                                                                     |
| `source`  | NO       | Object    | null           | See `Source` bellow.                                                                                                                                    |
| `cta`     | NO       | Object    | null           | Object with CTA data, check [CTA](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA/README.md)👀 |
| `inverse` | NO       | Boolean   | false          | Toggles the invese colors                                                                                                                               |

## Types

| Name                          | Description |
| ----------------------------- | ----------- |
| `singleCurved`                | ‘ ’         |
| `doubleCurved`                | “ ”         |
| `singleAngle`                 | ‹ ›         |
| `doubleAngle`                 | « »         |
| `lowHighReversedDoubleCurved` | „ “         |

## Source

| Name      | Required | Data Type | Default Value | Description      |
| --------- | -------- | --------- | ------------- | ---------------- |
| `heading` | YES      | String    | null          | Source heading   |
| `copy`    | YES      | String    | null          | Source body text |

## Stable selectors

| Name                 | Description                         |
| -------------------- | ----------------------------------- |
| `dds--quote`         | Quote wrapper element.              |
| `dds--quote__copy`   | Main Quote body text                |
| `dds--quote__source` | Quote source title and body wrapper |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
