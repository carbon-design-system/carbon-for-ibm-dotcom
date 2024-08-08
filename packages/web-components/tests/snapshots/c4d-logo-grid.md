# `c4d-logo-grid`

#### `renders c4d-logo-grid properly`

```
<div
  class="cds--content-layout--logo-grid"
  part="content-wrapper"
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
    <div
      class="cds--content-block__children cds--content-layout__body"
      hidden=""
      part="content-body"
    >
      <div
        class="cds--logo-grid__row"
        part="content"
      >
        <slot>
        </slot>
        <slot name="media">
        </slot>
      </div>
    </div>
    <div
      class="cds--content-block__cta-row"
      hidden=""
      part="footer-container"
    >
      <div
        class="cds--content-block__cta cds-content-block__cta-col"
        part="footer"
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</div>

```

