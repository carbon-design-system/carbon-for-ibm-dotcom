# `dds-text-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link bx--link--lg bx--link-with-icon bx--link-with-icon--inline-icon bx--link-with-icon__icon-right"
  id="link"
  part="link"
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
  class="bx--link bx--link--lg bx--link-with-icon bx--link-with-icon--inline-icon bx--link-with-icon__icon-right"
  href="#"
  id="link"
  part="link"
  target="_blank"
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

