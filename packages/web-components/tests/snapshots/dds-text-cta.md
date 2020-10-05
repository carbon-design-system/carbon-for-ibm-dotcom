# `dds-text-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link-with-icon"
  id="link"
>
  <slot name="icon">
  </slot>
  <span>
    <slot>
    </slot>
  </span>
</a>

```

####   `should render with various attributes`

```
<a
  class="bx--link bx--link-with-icon"
  href="#"
  id="link"
>
  <slot name="icon">
  </slot>
  <span>
    <slot>
    </slot>
    video-name-foo-caption
  </span>
</a>

```

