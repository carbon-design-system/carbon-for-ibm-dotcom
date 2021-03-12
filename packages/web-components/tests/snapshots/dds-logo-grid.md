# `dds-logo-grid`

#### `renders dds-logo-grid properly`

```
<div class="bx--content-layout--logo-grid">
  <slot name="heading">
  </slot>
  <slot name="copy">
  </slot>
  <div
    class="bx--content-block__children bx--content-layout__body"
    hidden=""
  >
    <div class="bx--logo-grid__row">
      <slot>
      </slot>
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

```

