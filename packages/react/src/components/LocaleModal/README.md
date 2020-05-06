# Locale Modal

> The locale modal allows users to change geographic regions and translate pages
> to those region languages, if available.

## Getting started

Here's a quick example to get you started.

##### CSS

```css
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
@import '@carbon/ibmdotcom-styles/scss/components/local-modal/_locale-modal.scss';
```

> 💡 Only import fonts once per usage. Don't forget to import the LocaleModal
> styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

##### JS

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleModal } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return <LocaleModal />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Add the following line on your `.env` file at the root of your project,
[see more details](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles#usage)

```
  SASS_PATH=node_modules:src
```

> 💡 Don't forget to import the footer styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

## Setting the current page language

The current page language is based on the `lang` attribute in `<html>`:

```html
<html lang="[language code]-[country code]"></html>
```

See
[Building for IBM.com](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/building-for-ibm-dotcom.md#page-language)
for more details.

See how to
[Configure Available Languages](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/building-for-ibm-dotcom.md#page-language#configuring-available-languages).

## Options

| Name     | Description                  |
| -------- | ---------------------------- |
| `isOpen` | Set initial modal open state |

> 💡 Props default to English if not provided. See Carbon's
> [composed modal](http://react.carbondesignsystem.com/?path=/story/composedmodal--using-child-nodes)
> for a complete list of configurations.

## Stable selectors

| Name                                   | Description |
| -------------------------------------- | ----------- |
| `dds--locale-modal`                    | Component   |
| `dds--locale-modal__geo-btn-${region}` | Interactive |
| `dds--locale-modal__filter`            | Interactive |
| `dds--locale-modal__region-back`       | Interactive |

## CORS Proxy

This component makes cross-origin requests to `www.ibm.com`, which will require
a cors proxy to be configured to make successful calls from a lower environment.

A cors proxy can be configured using the following
[environment variable](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

> NOTE: The `CORS_PROXY` is not necessary when publishing to production
> (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it
> unconfigured when pushing your application to production.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
