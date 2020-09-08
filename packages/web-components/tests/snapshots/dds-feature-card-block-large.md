# `dds-feature-card-block-large`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--feature-card-block-large__container">
  <slot name="image">
  </slot>
  <div class="bx--card__wrapper">
    <p
      class="bx--card__eyebrow"
      hidden=""
    >
      <slot name="eyebrow">
      </slot>
    </p>
    <h3
      class="bx--card__heading"
      hidden=""
    >
      <slot name="heading">
      </slot>
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

```

####   `should render with various attributes`

```
<div class="bx--feature-card-block-large__container">
  <a
    class="bx--card bx--card--inverse bx--card--link bx--feature-card-block-large bx--link bx--tile bx--tile--clickable"
    href="https://example.com"
    id="link"
  >
    <slot name="image">
    </slot>
    <div class="bx--card__wrapper">
      <p
        class="bx--card__eyebrow"
        hidden=""
      >
        <slot name="eyebrow">
        </slot>
      </p>
      <h3
        class="bx--card__heading"
        hidden=""
      >
        <slot name="heading">
        </slot>
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
  </a>
</div>

```

