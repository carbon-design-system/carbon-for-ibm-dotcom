# `dds-content-block-segmented`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<slot name="copy">
</slot>
<div
  class="bx--content-block__children"
  hidden=""
>
  <div class="bx--content-block-segmented__media">
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <div hidden="">
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
<slot name="copy">
</slot>
<div
  class="bx--content-block__children"
  hidden=""
>
  <div class="bx--content-block-segmented__media">
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <div hidden="">
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

