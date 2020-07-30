# `dds-region-item`

## `Misc attributes`

#### `should render with various attributes`

```
<a
  class="bx--link"
  href="about:blank"
  id="button"
  role="button"
>
  <div class="bx--card__wrapper">
    <h3 class="bx--card__heading">
      <slot>
        name-foo
      </slot>
    </h3>
    <div class="bx--card__footer">
    </div>
  </div>
</a>

```

#### `should render with invalid state`

```
<a
  class="bx--link"
  href="#"
  id="button"
  role="button"
>
  <div class="bx--card__wrapper">
    <h3 class="bx--card__heading">
      <slot>
        name-foo
      </slot>
    </h3>
    <div class="bx--card__footer">
    </div>
  </div>
</a>

```
