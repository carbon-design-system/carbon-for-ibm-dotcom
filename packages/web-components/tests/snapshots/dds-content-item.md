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
<div
  class="bx--content-item__cta"
  hidden=""
>
  <slot name="cta">
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
<dds-markdown
  class="bx--content-item__copy"
  nobold=""
>
</dds-markdown>
<div class="bx--content-item__cta">
  <slot name="cta">
  </slot>
</div>

```

