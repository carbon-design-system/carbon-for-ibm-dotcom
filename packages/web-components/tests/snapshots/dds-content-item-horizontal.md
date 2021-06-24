# `dds-content-item-horizontal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-item-horizontal__row">
  <div class="bx--content-item-horizontal__col bx--content-item-horizontal__col--1">
    <div class="bx--content-item-horizontal__heading-wrapper">
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
    </div>
    <div class="bx--content-item-horizontal__content-wrapper">
      <slot>
      </slot>
      <div
        class="bx--content-item__cta"
        hidden=""
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-item-horizontal__row">
  <div class="bx--content-item-horizontal__col bx--content-item-horizontal__col--1">
    <div class="bx--content-item-horizontal__heading-wrapper">
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
    </div>
    <div class="bx--content-item-horizontal__content-wrapper">
      <slot>
      </slot>
      <div
        class="bx--content-item__cta"
        hidden=""
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</div>

```

