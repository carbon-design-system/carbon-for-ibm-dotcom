# @carbon/ibmdotcom-react

> A collection of IBM.com components and patterns implemented using
> [React](https://reactjs.org/) and
> [Carbon](https://www.carbondesignsystem.com/).

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm i @carbon/ibmdotcom-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/ibmdotcom-react
```

> NOTE: Carbon dependencies will be managed by the IBM.com Library starting in
> `v1.3.0`. For earlier versions, Carbon dependencies will have to be installed
> separately:
>
> ```bash
> yarn add carbon-components carbon-components-react carbon-icons
> ```

1. These components require the use of [Webpack](https://webpack.js.org/) in
   your project. See our
   [`webpack.config.js`](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/.storybook/webpack.config.js)
   for an example configuration.

2. Components do not import any of the styles themselves, use the scss or css
   from `@carbon/ibmdotcom-styles` to bring in styling.

### Styles

Styles are in a separate package entirely, as they are considered to be
framework agnostic and can be used with any framework.
[Learn how to include styles here](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles/README.md).

## Usage

### List of Available Components

View available React Components [here](https://ibmdotcom-react.mybluemix.net).
You can see usage information in several ways:

1. Clicking the **DOCS** tab in the top of the selected component. You can see
   the list of available React props as well as how to use in your project.
2. Clicking the **STORY** tab at the bottom. This tab contains the code that
   shows how the component is being used
3. Clicking the **KNOBS** tab at the bottom and changing values there. Most
   knobs are shown as something like `Button kind (kind)`, where `kind` is the
   name of React prop
4. Clicking the **CARBON THEME** tab at the bottom and interacting with the
   selected component. You can see what the component looks like in the four
   available Carbon themes (NOTE: not all components are available in all
   themes).

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
