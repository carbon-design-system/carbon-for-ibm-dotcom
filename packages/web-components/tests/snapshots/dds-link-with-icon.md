# `dds-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link--lg bx--link-with-icon"
  id="link"
  part="link"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
    <span class="bx--visually-hidden">
    </span>
  </slot>
</a>

```

####   `should render with various attributes`

```
<p
  class="bx--link bx--link--disabled bx--link--lg bx--link-with-icon"
  id="link"
  part="link"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
    <span class="bx--visually-hidden">
    </span>
  </slot>
</p>

```

