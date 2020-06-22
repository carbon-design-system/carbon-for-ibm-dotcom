# Carbon Expressive Theme

## Usage

This includes the expressive theme that would be applied to all Carbon
components, as well as adjustments to the core type scale for IBM.com Library
components and patterns.

```css
@import '@carbon/ibmdotcom-styles/scss/themes/expressive/index';
```

## Feature Flag

This functionality is currently behind a feature flag. This also utilizes CSS
Custom Properties in Carbon, which is also behind a feature flag.

This can be set using the following:

```scss
$feature-flags: (
  enable-css-custom-properties: true,
);
$dds-feature-flags: (
  carbon-expressive-experimental: true,
);

// application imports and styles
```

Alternatively, if using Webpack, this can be applied in `sass-loader`:

```javascript
...
{
  loader: 'sass-loader',
  options: {
    data: `
      $feature-flags: (
        enable-css-custom-properties: true
      );
      $dds-feature-flags: (
        carbon-expressive-experimental: true,
      );
    `,
    // other sass-loader options
  },
},
...
```

NOTE: Minimum of `carbon-components@10.7.0` is required.
