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
<<<<<<< HEAD
  <div class="c4d--carousel__scroll-container">
    <div
      class="c4d--carousel__scroll-contents"
      style="left:0px"
=======
  <div class="cds--carousel__scroll-container">
    <div
      class="cds--carousel__scroll-contents"
      style="inset-inline-start: 0px;"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
    >
      <slot>
      </slot>
    </div>
  </div>
  <nav
    aria-label="Carousel Navigation"
<<<<<<< HEAD
    class="c4d--carousel__navigation"
  >
    <button
      aria-label="previous"
      class="cds--btn cds--btn--icon-only cds--btn--tertiary c4d--carousel__navigation__btn"
=======
    class="cds--carousel__navigation"
  >
    <button
      aria-label="previous"
      class="cds--btn cds--btn--icon-only cds--btn--tertiary cds--carousel__navigation__btn"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
      disabled=""
      part="prev-button"
      title="previous"
    >
    </button>
    <span
      aria-hidden="true"
<<<<<<< HEAD
      class="bx--carousel__navigation__status"
=======
      class="cds--carousel__navigation__status"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
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
<<<<<<< HEAD
      class="cds--btn cds--btn--icon-only cds--btn--tertiary c4d--carousel__navigation__btn"
=======
      class="cds--btn cds--btn--icon-only cds--btn--tertiary cds--carousel__navigation__btn"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
      disabled=""
      part="next-button"
      title="next"
    >
    </button>
  </nav>
</div>

```

