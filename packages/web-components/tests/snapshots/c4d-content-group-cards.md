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
      part="children"
    >
      <div
        class="cds--content-group-cards-group cds--grid--condensed"
        part="cards-group"
      >
        <div
          class="cds--content-group-cards__row"
          part="cards-row"
        >
          <slot>
          </slot>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      class="false"
      grid-mode=""
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
      part="children"
    >
      <div
        class="cds--content-group-cards-group cds--grid--condensed"
        part="cards-group"
      >
        <div
          class="cds--content-group-cards__row"
          part="cards-row"
        >
          <slot>
          </slot>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      class="false"
      grid-mode=""
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

