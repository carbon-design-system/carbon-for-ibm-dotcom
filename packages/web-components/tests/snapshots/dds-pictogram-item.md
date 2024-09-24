# `dds-pictogram-item`

#### `Renders as expected`

```
<div class="bx--pictogram-item__row">
  <div class="bx--pictogram-item__wrapper">
    <slot
      class="bx--pictogram-item__pictogram"
      name="pictogram"
    >
    </slot>
  </div>
  <div class="bx--pictogram-item__content">
    <div class="bx--content-item">
      <slot name="heading">
      </slot>
      <div part="wrapper">
        <slot name="media">
        </slot>
      </div>
      <slot>
      </slot>
      <div
        class="bx--content-item__cta"
        hidden=""
        part="footer-wrapper"
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</div>

```

