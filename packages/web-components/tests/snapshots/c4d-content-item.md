# `c4d-content-item`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div>
  <div
    class="c4d--content-item__statitics"
    hidden=""
  >
    <slot name="statistics">
    </slot>
  </div>
  <div
    class="c4d--content-item__media"
    hidden=""
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
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div>
  <div
    class="c4d--content-item__statitics"
    hidden=""
  >
    <slot name="statistics">
    </slot>
  </div>
  <div class="c4d--content-item__media">
    <slot name="media">
    </slot>
  </div>
  <div>
    <slot name="heading">
    </slot>
    <slot>
    </slot>
    <div class="cds--content-item__cta">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

