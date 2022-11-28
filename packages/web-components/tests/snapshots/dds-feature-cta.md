# `dds-feature-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--card bx--feature-card__card bx--tile">
  <slot name="image">
  </slot>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
      <div
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
</div>

```

####   `should render with various attributes`

```
<div class="bx--card bx--feature-card__card bx--tile">
  <slot name="image">
    <dds-image
      alt="video-name-foo"
      data-autoid="dds--image"
      slot="image"
    >
    </dds-image>
  </slot>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
      <div class="bx--card__copy">
        <slot>
        </slot>
      </div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

