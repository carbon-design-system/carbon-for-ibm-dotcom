# Carbon for IBM.com: v2 migration guide

This document will review in detail the changes in Carbon for IBM.com v1 to
v2. Because Carbon for IBM.com v2 uses Carbon v11, which utilizes Sass
modules, there is a requirement for teams to use the
[Dart Sass package](https://sass-lang.com/dart-sass) (`sass`), as opposed to
`node-sass`. This introduces some new sass concepts such as
[`@use`](https://sass-lang.com/documentation/at-rules/use) vs
[`@import`](https://sass-lang.com/documentation/at-rules/import) and
[namespaces](https://sass-lang.com/documentation/at-rules/use#choosing-a-namespace).
For Carbon v11 migration guidance, see their
[migration guide](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md).

## List of component changes

| Component                 | Changes                                |
| ------------------------- | -------------------------------------- |
| back-to-top               | View changes [here](#backtotop)        |
| background-media          | No API changes.                        |
| button                    | This component is deprecated in v2 in favor for Carbon's core Button |
| callout-quote             | View changes [here](#callout-quote)          |
| card-group-card-link-item | This component is deprecated in v2 in favor for default card or with content-item |
| card-link                 | This component is deprecated in v2 in favor for card (link variant) component |
| card-section-carousel     | This component is deprecated in v2 in favor for content-section/block component combined with carousel |
| card-section-simple       | This component is deprecated in v2 in facor for content-section/block component combined with card-group |
| content-block-cards       | This component is deprecated in v2 in favor for content-section/block & card-group components |
| content-block-horizontal  | This component is deprecated in v2 in favor for content-section/block & content-item-horizontal components|
| content-block-media       | This component is deprecated in v2 in favor for content-section/block & repeated video-player/image components
| content-block-mixed       | This component is deprecated in v2 in favor for content-section/block, video-player/image, pictogram-items, and other content-group components |
| content-block-segmented   | This component is deprecated in v2 in favor for content-section/block component |
| content-block-simple      | This component is deprecated in v2 in favor for content-section/block component |
| content-group-cards       | This component is deprecated in v2 in favor for content-section/block & card-group componets |
| content-group-pictograms  | This component is deprecated in v2 in favor for content-section/block content-item (pictogram variant) components |
| content-group-simple      | This component is deprecated in v2 in favor for content-group, image, & content-item components |
| cta-block                 | This component is deprecated in v2 in favor for content-section/block & content-item components |
| cta-section               | This component is deprecated in v2 in favor for content-section/block & content-item components |
| image                     | View changes [here](#image)            |
| image-with-caption        | Replaced by `image`                    |
| link-list-section         | This component is deprecated in v2 in favor for content-section/block & link-list end of section variant components |
| logo-grid                 | This component is deprecated in v2 in favor for content-section/block & image-group components |
| pictogram-item            | This component is deprecated in v2 in favor for content-item (pictogram variation) componet |
| tabs-extended-media       | This component is deprecated in v2 in favor for tabs-extended component |


### BackToTop

- 

### Callout quote

- new options for `color-scheme` property: `REGULAR = ''`, `GRAY10 = 'gray10'`, `CYAN = 'cyan'`, `PURPLE = 'purple'`
- new callout style tokens

### Image

- New `lightbox-contrast` property