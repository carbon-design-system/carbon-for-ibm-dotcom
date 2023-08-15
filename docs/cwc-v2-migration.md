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
| multi-select              | View changes [here](#multi-select)     |
| notification              | View changes [here](#notification)     |
| number-input              | View changes [here](#number-input)     |
| progress-bar              | New component in v2.                   |
| radio-button              | View changes [here](#radio-button)     |
| select                    | View changes [here](#select)           |
| slider                    | View changes [here](#slider)           |
| stack                     | New component in v2.                   |
| textarea                  | View changes [here](#textarea)         |
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

- Removed `color-scheme` property
- `size` property expected values have been changed from '' (default), 'sm' --> 'sm', 'md' (default)
- New a11y `clear-selection-description` and `clear-selection-text` properties
- New `locale` property to specify locale of the multi-select, used when sorting the list of items
- New `selection-feedback` property: `'fixed', 'top', 'top-after-reopen'` options for sorting list items once selection occurs 
- New `warn` and `warn-text` properties for warn state

### notification

- New `actionable-notification` component that has inline and toast variations

### number-input

- Removed `color-scheme` and `mobile` properties
- `size` property expected values have been changed from '' (default), 'sm', 'xl' --> 'sm', 'md' (default), and 'lg'
- `validity-message-min` and `validity-message-max` properties replaced with `decrement-button-assistive-text` and `increment-button-assistive-text` respectively
- `label-text` property replaced with `label`
- New `warn` and `warn-text` properties for warn state
- New `invalid-text` that appears when in invalid state
- New `hide-label` property
- New`allow-empty` property to allow empty string
- New `hide-steppers` property for option to hide increment/decrement steppers

### radio-button

- New `radio-button-group` properties: `defaultSelected`, `legend-text`, `readOnly`
- New `radio-button` properties: `disabledItem`, `readOnly`

### tooltip

- `tooltip-body` has been replaced with `tooltip-content
- `tooltip-footer` has been removed
- New `defaultOpen` & `closeOnActivation` properties

### slider

- New `required` property to specify if slider is required
- New `readonly` property 
- New `max-label` and `min-label` a11y properties
- New `invalid` and `invalid-text` property for invalid state - when input entered in the text-input is above or lower than given max / min, the invalid state will be triggered automatically
- New `step-multiplier` property to determine how much the value should increase / decrease by Shift + arrow keys
- New `warn` and `warn-text` properties for warn state
- New `hide-text-input` property for option to hide text input on side of slider

### select

- Removed `color-scheme` property
- `size` property expected values have been changed from '' (default), 'sm', and 'xl' --> 'sm', 'md' (default), and 'lg'
- New `inline` property for inline variation
- New `invalid-text` property for invalid state
- New `warn` and `warn-text` properties for warn state
- New `hide-label` property for option to hide label

### textarea

- Removed `color-scheme` property
- New `max-count` property that limits character count in component
- New `enable-counter` property for option to display character counter
- New `warn` and `warn-text` properties for warn state

### ui-shell

- New `header-global-action`, `header-panel`, `header-side-nav-items`, `switcher-divider`, `switcher-item`, `switcher` components
- The Header allows for Actions, Switcher, and Right Panel
- New SideNav Rail variation
- New `large` property for `side-nav-menu` and `side-nav-link` components
- `usage-mode` property has been replaced with combination of `is-not-child-of-header` and `is-not-persistent` properties in `side-nav`
- `header-menu` has new `is-active` property
- `header-nav-item` has new `is-active` and `aria-current` properties
- `header-menu-button` no longer uses `usage-mode` property, replaced by `is-not-child-of-header`
