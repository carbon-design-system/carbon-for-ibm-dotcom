# `dds-card-in-card`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--card-in-card__container">
  <slot name="image">
  </slot>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <slot name="eyebrow">
      </slot>
      <slot
        data-pictogram-placement="top"
        name="pictogram"
      >
      </slot>
      <slot name="heading">
      </slot>
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
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--card-in-card__container">
  <a
    class="bx--card bx--card--link bx--card-in-card bx--feature-card__card bx--tile bx--tile--clickable"
    href="https://example.com"
    id="link"
    part="link"
  >
    <slot name="image">
    </slot>
    <div class="bx--card__wrapper">
      <div class="bx--card__content">
        <slot name="eyebrow">
        </slot>
        <slot
          data-pictogram-placement="top"
          name="pictogram"
        >
        </slot>
        <slot name="heading">
        </slot>
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
    </div>
  </a>
</div>

```

