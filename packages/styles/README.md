# @carbon/ibmdotcom-styles

A single, shared CSS resource for the IBM.com Library.

## Getting started

To install `@carbon/ibmdotcom-styles` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm i @carbon/ibmdotcom-styles
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/ibmdotcom-styles
```

## Usage

Import the package css into the top of your main CSS file.

```css
@import '@carbon/ibmdotcom-styles/scss/components/footer/footer';
```

In Webpack, the full package can also be included to the root of your
application:

```javascript
import '@carbon/ibmdotcom-styles';
```

💡 There may be times pathing errors are encountered when importing certain
stylesheets. We're working hard to fix these, but in the meantime you can add
the following to your `.env` file to resolve:

```
SASS_PATH=node_modules:src
```

💡 If importing `carbon-components.min.css`, remember to import our CSS after
it.

## Expressive Theme

In addition to styles for IBM.com Library components and patterns, this package
includes the
[expressive theme](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles/scss/themes/expressive)
for all Carbon components. To see a storybook output of the Carbon components
with the expressive theme applied, run the following command:

```bash
$ yarn storybook
```

This can also be viewed [here](https://carbon-expressive.mybluemix.net).

## Documentation

- See our documentation site [here](https://ibm-dotcom-library.mybluemix.net)
  for full how-to docs and guidelines
- [Contributing](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md):
  Guidelines for making contributions to this repo.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/.github/CONTRIBUTING.md)
and our
[Developer Guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/developing.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/LICENSE).
