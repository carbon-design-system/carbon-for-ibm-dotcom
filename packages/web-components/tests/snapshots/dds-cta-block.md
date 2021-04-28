# `dds-cta-block`

#### `Renders Default`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
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
  </div>
  <slot name="complementary">
  </slot>
</div>

```

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
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
  </div>
  <slot name="complementary">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div class="bx--content-layout__body">
    <slot name="copy">
    </slot>
    <div class="bx--content-item__cta">
      <slot name="action">
      </slot>
    </div>
    <slot name="link-list">
    </slot>
    <div class="bx--helper-wrapper">
      <div class="bx--content-item-wrapper">
        <slot>
        </slot>
      </div>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

