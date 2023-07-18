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

### BackToTop

- 