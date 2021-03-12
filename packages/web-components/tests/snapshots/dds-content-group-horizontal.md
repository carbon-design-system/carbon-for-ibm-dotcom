# `dds-content-group-horizontal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <slot>
    </slot>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>
<dds-hr data-autoid="dds--hr">
</dds-hr>

```

####   `should render with various attributes`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <slot>
    </slot>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>
<dds-hr data-autoid="dds--hr">
</dds-hr>

```

