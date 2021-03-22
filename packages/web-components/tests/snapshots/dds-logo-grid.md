# `dds-logo-grid`

#### `renders dds-logo-grid properly`

```
<div class="bx--content-layout--logo-grid">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div
      class="bx--content-block__children bx--content-layout__body"
      hidden=""
    >
      <div class="bx--logo-grid__row">
        <slot>
        </slot>
        <slot name="media">
        </slot>
      </div>
    </div>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

