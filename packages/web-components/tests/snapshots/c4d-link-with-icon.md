# `c4d-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="cds--link cds--link--lg cds--link-with-icon"
  download=""
  href=""
  id="link"
  part="link"
  tabindex="0"
>
  <span part="span">
    <slot>
    </slot>
  </span>
  <slot name="icon">
    <span
      class="cds--visually-hidden"
      part="icon-visually-hidden"
    >
    </span>
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
  <span part="span">
    <slot>
    </slot>
  </span>
  <slot name="icon">
    <span
      class="cds--visually-hidden"
      part="icon-visually-hidden"
    >
    </span>
  </slot>
</p>

```

