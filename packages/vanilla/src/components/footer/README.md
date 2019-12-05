# Footer

> The footer component is a required navigational pattern for IBM.com that
> displays consistently at the bottom of each page.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();

import '@carbon/ibmdotcom-styles/scss/components/footer/index.scss';
```

> 💡 Only import font's once per usage

```javascript
import { Footer } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

console.log(
  footer({
    type: '', // tall | short
  })
);
```

> 💡 Don't forget to import the footer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

### Initialize

> Init example below

```javascript
import { Accordion } from 'carbon-components';
import { globalInit } from '@carbon/ibmdotcom-services';

class Footer {
  static init(El) {
    globalInit();

    if (El) {
      Accordion.create(El);
    }
  }
}
```

## Props

| Name         | Required | Data Type | Default Value | Description                        |
| ------------ | -------- | --------- | ------------- | ---------------------------------- |
| `footerMenu` | NO       | Object    | null          | Navigation data object for Footer  |
| `footerThin` | NO       | Object    | null          | Legal Nav data object for Footer   |
| `type`       | NO       | String    | null          | Type of Footer. See below `types`. |

### types (optional)

| Name    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| `tall`  | Default footer variant includes additional navigation taking up more space. |
| `short` | Short footer variant reduces space by removing any additional navigation.   |

## Stable selectors

| Name                          | Description |
| ----------------------------- | ----------- |
| `dds--footer`                 | Component   |
| `dds--footer-nav`             | Component   |
| `dds--footer-nav-group`       | Component   |
| `dds--footer-nav-group__link` | Interactive |
| `dds--footer-logo`            | Component   |
| `dds--footer-logo__link`      | Interactive |
| `dds--footer-locale-btn`      | Interactive |
| `dds--legal-nav`              | Component   |
| `dds--legal-nav__link`        | Interactive |
| `dds--locale-modal`           | Component   |

## Fetch Navigation Data

In order to fetch navigation data you need to make the service call (by creating
a static async function) and then apply the template literal (footerTemplate)

```javascript
import { TranslationAPI, LocaleAPI } from '@carbon/ibmdotcom-services';
import footerTemplate from './footer.template';

static async getFooterWithData(type) {
  const lang = LocaleAPI.getLang();
  const response = await TranslationAPI.getTranslation(lang);

  return footerTemplate({
    type,
    footerMenu: response.footerMenu,
    footerThin: response.footerThin,
  });
}
}

```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
