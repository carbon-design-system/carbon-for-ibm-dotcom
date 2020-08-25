# Expressive Theme for Carbon

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

### CSS Custom Properties

In order for the expressive theme to work, CSS Custom Properties needs to be
enabled. This needs to be introduced before any other imports:

```scss
$feature-flags: (
  enable-css-custom-properties: true,
);
```

This can also be added in webpack configurations:

```javascript
const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [path.resolve(__dirname, '..', 'node_modules')],
    data: `
        $feature-flags: (
          enable-css-custom-properties: true
        );
      `,
    sourceMap: true,
  },
};
```

### CSS Import

This includes the expressive theme that would be applied to all Carbon
components, as well as adjustments to the core type scale for IBM.com Library
components and patterns.

```css
@import '@carbon/ibmdotcom-styles/scss/themes/expressive/index';
```

## Expressive Theme and the IBM.com Library

This functionality is currently enabled by the import above. This theme will
become enabled by default in the IBM.com Library starting in `v1.10.0`.

## Learn More

To read more about the expressive theme, visit
https://www.ibm.com/standards/web/guidelines/expressive-theme.
