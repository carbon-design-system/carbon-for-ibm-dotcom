# `dds-content-group-simple`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<slot>
</slot>
<div class="bx--content-group__children bx--content-group__col">
  <div>
    <slot name="media">
    </slot>
  </div>
  <slot>
  </slot>
</div>
<div
  class="bx--content-group__cta-row"
  hidden=""
>
  <div class="bx--content-group__cta bx--content-group__cta-col">
    <slot name="footer">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<slot name="heading">
</slot>
<slot>
</slot>
<div class="bx--content-group__children bx--content-group__col">
  <div>
    <slot name="media">
    </slot>
  </div>
  <slot>
  </slot>
</div>
<div class="bx--content-group__cta-row">
  <div class="bx--content-group__cta bx--content-group__cta-col">
    <slot name="footer">
    </slot>
  </div>
</div>

```

