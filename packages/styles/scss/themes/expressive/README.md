### SCSS

#### Usage

This includes the expressive theme that would be applied to all Carbon
components, as well as adjustments to the core type scale for IBM.com Library
components and patterns.

```css
@import '@carbon/ibmdotcom-styles/scss/themes/expressive/index';
```

#### Feature Flag

This functionality is currently behind a feature flag. This can be set using the
following:

```scss
$dds-feature-flags: (
  carbon-expressive: true,
);

// application imports and styles
```
