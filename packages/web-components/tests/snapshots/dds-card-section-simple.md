# `dds-card-section-simple`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-section__grid">
  <div class="bx--content-section__row">
    <div class="bx--content-section__left">
      <h2 class="bx--content-section__heading">
        <slot name="heading">
        </slot>
      </h2>
      <h2>
      </h2>
    </div>
    <div class="bx--content-section__children">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-section__grid">
  <div class="bx--content-section__row">
    <div class="bx--content-section__left">
      <h2 class="bx--content-section__heading">
        <slot name="heading">
          heading-foo
        </slot>
      </h2>
      <h2>
      </h2>
    </div>
    <div class="bx--content-section__children">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

