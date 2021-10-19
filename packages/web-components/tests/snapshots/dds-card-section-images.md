# `dds-card-section-images`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-section bx--content-section-layout">
  <div class="bx--col-lg-4 bx--content-section__leading">
    <slot name="heading">
    </slot>
    <slot name="copy">
    </slot>
    <slot name="footer">
    </slot>
  </div>
  <div class="bx--content-section__body">
    <slot>
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-section bx--content-section-layout bx--content-section__with-children">
  <div class="bx--col-lg-4 bx--content-section__leading">
    <slot name="heading">
    </slot>
    <slot name="copy">
    </slot>
    <slot name="footer">
    </slot>
  </div>
  <div class="bx--content-section__body">
    <slot>
    </slot>
  </div>
</div>

```

