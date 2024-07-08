# `cds-combo-box`

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
<div class="cds--combo-box cds--dropdown cds--list-box cds--list-box--md">
  <div
    class="cds--list-box__field"
    part="trigger-button"
  >
    <input
      aria-activedescendant=""
      aria-autocomplete="list"
      aria-controls="menu-body"
      aria-expanded="false"
      aria-haspopup="listbox"
      class="cds--text-input cds--text-input--empty"
      id="trigger-button"
      part="text-input"
      placeholder=""
      role="combobox"
    >
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
<div
  class="cds--combo-box cds--dropdown cds--dropdown--invalid cds--list-box cds--list-box--disabled cds--list-box--md"
  data-invalid=""
>
  <div
    class="cds--list-box__field"
    part="trigger-button"
  >
    <input
      aria-activedescendant=""
      aria-autocomplete="list"
      aria-controls="menu-body"
      aria-expanded="false"
      aria-haspopup="listbox"
      class="cds--text-input"
      disabled=""
      id="trigger-button"
      part="text-input"
      placeholder=""
      role="combobox"
    >
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
  class="cds--form__helper-text cds--form__helper-text--disabled"
  part="helper-text"
>
  <slot name="helper-text">
  </slot>
</div>

```

