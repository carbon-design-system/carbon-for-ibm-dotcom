# `dds-feature-card-block-medium`

## `Misc attributes`

####   `should render with minimum attributes`

```
<h3
  class="bx--feature-card-block-medium__heading"
  hidden=""
>
  <slot name="heading">
  </slot>
</h3>
<div
  class="bx--feature-card"
  data-autoid="dds--feature-card"
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
    <h3 class="bx--card__heading">
      <slot>
      </slot>
    </h3>
    <slot name="footer">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<h3
  class="bx--feature-card-block-medium__heading"
  hidden=""
>
  <slot name="heading">
  </slot>
</h3>
<div
  class="bx--feature-card"
  data-autoid="dds--feature-card"
>
  <a
    class="bx--card bx--card--inverse bx--card--link bx--feature-card bx--tile bx--tile--clickable"
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
      <h3 class="bx--card__heading">
        <slot>
        </slot>
      </h3>
      <slot name="footer">
      </slot>
    </div>
  </a>
</div>

```

