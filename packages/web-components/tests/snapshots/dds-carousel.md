# `dds-carousel`

## `Rendering`

####   `should render with minimum attributes`

```
<div class="bx--carousel__scroll-container">
  <div
    class="bx--carousel__scroll-contents"
    style="left:0px"
  >
    <slot>
    </slot>
  </div>
</div>
<div class="bx--carousel__navigation">
  <button
    aria-label="Previous page"
    class="bx--btn bx--btn--icon-only bx--btn--tertiary bx--carousel__navigation__btn"
    disabled=""
    part="prev-button"
    title="Previous page"
  >
  </button>
  1 / 0
  <button
    aria-label="Next page"
    class="bx--btn bx--btn--icon-only bx--btn--tertiary bx--carousel__navigation__btn"
    disabled=""
    part="next-button"
    title="Next page"
  >
  </button>
</div>

```

