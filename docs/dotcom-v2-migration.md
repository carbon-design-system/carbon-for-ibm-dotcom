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
| button                    | This component is deprecated in v2 in favor for Carbon's core Button                                                                           |
| button-group              | No API changes.                                                                                                                                |
| callout-with-media        | View changes [here](#callout-with-media)                                                                                                       |
| callout-quote             | View changes [here](#callout-quote)                                                                                                            |
| card                      | View changes [here](#card)                                                                                                                     |
| card-group-card-link-item | This component is deprecated in v2 in favor for default card or with content-item                                                              |
| card-link                 | This component is deprecated in v2 in favor for [card](#card) (link variant) component                                                         |
| card-section-carousel     | This component is deprecated in v2 in favor for content-section/block component combined with carousel                                         |
| card-section-simple       | This component is deprecated in v2 in facor for content-section/block component combined with card-group                                       |
| content-block-cards       | This component is deprecated in v2 in favor for content-section/block & card-group components                                                  |
| content-block-horizontal  | This component is deprecated in v2 in favor for content-section/block & content-item-horizontal components                                     |
| content-block-media       | This component is deprecated in v2 in favor for content-section/block & repeated video-player/image components                                 |
| content-block-mixed       | This component is deprecated in v2 in favor for content-section/block, video-player/image, pictogram-items, and other content-group components |
| content-block-segmented   | This component is deprecated in v2 in favor for content-section/block component                                                                |
| content-block-simple      | This component is deprecated in v2 in favor for content-section/block component                                                                |
| content-group-cards       | This component is deprecated in v2 in favor for content-section/block & card-group components                                                  |
| content-group-pictograms  | This component is deprecated in v2 in favor for content-section/block content-item (pictogram variant) components                              |
| content-group-simple      | This component is deprecated in v2 in favor for content-group, image, & content-item components                                                |
| cta                       | View changes [here](#cta)                                                                                                                      |
| cta-block                 | This component is deprecated in v2 in favor for content-section/block & content-item components                                                |
| cta-section               | This component is deprecated in v2 in favor for content-section/block & content-item components                                                |
| footer                    | No API changes.                                                                                                                                |
| hr                        | View changes [here](#horizontal-rule)                                                                                                          |
| image                     | View changes [here](#image)                                                                                                                    |
| image-with-caption        | Replaced by `image`                                                                                                                            |
| link-list-section         | This component is deprecated in v2 in favor for content-section/block & link-list end of section variant components                            |
| logo-grid                 | This component is deprecated in v2 in favor for content-section/block & image-group components                                                 |
| pictogram-item            | This component is deprecated in v2 in favor for content-item (pictogram variation) componet                                                    |
| quote                     | No API changes.                                                                                                                                |
| search-with-typeahead     | No API changes.                                                                                                                                |
| table-of-contents         | No API changes.                                                                                                                                |
| tabs-extended-media       | This component is deprecated in v2 in favor for tabs-extended component                                                                        |

### Callout with media

- New options for `color-scheme` property: `REGULAR = 'regular'`,
  `INVERSE = 'inverse'` `LAYER = 'layer'`, `CYAN = 'cyan'`, `PURPLE = 'purple'`
- New callout style tokens

### Callout quote

- New options for `color-scheme` property: `REGULAR = 'regular'`,
  `INVERSE = 'inverse'` `LAYER = 'layer'`, `CYAN = 'cyan'`, `PURPLE = 'purple'`
- New callout style tokens

### Card

- `<dds-card-footer>` has `icon-placement` property has been removed
- Removed `border` property, clickable cards inherit the Carbon v11 experimental
  tile border style
- New `aspect-ratio` property with '1:1', '2:1', '3:2', '4:3', and '16:9' as
  options
- New `link` property which takes the place of the deprecated `card-link`

### CTA

In Carbon for IBM.com v2, the CTA component (and all of its subcomponents) have
been deprecated in favor of their base components. All of the CTA-like features
can now be used natively within Button, Card, Feature Card, and Link with Icon.

Each new component has a `cta-type` property that can change the icon and click
functionality of the component. See the components' documentations for more
information.

### Horizontal rule

- New options for `contrast` property: `SUBTLE = 'subtle' (default)`,
  `STRONG = 'strong'` instead of `MEDIUM_CONTRAST = 'medium_contrast'`,
  `LOW_CONTRAST = 'low_contrast'`, `HIGH_CONTRAST = 'high_contrast'`

### Image

- New `lightbox-contrast` property
