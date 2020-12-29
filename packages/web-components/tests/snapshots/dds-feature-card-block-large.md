# `dds-feature-card-block-large`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--feature-card-block-large__container">
  <slot name="image">
  </slot>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <p
        class="bx--card__eyebrow"
        hidden=""
      >
        <slot name="eyebrow">
        </slot>
      </p>
      <slot
        data-pictogram-placement="top"
        name="pictogram"
      >
      </slot>
      <h3
        class="bx--card__heading"
        hidden=""
      >
        <span>
          <slot name="heading">
          </slot>
        </span>
      </h3>
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
<div class="bx--feature-card-block-large__container">
  <a
    class="bx--card bx--card--link bx--feature-card-block-large bx--feature-card__card bx--tile bx--tile--clickable"
    href="https://example.com"
    id="link"
    part="link"
  >
    <slot name="image">
    </slot>
    <div class="bx--card__wrapper">
      <div class="bx--card__content">
        <p
          class="bx--card__eyebrow"
          hidden=""
        >
          <slot name="eyebrow">
          </slot>
        </p>
        <slot
          data-pictogram-placement="top"
          name="pictogram"
        >
        </slot>
        <h3
          class="bx--card__heading"
          hidden=""
        >
          <span>
            <slot name="heading">
            </slot>
          </span>
        </h3>
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

