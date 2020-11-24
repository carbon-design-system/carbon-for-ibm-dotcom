# `dds-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link-with-icon"
  id="link"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot
    name="icon"
    style="display:flex;"
  >
  </slot>
</a>

```

####   `should render with various attributes`

```
<p
  class="bx--link bx--link--disabled bx--link-with-icon"
  id="link"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot
    name="icon"
    style="display:flex;"
  >
  </slot>
</p>

```

