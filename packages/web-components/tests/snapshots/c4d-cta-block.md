# `c4d-cta-block`

#### `Renders Default`

```
<div
  class="cds--content-layout"
  part="content-layout"
>
  <slot name="heading">
  </slot>
  <div
    class="cds--content-layout__body"
    hidden=""
    part="body"
  >
    <div
      class="cds--content-layout__copy"
      hidden=""
      part="copy"
    >
      <slot name="copy">
      </slot>
    </div>
    <div
      class="cds--content-layout__cta"
      hidden=""
      part="cta"
    >
      <slot name="action">
      </slot>
    </div>
    <div
      class="cds--content-layout__link-list"
      hidden=""
      part="link-list"
    >
      <slot name="link-list">
      </slot>
    </div>
    <div
      class="cds--helper-wrapper cds--helper-wrapper--less-space"
      hidden=""
      part="helper-wrapper"
    >
      <div
        class="cds--content-item-wrapper"
        part="content-item-wrapper"
      >
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
<div
  class="cds--content-layout cds--content-layout--border"
  part="content-layout"
>
  <slot name="heading">
  </slot>
  <div
    class="cds--content-layout__body"
    hidden=""
    part="body"
  >
    <div
      class="cds--content-layout__copy"
      hidden=""
      part="copy"
    >
      <slot name="copy">
      </slot>
    </div>
    <div
      class="cds--content-layout__cta"
      hidden=""
      part="cta"
    >
      <slot name="action">
      </slot>
    </div>
    <div
      class="cds--content-layout__link-list"
      hidden=""
      part="link-list"
    >
      <slot name="link-list">
      </slot>
    </div>
    <div
      class="cds--helper-wrapper cds--helper-wrapper--less-space"
      hidden=""
      part="helper-wrapper"
    >
      <div
        class="cds--content-item-wrapper"
        part="content-item-wrapper"
      >
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
<div
  class="cds--content-layout cds--content-layout--border cds--content-layout--with-children"
  part="content-layout"
>
  <slot name="heading">
  </slot>
  <div
    class="cds--content-layout__body"
    part="body"
  >
    <div
      class="cds--content-layout__copy"
      hidden=""
      part="copy"
    >
      <slot name="copy">
      </slot>
    </div>
    <div
      class="cds--content-layout__cta"
      part="cta"
    >
      <slot name="action">
      </slot>
    </div>
    <div
      class="cds--content-layout__link-list"
      hidden=""
      part="link-list"
    >
      <slot name="link-list">
      </slot>
    </div>
    <div
      class="cds--helper-wrapper"
      part="helper-wrapper"
    >
      <div
        class="cds--content-item-wrapper"
        part="content-item-wrapper"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

