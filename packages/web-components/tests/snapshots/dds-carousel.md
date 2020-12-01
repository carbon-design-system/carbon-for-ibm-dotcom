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
    class="bx--btn bx--btn--icon-only bx--btn--secondary bx--carousel__navigation__btn"
    disabled=""
    part="prev-button"
  >
  </button>
  1 / 0
  <button
    class="bx--btn bx--btn--icon-only bx--btn--secondary bx--carousel__navigation__btn"
    disabled=""
    part="next-button"
  >
  </button>
</div>

```

