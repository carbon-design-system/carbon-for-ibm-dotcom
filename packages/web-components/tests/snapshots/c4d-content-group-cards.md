# `c4d-content-group-cards`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="cds--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div
      class="cds--content-group__children cds--content-group__col"
      hidden=""
    >
      <div class="cds--content-group-cards-group cds--grid--condensed">
        <div class="cds--content-group-cards__row">
          <slot>
          </slot>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      hidden=""
      style=""
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div class="cds--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="cds--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div
      class="cds--content-group__children cds--content-group__col"
      hidden=""
    >
      <div class="cds--content-group-cards-group cds--grid--condensed">
        <div class="cds--content-group-cards__row">
          <slot>
          </slot>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      hidden=""
      style=""
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

