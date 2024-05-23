# `c4d-content-group-simple`

## `Misc attributes`

####   `should render with minimum attributes`

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
    <slot name="copy">
    </slot>
    <slot name="media">
    </slot>
    <slot>
    </slot>
    <div
      class="false"
      grid-mode=""
      hidden=""
      part="footer"
      style=""
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

####   `should render with various attributes`

```

<div
  class="cds--content-layout cds--content-layout--with-footer"
  part="content-layout"
>
  <slot name="heading">
  </slot>
  <div
    class="cds--content-layout__body"
    part="body"
  >
    <slot name="copy">
    </slot>
    <slot name="media">
    </slot>
    <slot>
    </slot>
    <div
      class="c4d--content-block-footer"
      grid-mode=""
      part="footer"
      style=""
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

