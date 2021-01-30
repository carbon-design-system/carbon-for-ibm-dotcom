# `dds-content-block-cards`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-layout bx--content-layout--card-group">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <slot>
    </slot>
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-layout bx--content-layout--card-group">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <slot>
    </slot>
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

