# `dds-content-block-simple`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<div class="bx--content-block__children">
  <div class="bx--content-block-simple__content">
    <dds-content-item data-autoid="dds--content-item">
    </dds-content-item>
    <div>
      <slot name="media">
      </slot>
    </div>
  </div>
</div>
<div
  class="bx--content-block__cta-row"
  hidden=""
>
  <div class="bx--content-block__cta bx--content-block__cta-col">
    <slot name="cta">
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

####   `should render with various attributes`

```
<div class="bx--row">
  <div class="dds-ce--content-block__col">
    <slot name="heading">
    </slot>
    <div>
    </div>
  </div>
</div>
<div class="bx--layout--border bx--row">
  <div class="dds-ce--content-block__col">
    <div class="bx--content-block__children">
      <div class="bx--content-block-simple__content">
        <dds-content-item data-autoid="dds--content-item">
        </dds-content-item>
        <div>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      class="bx--content-block__cta-row"
      hidden=""
    >
      <div class="bx--content-block__cta bx--content-block__cta-col">
        <slot name="cta">
        </slot>
      </div>
    </div>
    <slot name="complementary">
    </slot>
  </div>
</div>

```

