# `c4d-pictogram-item`

#### `Renders as expected`

```
<div class="cds--pictogram-item__row">
  <div class="cds--pictogram-item__wrapper">
    <slot
      class="cds--pictogram-item__pictogram"
      name="pictogram"
    >
    </slot>
  </div>
  <div class="cds--pictogram-item__content">
    <div class="cds--content-item">
      <slot name="heading">
      </slot>
      <div>
        <slot name="media">
        </slot>
      </div>
      <slot>
      </slot>
      <div
        class="cds--content-item__cta"
        hidden=""
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</div>

```

