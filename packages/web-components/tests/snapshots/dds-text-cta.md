# `dds-text-cta`

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
<a
  class="bx--link bx--link-with-icon"
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

