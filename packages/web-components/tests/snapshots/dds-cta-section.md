# `dds-cta-section`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot name="heading">
</slot>
<slot name="copy">
</slot>
<div
  class="bx--content-item__cta"
  hidden=""
>
  <slot name="action">
  </slot>
</div>
<slot name="link-list">
</slot>
<div
  class="bx--helper-wrapper"
  hidden=""
>
  <div class="bx--content-item-wrapper">
    <slot>
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

####   `CTA block should render with minimum attributes`

```
<div class="bx--content-section__grid">
  <div class="bx--content-section__row">
    <div class="bx--content-section__heading">
      <slot name="heading">
      </slot>
    </div>
    <div class="bx--content-section__children">
      <div class="bx--cta-block__heading">
        <slot name="group-heading">
        </slot>
      </div>
      <div class="bx--cta-block__items">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<slot name="heading">
</slot>
<slot name="copy">
</slot>
<div class="bx--content-item__cta">
  <slot name="action">
  </slot>
</div>
<slot name="link-list">
</slot>
<div
  class="bx--helper-wrapper"
  hidden=""
>
  <div class="bx--content-item-wrapper">
    <slot>
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

####   `CTA block should render with various attributes`

```
<div class="bx--content-section__grid">
  <div class="bx--content-section__row">
    <div class="bx--content-section__heading">
      <slot name="heading">
      </slot>
    </div>
    <div class="bx--content-section__children">
      <div class="bx--cta-block__heading">
        <slot name="group-heading">
        </slot>
      </div>
      <div class="bx--cta-block__items">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>

```

