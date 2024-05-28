# `c4d-content-item`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div part="heading">
  <div
    class="c4d--content-item__statitics"
    hidden=""
    part="statistics"
  >
    <slot name="statistics">
    </slot>
  </div>
  <div
    class="c4d--content-item__media"
    hidden=""
    part="media"
  >
    <slot name="media">
    </slot>
  </div>
  <div>
    <slot name="heading">
    </slot>
    <slot>
    </slot>
    <div
      class="cds--content-item__cta"
      hidden=""
      part="cta"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div part="heading">
  <div
    class="c4d--content-item__statitics"
    hidden=""
    part="statistics"
  >
    <slot name="statistics">
    </slot>
  </div>
  <div
    class="c4d--content-item__media"
    part="media"
  >
    <slot name="media">
    </slot>
  </div>
  <div>
    <slot name="heading">
    </slot>
    <slot>
    </slot>
    <div
      class="cds--content-item__cta"
      part="cta"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

