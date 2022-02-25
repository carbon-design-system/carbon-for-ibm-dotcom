# `dds-region-item`

## `Misc attributes`

####   `should render with various attributes`

```
<button
  class="bx--link"
  id="link"
  type="button"
>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <h3 class="bx--card__heading">
        <slot>
          name-foo
        </slot>
      </h3>
      <div class="bx--card__footer">
      </div>
    </div>
  </div>
</button>

```

####   `should render with invalid state`

```
<button
  class="bx--link bx--link--disabled"
  disabled=""
  id="link"
  type="button"
>
  <div class="bx--card__wrapper">
    <div class="bx--card__content">
      <h3 class="bx--card__heading">
        <slot>
          name-foo
        </slot>
      </h3>
      <div class="bx--card__footer">
      </div>
    </div>
  </div>
</button>

```

