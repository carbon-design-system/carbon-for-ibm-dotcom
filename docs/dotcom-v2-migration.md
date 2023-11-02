# Carbon for IBM.com: v2 migration guide

This document will review in detail the changes in Carbon for IBM.com v1 to v2.
Because Carbon for IBM.com v2 uses Carbon v11, which utilizes Sass modules,
there is a requirement for teams to use the
[Dart Sass package](https://sass-lang.com/dart-sass) (`sass`), as opposed to
`node-sass`. This introduces some new sass concepts such as
[`@use`](https://sass-lang.com/documentation/at-rules/use) vs
[`@import`](https://sass-lang.com/documentation/at-rules/import) and
[namespaces](https://sass-lang.com/documentation/at-rules/use#choosing-a-namespace).
For Carbon v11 migration guidance, see their
[migration guide](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md).

## List of component changes

| Component                 | Changes                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| back-to-top               | No API changes.                                                                                                                                |
| background-media          | No API changes.                                                                                                                                |
| button                    | This component is deprecated in v2 in favor for `button-expressive`                                                                            |
| button-group              | No API changes.                                                                                                                                |
| callout-with-media        | View changes [here](#callout-with-media)                                                                                                       |
| callout-quote             | View changes [here](#callout-quote)                                                                                                            |
| card                      | View changes [here](#card)                                                                                                                     |
| card-group                | View changes [here](#card-group)                                                                                                               |
| card-group-card-link-item | This component is deprecated in v2 in favor for default card or with content-item                                                              |
| card-in-card              | No API changes.                                                                                                                                |
| card-link                 | This component is deprecated in v2 in favor for [card](#card) (link variant) component                                                         |
| card-section-carousel     | This component is deprecated in v2 in favor for content-section/block component combined with carousel                                         |
| card-section-images       | This component is deprecated in v1 and has been removed in v2 in favor of the card-section component.                                          |
| card-section-simple       | This component is deprecated in v2 in facor for content-section/block component combined with card-group                                       |
| content-block-cards       | This component is deprecated in v2 in favor for content-section/block & card-group components                                                  |
| content-block-horizontal  | This component is deprecated in v2 in favor for content-section/block & content-item-horizontal components                                     |
| content-block-media       | This component is deprecated in v2 in favor for content-section/block & repeated video-player/image components                                 |
| content-block-mixed       | This component is deprecated in v2 in favor for content-section/block, video-player/image, pictogram-items, and other content-group components |
| content-block-segmented   | This component is deprecated in v2 in favor for content-section/block component                                                                |
| content-block-simple      | This component is deprecated in v2 in favor for content-section/block component                                                                |
| content-group-banner       | View changes [here](#content-group-banner)                                                                                                    |
| content-group-horizontal  | This component is deprecated in v1 and has been removed in v2 in favor of the content-block-horizontal component.                              |
| content-group-cards       | This component is deprecated in v2 in favor for content-section/block & card-group components                                                  |
| content-group-pictograms  | This component is deprecated in v2 in favor for content-section/block content-item (pictogram variant) components                              |
| content-group-simple      | This component is deprecated in v2 in favor for content-group, image, & content-item components                                                |
| content-item              | View changes [here](#content-item)                                                                                                  |
| content-item-horizontal   | View changes [here](#content-item-horizontal)                                                                                                  |
| cta                       | View changes [here](#cta)                                                                                                                      |
| cta-block                 | This component is deprecated in v2 in favor for content-section/block & content-item components                                                |
| cta-section               | This component is deprecated in v2 in favor for content-section/block & content-item components                                                |
| dotcom-shell              | No API changes.                                                                                                                                |
| feature-card-block-large  | This component is deprecated in v1 and has been removed in v2 in favor of the feature-card component.                                          |
| feature-card-block-medium | This component is deprecated in v1 and has been removed in v2 in favor of the feature-card component.                                          |
| feature-section           | View changes [here](#feature-section)                                                                                                          |
| filter-panel              | View changes [here](#filter-panel)                                                                                                             |
| footer                    | No API changes.                                                                                                                                |
| hr                        | View changes [here](#horizontal-rule)                                                                                                          |
| image                     | View changes [here](#image)                                                                                                                    |
| image-with-caption        | This component is deprecated in v1 and has been removed in v2 in favor of the image component                                                  |
| leadspace                 | View changes [here](#leadspace)                                                                                                                |
| leadspace-block           | View changes [here](#leadspace-block)                                                                                                          |
| leadspace-with-search     | View changes [here](#leadspace-with-search)                                                                                                    |
| lightbox-media-viewer     | No API changes.                                                                                                                                |
| link-list-section         | This component is deprecated in v2 in favor for content-section/block & link-list end of section variant components                            |
| link-with-icon            | No API changes.                                                                                                                                |
| logo-grid                 | This component is deprecated in v2 in favor for content-section/block & image-group components                                                 |
| pictogram-item            | This component is deprecated in v2 in favor for content-item (pictogram variation) componet                                                    |
| quote                     | No API changes.                                                                                                                                |
| search-with-typeahead     | No API changes.                                                                                                                                |
| table-of-contents         | No API changes.                                                                                                                                |
| tabs-extended-media       | This component is deprecated in v2 in favor for tabs-extended component                                                                        |
| universal-banner          | View changes [here](#universal-banner)                                                                                                         |

### Callout with media

- New options for `color-scheme` property: `REGULAR = 'regular'`,
  `INVERSE = 'inverse'` `LAYER = 'layer'`, `CYAN = 'cyan'`, `PURPLE = 'purple'`
- New callout style tokens

### Callout quote

- New options for `color-scheme` property: `REGULAR = 'regular'`,
  `INVERSE = 'inverse'`, `LAYER = 'layer'`, `CYAN = 'cyan'`, `PURPLE = 'purple'`
- New callout style tokens

### Card

- `<c4d-card-footer>`'s `icon-placement` property has been removed
- Removed `border` property, clickable cards inherit the Carbon v11 experimental
  tile border style
- New `aspect-ratio` property with '1:1', '2:1', '3:2', '4:3', and '16:9' as
  options
- New `link` property which takes the place of the deprecated `card-link`

### Card group

- Removed `outline` property
- New grid mode options: `Default` with a 32px gap, `Narrow` with a 16px gap, and `Condensed` with no gaps inbetween
- Grid mode options `Collapsed` has been replaced with `Condensed`
- Removed grid mode option `Border`
- Deprecated `card-link` option in Card group

### Content group banner

- `content-group-banner` renamed to `in-page-banner`
- New `color-scheme` property with options: `REGULAR = 'regular'`, `LAYER = 'layer'`, `CYAN = 'cyan'`, `PURPLE = 'purple'`

### Content item

- `content-item` new property `horizontal`
- `content-item` now renders different variations for `statistics`, `pictogram`, `media`, & `logo`


### Content item horizontal

- `content-item-horizontal` renamed to `content-item-row`
- All components with `content-item-horizontal-*` also renamed to `content-item-row-*`

### CTA

In Carbon for IBM.com v2, the CTA component (and all of its subcomponents) have
been deprecated in favor of their base components. All of the CTA-like features
can now be used natively within Button, Card, Feature Card, and Link with Icon.

Each new component has a `cta-type` property that can change the icon and click
functionality of the component. See the components' documentations for more
information.

### Feature section

- The `feature-section-card-link` has been deprecated in favor for the `card` (link) variation
- `media-alignment` property has been removed
- `color-scheme` property now accepts `regular` (default), `inverse`, `cyan`, `purple`

### Filter panel

- `filter-group-item` property `title-text` has been updated to `title`

### Horizontal rule

- New options for `contrast` property: `SUBTLE = 'subtle' (default)`,
  `STRONG = 'strong'` instead of `MEDIUM_CONTRAST = 'medium_contrast'`,
  `LOW_CONTRAST = 'low_contrast'`, `HIGH_CONTRAST = 'high_contrast'`

### Image

- New `lightbox-contrast` property

### Leadspace

- New `highlight` and `type-style` attributes for `leadspace-heading`

### Leadspace

- Deprecated `leadspace-block-heading` in favor for `leadspace-heading`
- Removed `leadspace-block-cta` in favor for `button`

### Leadspace with Search

- `<dds-leadspace-with-search-heading>` has been replaced with `<dds-leadspace-heading>`
- `<dds-leadspace-with-search-content-copy>` has been replaced with `<dds-leadspace-with-search-copy>`
- New highlight attribute in `dds-leadspace-heading`
- Deprecated background-media image variant
- Removed `<dds-leadspace-with-search-heading>`, `<dds-leadspace-with-search-content>`,
`<dds-leadspace-with-search-content-heading>`, `<dds-leadspace-with-search-content-copy>`

### Universal banner

- `universal-banner` renamed to `global-banner`
