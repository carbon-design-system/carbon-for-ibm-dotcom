# `dds-content-item-horizontal`

## `Misc attributes - Default`

####   `should render with minimum attributes`

```
<div
  class="bx--content-item-horizontal__heading-wrapper"
  part="heading-wrapper"
>
  <slot name="eyebrow">
  </slot>
  <slot name="heading">
  </slot>
</div>
<div
  class="bx--content-item-horizontal__content-wrapper"
  part="content-wrapper"
>
  <slot>
  </slot>
  <div
    class="bx--content-item__cta"
    hidden=""
    part="footer-wrapper"
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
  class="bx--content-item-horizontal__heading-wrapper"
  part="heading-wrapper"
>
  <slot name="eyebrow">
  </slot>
  <slot name="heading">
  </slot>
</div>
<div
  class="bx--content-item-horizontal__content-wrapper"
  part="content-wrapper"
>
  <slot>
  </slot>
  <div
    class="bx--content-item__cta"
    hidden=""
    part="footer-wrapper"
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
  class="bx--content-item-horizontal-media__align-right bx--content-item-horizontal__row"
  part="row row--content"
>
  <div
    class="bx--content-item-horizontal__col"
    part="text-column-content-wrapper"
  >
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
    <slot>
    </slot>
    <div
      class="bx--content-item__cta"
      hidden=""
      part="footer-wrapper"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
  <div
    class="bx--content-item-horizontal__col"
    part="media-wrapper"
  >
    <slot name="media">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div
  class="bx--content-item-horizontal-media__align-right bx--content-item-horizontal__row"
  part="row row--content"
>
  <div
    class="bx--content-item-horizontal__col"
    part="text-column-content-wrapper"
  >
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
    <slot>
    </slot>
    <div
      class="bx--content-item__cta"
      hidden=""
      part="footer-wrapper"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
  <div
    class="bx--content-item-horizontal__col"
    part="media-wrapper"
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
  class="bx--content-item-horizontal__row"
  part="row row--text"
>
  <div
    class="bx--content-item-horizontal__col"
    part="heading-wrapper"
  >
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
  </div>
  <div
    class="bx--content-item-horizontal__col"
    part="body-wrapper"
  >
    <slot>
    </slot>
    <div
      class="bx--content-item__cta"
      hidden=""
      part="footer-wrapper"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<div
  class="bx--content-item-horizontal__row"
  part="row row--media"
>
  <slot name="media">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div
  class="bx--content-item-horizontal__row"
  part="row row--text"
>
  <div
    class="bx--content-item-horizontal__col"
    part="heading-wrapper"
  >
    <slot name="eyebrow">
    </slot>
    <slot name="heading">
    </slot>
  </div>
  <div
    class="bx--content-item-horizontal__col"
    part="body-wrapper"
  >
    <slot>
    </slot>
    <div
      class="bx--content-item__cta"
      hidden=""
      part="footer-wrapper"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<div
  class="bx--content-item-horizontal__row"
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
  class="bx--content-item-horizontal__body-wrapper"
  part="body-wrapper"
>
  <div
    class="bx--content-item-horizontal__heading-wrapper"
    part="heading-wrapper"
  >
    <slot name="heading">
    </slot>
  </div>
  <div
    class="bx--content-item-horizontal__content-wrapper"
    part="content-wrapper"
  >
    <slot>
    </slot>
    <div
      class="bx--content-item__cta"
      hidden=""
      part="footer-wrapper"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<div
  class="bx--content-item-horizontal__col--2"
  part="thumbnail-wrapper"
>
  <slot name="thumbnail">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div
  class="bx--content-item-horizontal__body-wrapper"
  part="body-wrapper"
>
  <div
    class="bx--content-item-horizontal__heading-wrapper"
    part="heading-wrapper"
  >
    <slot name="heading">
    </slot>
  </div>
  <div
    class="bx--content-item-horizontal__content-wrapper"
    part="content-wrapper"
  >
    <slot>
    </slot>
    <div
      class="bx--content-item__cta"
      hidden=""
      part="footer-wrapper"
    >
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<div
  class="bx--content-item-horizontal__col--2"
  part="thumbnail-wrapper"
>
  <slot name="thumbnail">
  </slot>
</div>

```

