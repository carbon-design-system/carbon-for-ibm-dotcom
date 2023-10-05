# `c4d-image`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot>
</slot>
<picture>
  <img
    alt=""
    aria-describedby="image-caption long-description"
    class="cds--image__img"
    loading="lazy"
    part="image"
    src=""
  >
</picture>
<div
  class="cds--image__longdescription"
  id="long-description"
>
  <slot name="long-description">
  </slot>
</div>
<slot name="icon">
</slot>

```

####   `should render with various attributes`

```
<slot>
</slot>
<picture>
  <img
    alt=""
    aria-describedby="image-caption long-description"
    class="cds--image__img"
    loading="lazy"
    part="image"
    src=""
  >
</picture>
<div
  class="cds--image__longdescription"
  id="long-description"
>
  <slot name="long-description">
  </slot>
</div>
<slot name="icon">
</slot>

```

