# `dds-card-cta`

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
<dds-card-cta-image
  alt="video-name-foo"
  data-autoid="dds--image"
  default-src="https://example.com/video-thumbnail-foo"
>
</dds-card-cta-image>
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
    <dds-card-heading
      aria-level="3"
      data-autoid="dds--card-heading"
      role="heading"
    >
      video-name-foo-caption
    </dds-card-heading>
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

```

####   `should render footer with various attributes`

```
<a
  class="bx--card__footer bx--link bx--link-with-icon bx--link-with-icon__icon-right dds-ce--card__footer"
  href="#"
  id="link"
  part="link"
>
  <span class="bx--card__cta__copy">
    <slot>
    </slot>
    undefined-180000
  </span>
  <slot name="icon">
  </slot>
</a>

```

