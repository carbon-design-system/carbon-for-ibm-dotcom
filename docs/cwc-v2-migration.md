# Carbon Web Components: v2 migration guide

This document will review in detail the changes in @carbon/web-components v1 to v2. Because @carbon/web-components v2 uses Carbon v11, which utilizes Sass modules, there is a requirement for teams to use the
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
| accordion                 | View changes [here](#accordion)        |
| breadcrumb                | View changes [here](#breadcrumb)       |
| button                    | No API changes.                        |
| date-picker               | View changes [here](#date-picker)      |
| dropdown                  | View changes [here](#dropdown)         |
| form-group                | New component in v2.                   |
| icon-button               | New component in v2.                   |
| input                     | Replaced by `text-input`               |
| link                      | View changes [here](#link)             |
| mult-select               | View changes [here](#multi-select)     |
| number-input              | View changes [here](#number-input)     |
| progress-bar              | New component in v2.                   |
| radio-button              | View changes [here](#radio-button)     |
| stack                     | New component in v2.                   |
| text-input                | New component in v2. Replaces `input`. |
| tooltip                   | View changes [here](#tooltip)          |
| ui-shell                  | View changes [here](#ui-shell)         |

### accordion

- New `accordion-skeleton` & `accordion-item-skeleton` components
- `title-text` property replaced with `title`

### breadcrumb

- New `breadcrumb-skeleton` component
- New `no-trailing-slash` property

### date-picker

- New `date-picker-input` properties: `warn`, `warn-text`, `invalid-text`, `readonly`, `short`
- Removed `date-picker-input` properties: `side-horizontal`, `required-validity-message`
- New `date-picker` properties: `allow-input`, `close-on-select`, `min-date`, `max-date`, `readonly`

### dropdown

- `direction` property expects 'top' or 'bottom' value

### link

- `size` property replaced `REGULAR = ''` with `MEDIUM = 'md'`
- New `inline` & `visited` properties

### multi-select

- `size` property expected values have been changed from '', 'sm' to 'sm', 'md'
- New `clear-selection-description`, `clear-selection-text`, `locale`, `selection-feedback` properties

### number-input

- Removed `color-scheme` and `mobile` properties
- `size` property expected values have been changed from '', 'sm', 'xl' to 'sm', 'md', and 'lg'
- `validity-message-min` and `validity-message-max` properties replaced with `decrement-button-assistive-text` and `increment-button-assistive-text` respectively
- `label-text` property replaced with `label`
- New `warn`, `warn-text`, `invalid-text`, `hide-label`, `allow-empty`, `hide-steppers` properties

### radio-button

- New `radio-button-group` properties: `defaultSelected`, `legend-text`, `readOnly`
- New `radio-button` properties: `disabledItem`, `readOnly`

### tooltip

- `tooltip-body` has been replaced with `tooltip-content
- `tooltip-footer` has been removed
- New `defaultOpen` & `closeOnActivation` properties

### ui-shell

- New `header-global-action`, `header-panel`, `header-side-nav-items`, `switcher-divider`, `switcher-item`, `switcher` components
- The Header allows for Actions, Switcher, and Right Panel
- New SideNav Rail variation
- New `large` property for `side-nav-menu` and `side-nav-link` components
- `usage-mode` property has been replaced with combination of `is-not-child-of-header` and `is-not-persistent` properties in `side-nav`
- `header-menu` has new `is-active` property
- `header-nav-item` has new `is-active` and `aria-current` properties
- `header-menu-button` no longer uses `usage-mode` property, replaced by `is-not-child-of-header`
