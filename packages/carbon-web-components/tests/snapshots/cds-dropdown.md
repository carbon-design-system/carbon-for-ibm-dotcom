# `cds-dropdown`

## `Misc attributes`

####   `should render with minimum attributes`

```
<label
  class="cds--label"
  for="trigger-button"
  hidden=""
  id="dropdown-label"
  part="title-text"
>
  <slot name="title-text">
  </slot>
</label>
<div class="cds--dropdown cds--list-box cds--list-box--md">
  <div
    aria-activedescendant=""
    aria-controls="menu-body"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="dropdown-label"
    class="cds--list-box__field"
    id="trigger-button"
    part="trigger-button"
    role="combobox"
    tabindex="0"
  >
    <span
      class="cds--list-box__label"
      id="trigger-label"
    >
    </span>
    <div
      class="cds--list-box__menu-icon"
      id="trigger-caret"
    >
    </div>
  </div>
  <slot
    class="cds--slug--revert"
    name="slug"
  >
  </slot>
  <div
    aria-labelledby="dropdown-label"
    class="cds--list-box__menu"
    hidden=""
    id="menu-body"
    part="menu-body"
    role="listbox"
    tabindex="-1"
  >
    <slot>
    </slot>
  </div>
</div>
<div
  class="cds--form__helper-text"
  hidden=""
  part="helper-text"
>
  <slot name="helper-text">
  </slot>
</div>

```

####   `should render with various attributes`

```
<label
  class="cds--label cds--label--disabled"
  for="trigger-button"
  hidden=""
  id="dropdown-label"
  part="title-text"
>
  <slot name="title-text">
  </slot>
</label>
<div class="cds--dropdown cds--list-box cds--list-box--disabled cds--list-box--expanded cds--list-box--md">
  <div
    aria-activedescendant="cds-dropdown-item-6"
    aria-controls="menu-body"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-labelledby="dropdown-label"
    class="cds--list-box__field"
    id="trigger-button"
    part="trigger-button"
    role="combobox"
    tabindex="0"
  >
    <span
      class="cds--list-box__label"
      id="trigger-label"
    >
    </span>
    <div
      class="cds--list-box__menu-icon cds--list-box__menu-icon--open"
      id="trigger-caret"
    >
    </div>
  </div>
  <slot
    class="cds--slug--revert"
    name="slug"
  >
  </slot>
  <div
    aria-labelledby="dropdown-label"
    class="cds--list-box__menu"
    id="menu-body"
    part="menu-body"
    role="listbox"
    tabindex="-1"
  >
    <slot>
    </slot>
  </div>
</div>
<div
  class="cds--form__helper-text cds--form__helper-text--disabled"
  part="helper-text"
>
  <slot name="helper-text">
    helper-text-foo
  </slot>
</div>

```

