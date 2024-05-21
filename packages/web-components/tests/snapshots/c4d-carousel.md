# `c4d-carousel`

## `Rendering`

####   `should render with minimum attributes`

```
<div
  aria-labelledby="carousel-title"
  part="region"
  role="region"
>
  <div
    id="carousel-title"
    part="title"
  >
    <slot name="title">
      <span class="cds--visually-hidden">
        Carousel
      </span>
    </slot>
  </div>
  <div
    class="cds--carousel__scroll-container"
    part="scroll-container"
  >
    <div
      class="cds--carousel__scroll-contents"
      part="contents"
      style="inset-inline-start: 0px;"
    >
      <slot>
      </slot>
    </div>
  </div>
  <nav
    aria-label="Carousel Navigation"
    class="cds--carousel__navigation"
    part="navigation"
  >
    <button
      aria-label="previous"
      class="cds--btn cds--btn--icon-only cds--btn--tertiary cds--carousel__navigation__btn"
      disabled=""
      part="prev-button"
      title="previous"
    >
    </button>
    <span
      aria-hidden="true"
      class="cds--carousel__navigation__status"
      part="status"
    >
      1 / 0
    </span>
    <span
      aria-live="polite"
      class="cds--visually-hidden"
    >
    </span>
    <button
      aria-label="next"
      class="cds--btn cds--btn--icon-only cds--btn--tertiary cds--carousel__navigation__btn"
      disabled=""
      part="next-button"
      title="next"
    >
    </button>
  </nav>
</div>

```

