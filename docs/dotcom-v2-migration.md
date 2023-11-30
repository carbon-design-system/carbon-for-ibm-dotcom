# Carbon for IBM.com: v2 migration guide

This document will review in detail the changes in Carbon for IBM.com v1 to v2.

## Global changes

Carbon for IBM.com v2 uses Carbon v11, which utilizes
[Dart Sass](https://sass-lang.com/dart-sass) (`sass`), as opposed to
`node-sass`. This introduces some new Sass features such as
[`@use`](https://sass-lang.com/documentation/at-rules/use) and
[`@forward`](https://sass-lang.com/documentation/at-rules/forward) keywords
([`@import`](https://sass-lang.com/documentation/at-rules/import) is no longer
used), and
[namespaces](https://sass-lang.com/documentation/at-rules/use#choosing-a-namespace).
For Carbon v11 migration guidance, see their
[migration guide](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md).

## Components

| Component                 | Changes                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| back-to-top               | No API changes.                                                                                                                                            |
| background-media          | No API changes.                                                                                                                                            |
| button-expressive         | Deprecated in favor of `button`.                                                                                                                           |
| button-group              | No API changes.                                                                                                                                            |
| callout-with-media        | View [changes](#callout-with-media).                                                                                                                       |
| callout-quote             | View [changes](#callout-quote).                                                                                                                            |
| card                      | View [changes](#card).                                                                                                                                     |
| card-group                | View changes [here](#card-group)                                                                                                                           |
| card-group-card-link-item | Deprecated in favor of [card](#card) or [content-item](#content-item).                                                                                     |
| card-in-card              | No API changes.                                                                                                                                            |
| card-link                 | Deprecated in favor of [card](#card) (link variant).                                                                                                       |
| card-section-carousel     | Deprecated in favor of `content-section` or `content-block` combined with `carousel`.                                                                      |
| card-section-images       | Removed - use `card-section`.                                                                                                                              |
| card-section-simple       | Deprecated in favor of `content-section` or `content-block` combined with `card-group`.                                                                    |
| carousel                  | No API changes.                                                                                                                                            |
| content-block-cards       | Deprecated in favor of `content-section` or `content-block` combined with `card-group`.                                                                    |
| content-block-horizontal  | Deprecated in favor of `content-section` or `content-block` combined with `content-item-horizontal`.                                                       |
| content-block-media       | Deprecated in favor of `content-section` or `content-block` combined with `video-player`/`image` components.                                               |
| content-block-mixed       | Deprecated in favor of `content-section` or `content-block` combined with `video-player`/`image`, `pictogram-items`, and other `content-group` components. |
| content-block-segmented   | Deprecated in favor of `content-section` or `content-block`.                                                                                               |
| content-block-simple      | Deprecated in favor of `content-section` or `content-block`.                                                                                               |
| content-group-banner      | View [changes](#content-group-banner).                                                                                                                     |
| content-group-horizontal  | Removed - use `content-block-horizontal`.                                                                                                                  |
| content-group-cards       | Deprecated in favor of `content-section` or `content-block` combined with `card-group`.                                                                    |
| content-group-pictograms  | Deprecated in favor of `content-section` or `content-block` combined with `content-item` (pictogram variant).                                              |
| content-group-simple      | Deprecated in favor of `content-section` or `content-block` combined with `content-item`.                                                                  |
| content-item              | View [changes](#content-item)                                                                                                                              |
| content-item-horizontal   | View [changes](#content-item-horizontal)                                                                                                                   |
| cta                       | View [changes](#cta)                                                                                                                                       |
| cta-block                 | Deprecated in favor of `content-section` or `content-block` combined with `content-item`.                                                                  |
| cta-section               | Deprecated in favor of `content-section` or `content-block` combined with `content-item`.                                                                  |
| dotcom-shell              | No API changes.                                                                                                                                            |
| feature-card              | View [changes](#feature-card).                                                                                                                             |
| feature-card-block-large  | Removed - use [`feature-card`](#feature-card).                                                                                                             |
| feature-card-block-medium | Removed - use [`feature-card`](#feature-card).                                                                                                             |
| feature-section           | View [changes](#feature-section).                                                                                                                          |
| filter-panel              | View [changes](#filter-panel).                                                                                                                             |
| footer                    | No API changes.                                                                                                                                            |
| horizontal-rule           | View [changes](#horizontal-rule).                                                                                                                          |
| image                     | View [changes](#image).                                                                                                                                    |
| image-with-caption        | Removed - use `image` component.                                                                                                                           |
| leadspace                 | View [changes](#leadspace).                                                                                                                                |
| leadspace-block           | View [changes](#leadspace-block).                                                                                                                          |
| leadspace-with-search     | View [changes](#leadspace-with-search).                                                                                                                    |
| lightbox-media-viewer     | No API changes.                                                                                                                                            |
| link-list                 | View [changes](#link-list).                                                                                                                                |
| link-with-icon            | No API changes.                                                                                                                                            |
| logo-grid                 | Deprecated in favor of `content-section` or `content-block` combined with `image-group`.                                                                   |
| pictogram-item            | Deprecated in favor of `content-item` (pictogram variation).                                                                                               |
| quote                     | View [changes](#quote).                                                                                                                                    |
| scroll-animations         | No API changes.                                                                                                                                            |
| search-with-typeahead     | No API changes.                                                                                                                                            |
| table-of-contents         | No API changes.                                                                                                                                            |
| tabs-extended             | View [changes](#tabs-extended)                                                                                                                             |
| tabs-extended-media       | Deprecated in favor of [`tabs-extended`](#tabs-extended).                                                                                                  |
| tag-group                 | Deprecated in favor of wrapping Carbon `tag` in a parent container.                                                                                        |
| tag-link                  | Deprecated in favor of Carbon `tag`.                                                                                                                       |
| universal-banner          | View [changes](#universal-banner)                                                                                                                          |

### Callout with media

- New options for `color-scheme` property: `regular`, `inverse` `layer`, `cyan`,
  `purple`
- New callout style tokens

### Callout quote

- New options for `color-scheme` property: `regular`, `inverse` `layer`, `cyan`,
  `purple`
- New callout style tokens

### Card

- The `card-footer` `icon-placement` property has been removed
- Removed `border` property - clickable cards inherit the Carbon v11
  experimental tile border style
- New `aspect-ratio` property with `1:1`, `2:1`, `3:2`, `4:3`, and `16:9` as
  options
- New `link` property which takes the place of the deprecated `card-link`

### Card group

- Removed `outline` property
- New grid mode options: `Default` with a 32px gap, `Narrow` with a 16px gap,
  and `Condensed` with no gaps inbetween
- Grid mode options `Collapsed` has been replaced with `Condensed`
- Removed grid mode option `Border`
- Deprecated `card-link` option in Card group

### Content group banner

- `content-group-banner` renamed to `in-page-banner`
- New options for `color-scheme` property: `regular`, `inverse` `layer`, `cyan`,
  `purple`

### Content item

- `content-item` new property `horizontal`
- `content-item` now renders different variations for `statistics`, `pictogram`,
  `media`, and `logo`

### Content item horizontal

- `content-item-horizontal` renamed to `content-item-row`
- `content-item-horizontal-*` renamed to `content-item-row-*`

### CTA

In Carbon for IBM.com v2, `cta` and all subcomponents have been deprecated in
favor of their base components. All CTA-like features can now be used natively
within `button`, `card`, `feature-card`, and `link-with-icon`.

Each new component has a `cta-type` property that can change the icon and
behavior of the component. See the components' documentation for more
information.

### Feature card

- Enable support for both `regular` and `inverse` values for `color-scheme`
  property

### Feature section

- The `feature-section-card-link` has been deprecated in favor of the `card`
  (link) variation
- `media-alignment` property has been removed
- `color-scheme` property now accepts `regular` (default), `inverse`, `cyan`,
  `purple`

### Filter panel

- `filter-group-item` property `title-text` has been updated to `title`

### Horizontal rule

- New options for `contrast` property: `subtle` (default), `strong` (replaces
  `medium_contrast`), `low_contrast`, `high_contrast`

### Image

- New `lightbox-contrast` property

### Leadspace

- New `highlight` and `type-style` attributes for `leadspace-heading`

### Leadspace

- Deprecated `leadspace-block-heading` in favor of `leadspace-heading`
- Removed `leadspace-block-cta` in favor of `button`

### Leadspace with Search

- `leadspace-with-search-heading` has been replaced with `leadspace-heading`
- `leadspace-with-search-content-copy` has been replaced with
  `leadspace-with-search-copy`
- New highlight attribute in `dds-leadspace-heading`
- Deprecated `background-media` image variant
- Removed `leadspace-with-search-heading`, `leadspace-with-search-content`,
  `leadspace-with-search-content-heading`, `leadspace-with-search-content-copy`

### Link list

- The `default` section has taken the design specs of `end of section`. As a
  result, `end of section` has been removed. In addition to this, the following
  components have been replaced:
- `link-list-item-card` has been replaced with `link-list-item`
- `link-list-item-card-cta` has been replaced with `link-list-item-cta`

### Quote

- Removed `color-scheme` `inverse` option in favor of `callout-quote (inverse)`

### Tabs extended

- `vertical` variant has been deprecated
- `contained` type has been added

### Universal banner

- `universal-banner` renamed to `global-banner`
