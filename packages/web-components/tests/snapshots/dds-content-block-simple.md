# `dds-content-block-simple`

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
  <div class="bx--content-block-simple__content">
    <div
      class="bx--content-item"
      hidden=""
    >
      <slot>
      </slot>
    </div>
    <div hidden="">
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
    <slot name="footer">
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
    <slot name="copy">
    </slot>
    <div
      class="bx--content-block__children"
      hidden=""
    >
      <div class="bx--content-block-simple__content">
        <div
          class="bx--content-item"
          hidden=""
        >
          <slot>
          </slot>
        </div>
        <div hidden="">
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
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

