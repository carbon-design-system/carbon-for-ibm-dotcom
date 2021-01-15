# `dds-cta-section`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<slot name="copy">
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
    <slot>
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

####   `should render with various attributes`

```
<slot name="heading">
</slot>
<slot name="copy">
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
    <slot>
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

