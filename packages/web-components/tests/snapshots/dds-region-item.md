# `dds-region-item`

## `Misc attributes`

####   `should render with various attributes`

```
<a
  class="bx--link"
  href="about:blank"
  id="link"
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
</a>

```

####   `should render with invalid state`

```
<div
  class="bx--link bx--link--disabled"
  id="link"
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
</div>

```

