# `dds-carousel`

## `Rendering`

####   `should render with minimum attributes`

```
<div
  aria-labelledby="carousel-title"
  role="region"
>
  <div id="carousel-title">
    <slot name="title">
      <span
        aria-hidden="true"
        class="bx--visually-hidden"
      >
        Carousel
      </span>
    </slot>
  </div>
  <div class="bx--carousel__scroll-container">
    <div
      class="bx--carousel__scroll-contents"
      style="left:0px"
    >
      <slot>
      </slot>
    </div>
  </div>
  <nav
    aria-label="Carousel Navigation"
    class="bx--carousel__navigation"
  >
    <button
      aria-label="previous"
      class="bx--btn bx--btn--icon-only bx--btn--secondary bx--carousel__navigation__btn"
      disabled=""
      part="prev-button"
      title="previous"
    >
    </button>
    <span aria-hidden="true">
      1 / 0
    </span>
    <span
      aria-live="polite"
      class="bx--visually-hidden"
    >
    </span>
    <button
      aria-label="next"
      class="bx--btn bx--btn--icon-only bx--btn--secondary bx--carousel__navigation__btn"
      disabled=""
      part="next-button"
      title="next"
    >
    </button>
  </nav>
</div>

```

