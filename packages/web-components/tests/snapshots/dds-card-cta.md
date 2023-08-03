# `dds-card-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--card cds--tile">
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
<div class="cds--card cds--tile">
  <slot name="image">
  </slot>
  <dds-card-cta-image
    alt="video-name-foo"
    class="cds--card__video-thumbnail"
    data-autoid="dds--image"
    default-src="https://example.com/video-thumbnail-foo"
  >
    [object Object]
  </dds-card-cta-image>
  <div class="cds--card__wrapper">
    <div class="cds--card__content">
      <slot name="eyebrow">
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

####   `should render footer with various attributes`

```
<a
  aria-label="video-name-foo, DURATION undefined - This link plays a video"
  class="cds--card__footer cds--link cds--link--lg cds--link-with-icon cds--link-with-icon--inline-icon cds--link-with-icon__icon-right dds-ce--card__footer"
  href="#"
  id="link"
  part="link"
  tabindex="0"
>
  <span class="cds--card__cta__copy">
    <slot>
    </slot>
    undefined-180000
  </span>
  <slot name="icon">
    <span class="bx--visually-hidden">
      - This link plays a video
    </span>
  </slot>
</a>

```

