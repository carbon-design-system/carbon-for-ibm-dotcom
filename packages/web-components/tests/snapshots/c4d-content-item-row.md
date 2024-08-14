# `c4d-content-item-row`

## `Misc attributes - Default`

####   `should render with minimum attributes`

```
<div
  class="cds--content-item-row__heading-wrapper"
  part="heading-wrapper"
>
  <slot name="eyebrow">
  </slot>
  <slot name="heading">
  </slot>
</div>
<div
  class="cds--content-item-row__content-wrapper"
  part="content-wrapper"
>
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
  <slot name="media">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--content-item-row__heading-wrapper"
  part="heading-wrapper"
>
  <slot name="eyebrow">
  </slot>
  <slot name="heading">
  </slot>
</div>
<div
  class="cds--content-item-row__content-wrapper"
  part="content-wrapper"
>
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
  <slot name="media">
  </slot>
</div>

```

## `Misc attributes - WithMedia`

####   `should render with minimum attributes`

```
<div
  class="cds--content-item-row-media__align-right cds--content-item-row__row"
  part="row row--media"
>
  <div
    class="cds--content-item-row__col"
    part="col col--eyebrow"
  >
    <slot name="eyebrow">
    </slot>
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
  <div
    class="cds--content-item-row__col"
    part="col col--media"
  >
    <slot name="media">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--content-item-row-media__align-right cds--content-item-row__row"
  part="row row--media"
>
  <div
    class="cds--content-item-row__col"
    part="col col--eyebrow"
  >
    <slot name="eyebrow">
    </slot>
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
  <div
    class="cds--content-item-row__col"
    part="col col--media"
  >
    <slot name="media">
    </slot>
  </div>
</div>

```

## `Misc attributes - WithFeaturedMedia`

####   `should render with minimum attributes`

```
<div
  class="cds--content-item-row__row"
  part="row row--eyebrow"
>
  <div
    class="cds--content-item-row__col"
    part="col col--eyebrow"
  >
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
  </div>
  <div
    class="cds--content-item-row__col"
    part="col col--body"
  >
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
<div
  class="cds--content-item-row__row"
  part="row row--media"
>
  <slot name="media">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--content-item-row__row"
  part="row row--eyebrow"
>
  <div
    class="cds--content-item-row__col"
    part="col col--eyebrow"
  >
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
  </div>
  <div
    class="cds--content-item-row__col"
    part="col col--body"
  >
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
<div
  class="cds--content-item-row__row"
  part="row row--media"
>
  <slot name="media">
  </slot>
</div>

```

## `Misc attributes - WithThumbnail`

####   `should render with minimum attributes`

```
<div
  class="cds--content-item-row__body-wrapper"
  part="body-wrapper"
>
  <div
    class="cds--content-item-row__heading-wrapper"
    part="heading-wrapper"
  >
    <slot name="heading">
    </slot>
  </div>
  <div
    class="cds--content-item-row__content-wrapper"
    part="content-wrapper"
  >
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
<div
  class="cds--content-item-row__col--2"
  part="col col--2"
>
  <slot name="thumbnail">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--content-item-row__body-wrapper"
  part="body-wrapper"
>
  <div
    class="cds--content-item-row__heading-wrapper"
    part="heading-wrapper"
  >
    <slot name="heading">
    </slot>
  </div>
  <div
    class="cds--content-item-row__content-wrapper"
    part="content-wrapper"
  >
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
<div
  class="cds--content-item-row__col--2"
  part="col col--2"
>
  <slot name="thumbnail">
  </slot>
</div>

```

