# `c4d-logo-grid`

#### `renders c4d-logo-grid properly`

```
<div class="cds--content-layout--logo-grid">
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
    >
      <div class="cds--logo-grid__row">
        <slot>
        </slot>
        <slot name="media">
        </slot>
      </div>
    </div>
    <div
      class="cds--content-block__cta-row"
      hidden=""
    >
      <div class="cds--content-block__cta cds-content-block__cta-col">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</div>

```

