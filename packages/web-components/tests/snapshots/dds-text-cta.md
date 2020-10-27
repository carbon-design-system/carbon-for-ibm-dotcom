# `dds-text-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link-with-icon bx--link-with-icon__icon-right"
  id="link"
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
  class="bx--link bx--link-with-icon bx--link-with-icon__icon-right"
  href="#"
  id="link"
>
  <span>
    <slot>
    </slot>
    video-name-foo-caption
  </span>
  <slot name="icon">
  </slot>
</a>

```

