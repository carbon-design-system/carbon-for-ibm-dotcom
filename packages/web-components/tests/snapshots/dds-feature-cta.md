# `dds-feature-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="image">
</slot>
<div class="bx--card__wrapper">
  <div class="bx--card__content">
    <slot name="eyebrow">
    </slot>
    <slot
      data-pictogram-placement="top"
      name="pictogram"
    >
    </slot>
    <slot name="heading">
    </slot>
    <div
      aria-hidden="true"
      class="bx--card__copy"
      hidden=""
    >
      <slot>
      </slot>
    </div>
    <slot name="footer">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<slot name="image">
</slot>
<div class="bx--card__wrapper">
  <div class="bx--card__content">
    <slot name="eyebrow">
    </slot>
    <slot
      data-pictogram-placement="top"
      name="pictogram"
    >
    </slot>
    <slot name="heading">
    </slot>
    <div class="bx--card__copy">
      <slot>
      </slot>
      video-name-foo-180000
    </div>
    <slot name="footer">
    </slot>
  </div>
</div>

```

