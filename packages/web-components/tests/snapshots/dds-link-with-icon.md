# `dds-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="cds--link cds--link--lg cds--link-with-icon"
  id="link"
  part="link"
  tabindex="0"
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
<p
  class="cds--link cds--link--disabled cds--link--lg cds--link-with-icon"
  id="link"
  part="link"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
  </slot>
</p>

```

