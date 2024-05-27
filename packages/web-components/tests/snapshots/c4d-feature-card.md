# `c4d-feature-card`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--card cds--feature-card__card cds--tile">
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
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
      <div
        class="cds--card__copy"
        hidden=""
        part="copy"
      >
        <slot>
        </slot>
      </div>
      <slot
        data-pictogram-placement="bottom"
        name="pictogram"
      >
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="cds--card cds--card--link cds--feature-card__card cds--tile cds--tile--clickable">
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
      <slot name="eyebrow">
      </slot>
      <slot name="heading">
      </slot>
      <div
        class="cds--card__copy"
        hidden=""
        part="copy"
      >
        <slot>
        </slot>
      </div>
      <slot
        data-pictogram-placement="bottom"
        name="pictogram"
      >
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

