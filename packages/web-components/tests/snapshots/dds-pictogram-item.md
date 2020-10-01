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
    <dds-content-item
      copy=""
      data-autoid="dds--content-item"
    >
      <dds-content-item-heading
        aria-level="4"
        data-autoid="dds--content-item__heading"
        role="heading"
      >
        <slot name="heading">
        </slot>
      </dds-content-item-heading>
      <slot
        name="copy"
        slot="copy"
      >
      </slot>
      <slot
        name="cta"
        slot="cta"
      >
      </slot>
    </dds-content-item>
  </div>
</div>

```

