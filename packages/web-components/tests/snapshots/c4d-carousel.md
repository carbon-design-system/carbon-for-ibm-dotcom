# `c4d-carousel`

## `Rendering`

####   `should render with minimum attributes`

```
<div
  aria-labelledby="carousel-title"
  role="region"
>
  <div id="carousel-title">
    <slot name="title">
      <span class="cds--visually-hidden">
        Carousel
      </span>
    </slot>
  </div>
  <div class="c4d--carousel__scroll-container">
    <div
      class="c4d--carousel__scroll-contents"
      style="left:0px"
    >
      <slot>
      </slot>
    </div>
  </div>
  <nav
    aria-label="Carousel Navigation"
    class="c4d--carousel__navigation"
  >
    <button
      aria-label="previous"
      class="cds--btn cds--btn--icon-only cds--btn--tertiary c4d--carousel__navigation__btn"
      disabled=""
      part="prev-button"
      title="previous"
    >
    </button>
    <span
      aria-hidden="true"
      class="bx--carousel__navigation__status"
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
      class="cds--btn cds--btn--icon-only cds--btn--tertiary c4d--carousel__navigation__btn"
      disabled=""
      part="next-button"
      title="next"
    >
    </button>
  </nav>
</div>

```

