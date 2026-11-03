# `c4d-feature-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div
  class="cds--card cds--feature-card__card cds--tile"
  part="container"
>
  <div
    class="cds--card__image-wrapper"
    part="image-wrapper"
  >
    <slot name="image">
    </slot>
  </div>
  <div
    class="cds--card__wrapper"
    part="wrapper"
  >
    <div
      class="cds--card__content"
      part="content"
    >
      <div
        class="cds--card__eyebrow-wrapper cds--card__eyebrow-wrapper--empty"
        part="eyebrow-wrapper"
      >
        <slot name="eyebrow">
        </slot>
      </div>
      <div part="heading-wrapper">
        <slot name="heading">
        </slot>
      </div>
      <div
        class="cds--card__copy"
        hidden=""
        part="copy"
      >
        <slot>
        </slot>
      </div>
      <div
        class="cds--card__pictogram-wrapper cds--card__pictogram-wrapper--empty"
        part="pictogram-wrapper"
      >
        <slot
          data-pictogram-placement="bottom"
          name="pictogram"
        >
        </slot>
      </div>
      <div
        class="cds--card__footer-wrapper"
        part="footer-wrapper"
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
  <div part="after">
  </div>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--card cds--feature-card__card cds--tile"
  part="container"
>
  <div
    class="cds--card__image-wrapper"
    part="image-wrapper"
  >
    <slot name="image">
      <c4d-image
        alt="video-name-foo"
        data-autoid="c4d--image"
        slot="image"
      >
      </c4d-image>
    </slot>
  </div>
  <div
    class="cds--card__wrapper"
    part="wrapper"
  >
    <div
      class="cds--card__content"
      part="content"
    >
      <div
        class="cds--card__eyebrow-wrapper cds--card__eyebrow-wrapper--empty"
        part="eyebrow-wrapper"
      >
        <slot name="eyebrow">
        </slot>
      </div>
      <div part="heading-wrapper">
        <slot name="heading">
          <c4d-card-heading
            aria-level="3"
            data-autoid="c4d--card-heading"
            role="heading"
            slot="heading"
          >
            video-name-foo-undefined
          </c4d-card-heading>
        </slot>
      </div>
      <div
        class="cds--card__copy"
        hidden=""
        part="copy"
      >
        <slot>
        </slot>
      </div>
      <div
        class="cds--card__pictogram-wrapper cds--card__pictogram-wrapper--empty"
        part="pictogram-wrapper"
      >
        <slot
          data-pictogram-placement="bottom"
          name="pictogram"
        >
        </slot>
      </div>
      <div
        class="cds--card__footer-wrapper"
        part="footer-wrapper"
      >
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
  <div part="after">
  </div>
</div>

```

