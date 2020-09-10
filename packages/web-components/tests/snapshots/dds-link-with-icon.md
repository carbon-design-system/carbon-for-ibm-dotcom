# `dds-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link-with-icon"
  id="link"
>
  <slot name="icon-left">
  </slot>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
  </slot>
</a>

```

####   `should render with various attributes`

```
<p
  class="bx--link bx--link--disabled bx--link-with-icon"
  id="link"
>
  <slot name="icon-left">
  </slot>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
  </slot>
</p>

```

