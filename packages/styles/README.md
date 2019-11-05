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
@import 'node_modules/@carbon/ibmdotcom-styles/src/scss/globals/_fonts.scss';
@import 'node_modules/@carbon/ibmdotcom-styles/src/scss/components/footer/footer';
```

Only import the `_fonts.scss` file once to reduce load time

In Webpack, the full package can also be included to the root of your
application:

```javascript
import '@carbon/ibmdotcom-styles';
```

## Documentation

- See our documentation site [here](https://carbonforibm-website.mybluemix.net)
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
