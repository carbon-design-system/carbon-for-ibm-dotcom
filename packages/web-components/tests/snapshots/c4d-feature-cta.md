# `c4d-feature-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--card cds--feature-card__card cds--tile">
  <slot name="image">
  </slot>
  <div class="cds--card__wrapper">
    <div class="cds--card__content">
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
      <div
        class="cds--card__copy"
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
<div class="cds--card cds--feature-card__card cds--tile">
  <slot name="image">
    <c4d-image
      alt="video-name-foo"
      data-autoid="c4d--image"
      slot="image"
    >
      [object Object]
    </c4d-image>
  </slot>
  <div class="cds--card__wrapper">
    <div class="cds--card__content">
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
      <div class="cds--card__copy">
        <slot>
        </slot>
      </div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

