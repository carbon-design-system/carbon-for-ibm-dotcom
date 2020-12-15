# `dds-content-item`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<div>
  <slot name="media">
  </slot>
</div>
<slot>
</slot>
<div
  class="bx--content-item__cta"
  hidden=""
>
  <slot name="footer">
  </slot>
</div>

```

####   `should render with various attributes`

```
<slot name="heading">
</slot>
<div>
  <slot name="media">
  </slot>
</div>
<slot>
</slot>
<div class="bx--content-item__cta">
  <slot name="footer">
  </slot>
</div>

```

