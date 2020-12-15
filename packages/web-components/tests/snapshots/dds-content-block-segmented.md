# `dds-content-block-segmented`

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
  <div class="bx--content-block-segmented__media">
    <div>
      <slot name="media">
      </slot>
    </div>
    <div>
      <slot>
      </slot>
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

####   `should render with various attributes`

```
<slot name="heading">
</slot>
<div class="bx--content-block__copy">
  <slot name="copy">
  </slot>
</div>
<div class="bx--content-block__children">
  <div class="bx--content-block-segmented__media">
    <div>
      <slot name="media">
      </slot>
    </div>
    <div>
      <slot>
      </slot>
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

