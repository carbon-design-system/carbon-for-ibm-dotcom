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

| Component                 | Changes                                  |
| ------------------------- | ---------------------------------------- |
| accordion                 | View changes [here](#accordion)          |
| breadcrumb                | View changes [here](#breadcrumb)         |
| button                    | View changes [here](#button)             |
| checkbox                  | View changes [here](#checkbox)           |
| code-snippet              | View changes [here](#code-snippet)       |
| content-switcher          | View changes [here](#content-switcher)   |
| copy-button               | View changes [here](#copy-button)        |
| date-picker               | View changes [here](#date-picker)        |
| dropdown                  | View changes [here](#dropdown)           |
| file-uploader             | View changes [here](#file-uploader)      |
| form-group                | New component in v2.                     |
| icon-button               | New component in v2.                     |
| inline-loading            | View changes [here](#inline-loading)     |
| input                     | Replaced by `text-input`                 |
| link                      | View changes [here](#link)               |
| loading                   | View changes [here](#loading)            |
| multi-select              | View changes [here](#multi-select)       |
| notification              | View changes [here](#notification)       |
| number-input              | View changes [here](#number-input)       |
| ordered-list              | No API changes.                          |
| overflow-menu             | View changes [here](#overflow-menu)      |
| pagination                | View changes [here](#pagination)         |
| popover                   | New component in v2.                     |
| progress-bar              | New component in v2.                     |
| progress-indicator        | View changes [here](#progress-indicator) |
| radio-button              | View changes [here](#radio-button)       |
| select                    | View changes [here](#select)             |
| skeleton-placeholder      | No API changes.                          |
| skeleton-text             | View changes [here](#skeleton-text)      |
| slider                    | View changes [here](#slider)             |
| stack                     | New component in v2.                     |
| structured-list           | View changes [here](#structured-list)    |
| tabs                      | View changes [here](#tabs)               |
| textarea                  | View changes [here](#textarea)           |
| text-input                | New component in v2. Replaces `input`.   |
| tooltip                   | View changes [here](#tooltip)            |
| ui-shell                  | View changes [here](#ui-shell)           |
| unordered-list            | No API changes.                          |

### accordion

- New `accordion-skeleton` & `accordion-item-skeleton` components
- `title-text` property replaced with `title`

### button

- `danger-primary` new option for `kind` property

### breadcrumb

- New `breadcrumb-skeleton` component
- New `no-trailing-slash` property

### checkbox

- New `checkbox-skeleton`
- New `readonly` & `title` properties for `checkbox`

### code-snippet

- New properties: `copy-text`, `disabled`, `feedback`, `feedback-timeout`, `hide-copy-button`, `maxCollapsedNumberOfRows`, `maxExpandedNumberOfRows`, `minCollapsedNumberOfRows`, `minExpandedNumberOfRows`, `show-less-text`, `show-more-text`, `wrap-text`, `tooltip-content`
- Removed properties: `code-assistive-text`, `collapse-button-text`, `color-scheme`, `copy-button-assistive-text`, `copy-button-feedback-text`, `copy-button-feedback-timeout`, `expand-button-text`

### content-switcher

- New `icon` property for icon-only variation
- New `align` property for icon tooltips in icon-only variation
- New `close-on-activation` property

### copy-button

- `feedback-text` property replaced with `feedback`
- Removed `button-assistive-text` property
- New `class-name` & `disabled` properties

### date-picker

- New `date-picker-input` properties: `warn`, `warn-text`, `invalid-text`, `readonly`, `short`
- Removed `date-picker-input` properties: `side-horizontal`, `required-validity-message`
- New `date-picker` properties: `allow-input`, `close-on-select`, `min-date`, `max-date`, `readonly`

### dropdown

- `direction` property expects 'top' or 'bottom' value

### file-uploader

- `state` now accepts `uploading`, `complete`, & `edit` instead of `uploading`, `uploaded`, & `editing`
- `size` now accepts `sm`, `md`, `lg`, instead of `''`, `sm`, `lg`, `field`
- New `file-uploader-button` & `file-uploader-skeleton` components
- `file-drop-container` is replaced with `file-uploader-drop-container` with a new `name` property
- New `file-uploader-item` properties: `icon-desciption`, `error-subject`, `error-body`
- Removed `file-uploader-item` properties: `uploaded-assitive-text`, `uploading-assistive-text`, `validity-message`
- New `file-uploader` properties: `disabled`, `label-description`, `label-title`
- Removed `file-uploader` properties: `helper-text`, `label-text`

### inline-loading

- New `assistive-text` property

### link

- `size` property replaced `REGULAR = ''` with `MEDIUM = 'md'`
- New `inline` & `visited` properties

### loading

- New `assistive-text` property

### multi-select

- Removed `color-scheme` property
- `size` property expected values have been changed from '' (default), 'sm' --> 'sm', 'md' (default)
- New a11y `clear-selection-description` and `clear-selection-text` properties
- New `locale` property to specify locale of the multi-select, used when sorting the list of items
- New `selection-feedback` property: `'fixed', 'top', 'top-after-reopen'` options for sorting list items once selection occurs 
- New `warn` and `warn-text` properties for warn state

### notification

- New `actionable-notification` component that has inline and toast variations
- New `info`, `info-square`, and `warning-alt` values for `kind` property
- `icon-label` property replaced with `status-icon-description`
- `close-button-label` property replaced with `aria-label`

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

### overflow-menu

- `size` now accepts: `sm`, `md`, `lg` instead of `''`, `sm`, `lg` `xl`
- New `overlfow-menu-body` properties: `flipped`, `size`
- Removed `overlfow-menu-body` properties: `alignment`, `color-scheme`
- New `overlfow-menu-item` properties: `divider`, `size`
- New `overlfow-menu` properties: `index`
- Removed `overlfow-menu` properties: `color-scheme`

### progress-indicator

- New `space-equally` property for `progress-indicator`
- New `description` property for `progress-step`
- New `label` property for `progress-step`
- New `secondary-label` property for `progress-step`

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

### skeleton-text

- Removed `LINE` type def` and `line` option for `type` property

### structured-list

- New `condensed` property for condensed variation
- New `flush` property for flush variation

### tabs

- Replaced mobile dropdown style tabs with overflow scrolling tabs at all screen sizes
- New `CONTAINED` value for `type` property

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
