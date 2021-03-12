# `dds-content-block-headlines`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-layout bx--content-layout--with-headlines bx--layout--border">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div
      class="bx--content-block-headlines__item-container"
      hidden=""
    >
      <slot>
      </slot>
    </div>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

