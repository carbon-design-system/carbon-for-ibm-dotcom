# `dds-feature-card-block-medium`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<div
  class="bx--feature-card"
  data-autoid="dds--feature-card"
>
  <slot name="image">
  </slot>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <slot name="eyebrow">
      </slot>
      <h3 class="bx--card__heading">
        <slot>
        </slot>
      </h3>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<slot name="heading">
</slot>
<div
  class="bx--feature-card"
  data-autoid="dds--feature-card"
>
  <a
    class="bx--card bx--card--link bx--feature-card__card bx--tile bx--tile--clickable"
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
        <h3 class="bx--card__heading">
          <slot>
          </slot>
        </h3>
        <slot name="footer">
        </slot>
      </div>
    </div>
  </a>
</div>

```

