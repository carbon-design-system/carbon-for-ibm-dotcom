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
    <div
      class="bx--content-layout__copy"
      hidden=""
    >
      <slot name="copy">
      </slot>
    </div>
    <div
      class="bx--content-layout__cta"
      hidden=""
    >
      <slot name="action">
      </slot>
    </div>
    <div
      class="bx--content-layout__link-list"
      hidden=""
    >
      <slot name="link-list">
      </slot>
    </div>
    <div
      class="bx--helper-wrapper bx--helper-wrapper--less-space"
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
<div class="bx--content-layout bx--content-layout--border">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <div
      class="bx--content-layout__copy"
      hidden=""
    >
      <slot name="copy">
      </slot>
    </div>
    <div
      class="bx--content-layout__cta"
      hidden=""
    >
      <slot name="action">
      </slot>
    </div>
    <div
      class="bx--content-layout__link-list"
      hidden=""
    >
      <slot name="link-list">
      </slot>
    </div>
    <div
      class="bx--helper-wrapper bx--helper-wrapper--less-space"
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
<div class="bx--content-layout bx--content-layout--border">
  <slot name="heading">
  </slot>
  <div class="bx--content-layout__body">
    <div
      class="bx--content-layout__copy"
      hidden=""
    >
      <slot name="copy">
      </slot>
    </div>
    <div class="bx--content-layout__cta">
      <slot name="action">
      </slot>
    </div>
    <div
      class="bx--content-layout__link-list"
      hidden=""
    >
      <slot name="link-list">
      </slot>
    </div>
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

