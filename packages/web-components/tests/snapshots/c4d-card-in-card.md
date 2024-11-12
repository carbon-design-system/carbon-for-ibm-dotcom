# `c4d-card-in-card`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div
  class="cds--card cds--card-in-card cds--tile"
  part="container"
>
  <slot name="image">
  </slot>
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
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--card cds--card--link cds--card-in-card cds--tile cds--tile--clickable"
  part="container"
>
  <slot name="image">
  </slot>
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
</div>

```

