# `dds-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link-with-icon"
  id="button"
  role="button"
>
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
<a
  class="bx--link bx--link--disabled bx--link-with-icon"
  href="about:blank"
  id="button"
  role="button"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
  </slot>
</a>

```

