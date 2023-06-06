# `bx-toggle`

## `Rendering`

####   `Should render with minimum attributes`

```
<input
  aria-checked="false"
  class="bx--toggle-input"
  id="checkbox"
  type="checkbox"
>
<label
  class="bx--toggle-input__label"
  for="checkbox"
>
  <slot name="label-text">
  </slot>
  <span class="bx--toggle__switch">
    <span
      aria-hidden="true"
      class="bx--toggle__text--off"
    >
      <slot name="unchecked-text">
      </slot>
    </span>
    <span
      aria-hidden="true"
      class="bx--toggle__text--on"
    >
      <slot name="checked-text">
      </slot>
    </span>
  </span>
</label>

```

####   `Should render with various attributes`

```
<input
  aria-checked="true"
  class="bx--toggle-input bx--toggle-input--small"
  disabled=""
  id="checkbox"
  name="name-foo"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--toggle-input__label"
  for="checkbox"
>
  <slot name="label-text">
    label-text-foo
  </slot>
  <span class="bx--toggle__switch">
    <span
      aria-hidden="true"
      class="bx--toggle__text--off"
    >
      <slot name="unchecked-text">
        unchecked-text-foo
      </slot>
    </span>
    <span
      aria-hidden="true"
      class="bx--toggle__text--on"
    >
      <slot name="checked-text">
        checked-text-foo
      </slot>
    </span>
  </span>
</label>

```

