# `c4d-region-item`

## `Misc attributes`

####   `should render with various attributes`

```
<button
  class="cds--link cds--link--md"
  id="link"
  type="button"
>
  <div class="cds--card__wrapper">
    <div class="cds--card__content">
      <h3 class="cds--card__heading">
        <slot>
          name-foo
        </slot>
      </h3>
      <div class="cds--card__footer">
      </div>
    </div>
  </div>
</button>

```

####   `should render with invalid state`

```
<button
  class="cds--link cds--link--disabled cds--link--md"
  disabled=""
  id="link"
  type="button"
>
  <div class="cds--card__wrapper">
    <div class="cds--card__content">
      <h3 class="cds--card__heading">
        <slot>
          name-foo
        </slot>
      </h3>
      <div class="cds--card__footer">
      </div>
    </div>
  </div>
</button>

```

