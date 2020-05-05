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
```

> 💡 Only import fonts once per usage. Don't forget to import the Footer styles
> from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';
import '@carbon/ibmdotcom-styles/scss/components/footer/index.scss';

function App() {
  return <Footer />;
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

## Props

| Name                  | Required | Data Type | Default Value | Description                                                                                                                                                  |
| --------------------- | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                | NO       | String    | null          | Type of Footer. See below `Types`.                                                                                                                           |
| `navigation`          | NO       | Object    | null          | Navigation data object for Footer, used for server-side rendering                                                                                            |
| `langCode`            | NO       | Object    | null          | Language code for fetching the display name                                                                                                                  |
| `disableLocaleButton` | NO       | Boolean   | false         | Disables the Locale button                                                                                                                                   |
| `languageOnly`        | NO       | Boolean   | false         | Switches the locale button with a language dropdown (experimental)                                                                                           |
| `languageItems`       | NO       | Array     | null          | Array of items for the language dropdown, utilizes the [Carbon ComboBox](https://react.carbondesignsystem.com/?path=/story/combobox--default) (experimental) |
| `languageInitialItem` | NO       | Object    | first item    | Sets the initial value when the component is loaded (experimental)                                                                                           |
| `languageCallback`    | NO       | Function  | null          | Callback function onChange of the language dropdown (experimental)                                                                                           |

### Types (optional)

| Name    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| `tall`  | Default footer variant includes additional navigation taking up more space. |
| `short` | Short footer variant reduces space by removing any additional navigation.   |

### Navigation data

If setting the navigation data manually, examples can be seen here based on
type:

- [Tall](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/Footer/__data__/footer-menu.json)
- [Short](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/Footer/__data__/footer-thin.json)

### Language Dropdown (experimental)

The option to use a language dropdown is available in lieu of the locale
button/selector. This can be activated using the following feature flag:

```bash
DDS_LANGUAGE_SELECTOR=true
```

Example implementation:

```javascript
const items = [
  { id: 'da', text: 'Danish / Dansk' },
  { id: 'nl', text: 'Dutch / Nederlands' },
  { id: 'en', text: 'English' },
];

function myLanguageCallback(selectedItem) {
  console.log(selectedItem); // { "id": "en", "text": "English" }
}

function App() {
  return (
    <Footer
      languageOnly={true}
      languageItems={items}
      languageInitialItem={items[2]}
      languageCallback={myLanguageCallback}
    />
  );
}
```

> See
> [feature-flags.md](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/feature-flags.md)
> and
> [.env.example](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/.env.example)
> for more information

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
| `dds--language-selector`      | Component   |

## CORS Proxy

This component makes cross-origin requests to `www.ibm.com`, which will require
a cors proxy to be configured to make successful calls from a lower environment.

A cors proxy can be configured using the following
[environment variable](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

> NOTE: The `CORS_PROXY` is not necessary when publishing to production
> (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it
> unconfigured when pushing your application to production.

## Server Side Rendering

To server side render the footer, the `Translation` service call needs to be
made to retrieve navigation links. Make sure to pass in the `lc` and `cc` values
as shown in the example below.

```javascript
import { TranslationAPI } from '@carbon/ibmdotcom-services';
import { Footer } from '@carbon/ibmdotcom-react';

server.get('/', async (req, res) => {
  const langCode = { lc: 'en', cc: 'us' };
  const response = await TranslationAPI.getTranslation(langCode);
  const body = renderToString(
    <Footer navigation={response} langCode={langCode} />
  );
  res.send(body);
});
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
