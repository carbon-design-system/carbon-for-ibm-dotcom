# `bx-checkbox`

## `Rendering`

####   `Should render with minimum attributes`

```
<input
  aria-checked="false"
  class="bx--checkbox"
  id="checkbox"
  part="input"
  type="checkbox"
>
<label
  class="bx--checkbox-label"
  for="checkbox"
  part="label"
>
  <span class="bx--checkbox-label-text">
    <slot>
    </slot>
  </span>
</label>

```

####   `Should render with various attributes`

```
<input
  aria-checked="mixed"
  class="bx--checkbox"
  disabled=""
  id="checkbox"
  name="name-foo"
  part="input"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--checkbox-label bx--visually-hidden"
  for="checkbox"
  part="label"
>
  <span class="bx--checkbox-label-text">
    <slot>
      label-text-foo
    </slot>
  </span>
</label>

```

