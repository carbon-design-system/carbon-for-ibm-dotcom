# `dds-content-block-headlines`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<div class="bx--content-block__copy">
  <slot name="copy">
  </slot>
</div>
<div class="bx--content-block__children">
  <div class="bx--content-block-headlines__container">
    <div class="bx--content-block-headlines__row">
      <div class="bx--content-block-headlines__item-container">
        <slot name="content">
        </slot>
      </div>
    </div>
  </div>
</div>
<div
  class="bx--content-block__cta-row"
  hidden=""
>
  <div class="bx--content-block__cta bx--content-block__cta-col">
    <slot name="footer">
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

