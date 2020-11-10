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
<slot name="copy">
</slot>
<div
  class="bx--content-item__cta"
  hidden=""
>
  <slot name="cta">
  </slot>
</div>
<slot name="link-list">
</slot>
<div
  class="bx--helper-wrapper"
  hidden=""
>
  <div class="bx--content-item-wrapper">
    <slot name="content-item">
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
<slot name="copy">
</slot>
<div class="bx--content-item__cta">
  <slot name="cta">
  </slot>
</div>
<slot name="link-list">
</slot>
<div
  class="bx--helper-wrapper"
  hidden=""
>
  <div class="bx--content-item-wrapper">
    <slot name="content-item">
    </slot>
  </div>
</div>

```

