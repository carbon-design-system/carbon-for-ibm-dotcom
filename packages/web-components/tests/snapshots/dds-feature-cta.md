# `dds-feature-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="image">
</slot>
<div class="bx--card__wrapper">
  <p
    class="bx--card__eyebrow"
    hidden=""
  >
    <slot name="eyebrow">
    </slot>
  </p>
  <h3
    class="bx--card__heading"
    hidden=""
  >
    <slot name="heading">
    </slot>
  </h3>
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

```

####   `should render with various attributes`

```
<slot name="image">
</slot>
<dds-image
  alt="video-name-foo"
  default-src="https://example.com/video-thumbnail-foo"
>
</dds-image>
<div class="bx--card__wrapper">
  <p
    class="bx--card__eyebrow"
    hidden=""
  >
    <slot name="eyebrow">
    </slot>
  </p>
  <h3
    class="bx--card__heading"
    hidden=""
  >
    <slot name="heading">
    </slot>
  </h3>
  <div class="bx--card__copy">
    <slot>
    </slot>
    video-name-foo-180000
  </div>
  <slot name="footer">
  </slot>
</div>

```

