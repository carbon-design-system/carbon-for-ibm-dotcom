# `c4d-content-item-horizontal`

## `Misc attributes - Default`

####   `should render with minimum attributes`

```
<div class="cds--content-item-horizontal__heading-wrapper">
  <slot name="eyebrow">
  </slot>
  <slot name="heading">
  </slot>
</div>
<div class="cds--content-item-horizontal__content-wrapper">
  <slot>
  </slot>
  <div
    class="cds--content-item__cta"
    hidden=""
  >
    <slot name="footer">
    </slot>
  </div>
  <slot name="media">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div class="cds--content-item-horizontal__heading-wrapper">
  <slot name="eyebrow">
  </slot>
  <slot name="heading">
  </slot>
</div>
<div class="cds--content-item-horizontal__content-wrapper">
  <slot>
  </slot>
  <div
    class="cds--content-item__cta"
    hidden=""
  >
    <slot name="footer">
    </slot>
  </div>
  <slot name="media">
  </slot>
</div>

```

## `Misc attributes - WithMedia`

####   `should render with minimum attributes`

```
<div class="cds--content-item-horizontal-media__align-right cds--content-item-horizontal__row">
  <div class="cds--content-item-horizontal__col">
    <slot name="eyebrow">
    </slot>
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
  <div class="cds--content-item-horizontal__col">
    <slot name="media">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="cds--content-item-horizontal-media__align-right cds--content-item-horizontal__row">
  <div class="cds--content-item-horizontal__col">
    <slot name="eyebrow">
    </slot>
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
  <div class="cds--content-item-horizontal__col">
    <slot name="media">
    </slot>
  </div>
</div>

```

## `Misc attributes - WithFeaturedMedia`

####   `should render with minimum attributes`

```
<div class="cds--content-item-horizontal__row">
  <div class="cds--content-item-horizontal__col">
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
  </div>
  <div class="cds--content-item-horizontal__col">
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
<div class="cds--content-item-horizontal__row">
  <slot name="media">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div class="cds--content-item-horizontal__row">
  <div class="cds--content-item-horizontal__col">
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
  </div>
  <div class="cds--content-item-horizontal__col">
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
<div class="cds--content-item-horizontal__row">
  <slot name="media">
  </slot>
</div>

```

## `Misc attributes - WithThumbnail`

####   `should render with minimum attributes`

```
<div class="cds--content-item-horizontal__body-wrapper">
  <div class="cds--content-item-horizontal__heading-wrapper">
    <slot name="heading">
    </slot>
  </div>
  <div class="cds--content-item-horizontal__content-wrapper">
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
<div class="cds--content-item-horizontal__col--2">
  <slot name="thumbnail">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div class="cds--content-item-horizontal__body-wrapper">
  <div class="cds--content-item-horizontal__heading-wrapper">
    <slot name="heading">
    </slot>
  </div>
  <div class="cds--content-item-horizontal__content-wrapper">
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
<div class="cds--content-item-horizontal__col--2">
  <slot name="thumbnail">
  </slot>
</div>

```

