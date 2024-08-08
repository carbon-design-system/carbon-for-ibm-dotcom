# `c4d-card-section-simple`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div
  class="cds--content-section cds--content-section-layout"
  part="layout"
>
  <div
    class="cds--content-section__leading"
    part="leading"
  >
    <slot name="heading">
    </slot>
    <slot name="copy">
    </slot>
    <slot name="footer">
    </slot>
  </div>
  <div
    class="cds--content-section__body"
    part="body"
  >
    <slot>
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--content-section cds--content-section-layout"
  part="layout"
>
  <div
    class="cds--content-section__leading"
    part="leading"
  >
    <slot name="heading">
    </slot>
    <slot name="copy">
    </slot>
    <slot name="footer">
    </slot>
  </div>
  <div
    class="cds--content-section__body"
    part="body"
  >
    <slot>
    </slot>
  </div>
</div>

```

