# Carbon for IBM.com Release Schedule

This is a living document outlining the plan for previous, current, and future
major versions of the Carbon for IBM.com library.

| Release | Status      | Initial release | Begin Active | Begin Maintenance | End of life |
| ------- | ----------- | --------------- | ------------ | ----------------- | ----------- |
| `main`  | unstable    | unstable        | unstable     | unstable          | unstable    |
| v1      | Active      | 2019-10-31      | 2019-10-31   | 2023-09-30        | 2025-03-31  |
| v2      | Unreleased  | 2023-06-30      | 2023-09-30   | 2025-03-31        | 2027-03-31  |
| v3      | Unreleased  | 2024-06-30      | 2025-03-31   | 2027-03-31        | 2029-03-31  |

> Dates are subject to change

![schedule](https://www.ibm.com/standards/carbon/static/bcfed95efe679166dbec1cbae7ea33bb/4ea69/dotcom-lts.png)

## Release phases

### Prerelease

The prerelease phase is intended to be the opportunity for early adopters,
library authors, and other strategic ecosystem partners to begin to evaluate and
integrate new changes into their codebases..

### Active

Consuming projects should always aim to follow the Active release.

A release in the Active phase receives monthly minor releases containing new
features and fixes. The work we deliver into `main` every day is considered
unstable. Every month we package up these changes into a new minor version
that is published from `main` to the current Active major.

### Maintenance

For a release in the Maintenance phase, patch releases are published containing
security patches and critical bug fixes. When a version moves from Active to
Maintenance, consuming projects should begin migrating to the new Active major
version.  During Maintenance we also consider adding non-critical bug fixes on
an ad hoc basis, by request only. To request a fix be back-ported to a
Maintenance release, please
[open an issue](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/issues/new?assignees=&labels=bug%2Cdev&projects=&template=bug_report.yaml&title=%5BYOUR+TITLE%5D%3A+Brief+description).

## Assets managed under this release schedule

This plan covers the design and development assets under maintenance of the
Carbon for IBM.com team. This includes the `@carbon/web-components` and
`@carbon/ibmdotcom-web-components` packages, as well as all other packages within the
[`Carbon for IBM.com` monorepo](https://github.com/carbon-design-system/carbon-for-ibm-dotcom).

This plan also includes all design guidance and design kit assets (figma, etc.)
present in the
[`carbon-for-ibm-dotcom-website`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom-website).

## Acknowledgements

This document was heavily inspired by the work of the
[NodeJS Release Working Group](https://github.com/nodejs/release).

The schedule graph was generated using
[our fork](https://github.com/carbon-design-system/lts-schedule) of
[`nodejs/lts-schedule`](https://github.com/nodejs/lts-schedule)
