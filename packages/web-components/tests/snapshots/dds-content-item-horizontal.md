# `dds-content-item-horizontal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-item-horizontal__row">
  <div class="bx--content-item-horizontal__col">
    <p
      class="bx--content-item-horizontal__item--eyebrow"
      hidden=""
    >
      <slot name="eyebrow">
      </slot>
    </p>
    <slot name="heading">
    </slot>
  </div>
  <div class="bx--content-item-horizontal__col">
    <div
      class="bx--content-item__cta"
      hidden=""
    >
      <slot name="cta">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-item-horizontal__row">
  <div class="bx--content-item-horizontal__col">
    <p
      class="bx--content-item-horizontal__item--eyebrow"
      hidden=""
    >
      <slot name="eyebrow">
      </slot>
    </p>
    <slot name="heading">
    </slot>
  </div>
  <div class="bx--content-item-horizontal__col">
    <dds-markdown
      class="bx--content-item__copy"
      nobold=""
    >
    </dds-markdown>
    <div
      class="bx--content-item__cta"
      hidden=""
    >
      <slot name="cta">
      </slot>
    </div>
  </div>
</div>

```

