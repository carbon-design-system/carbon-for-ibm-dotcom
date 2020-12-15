# `dds-cta-section`

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
  <slot name="action">
  </slot>
</div>
<slot name="link-list">
</slot>
<div
  class="bx--helper-wrapper"
  hidden=""
>
  <div class="bx--content-item-wrapper">
    <slot name="items">
    </slot>
  </div>
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
  <slot name="action">
  </slot>
</div>
<slot name="link-list">
</slot>
<div
  class="bx--helper-wrapper"
  hidden=""
>
  <div class="bx--content-item-wrapper">
    <slot name="items">
    </slot>
  </div>
</div>

```

