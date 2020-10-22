# `dds-logo-grid`

#### `renders dds-logo-grid properly`

```
<slot name="heading">
</slot>
<div class="bx--content-block__children">
  <div class="bx--logo-grid__row">
    <slot>
    </slot>
  </div>
</div>
<div
  class="bx--content-block__cta-row"
  hidden=""
>
  <div class="bx--content-block__cta bx--content-block__cta-col">
    <slot name="cta">
    </slot>
  </div>
</div>
<slot name="complementary">
</slot>

```

#### `renders dds-logo-grid-item properly`

```
<a
  class="bx--logo-grid__link"
  href="https://example.com"
  target="_blank"
>
  <div class="bx--logo-grid__logo">
    <slot>
    </slot>
    <picture>
      <img
        alt=""
        aria-describedby="long-description"
        class="bx--image__img"
        src="https://dummyimage.com/288x216/ee5396/161616&text=1:1"
      >
    </picture>
    <div
      class="bx--image__longdescription"
      id="long-description"
    >
      <slot name="long-description">
      </slot>
    </div>
    <slot name="icon">
    </slot>
  </div>
</a>

```

