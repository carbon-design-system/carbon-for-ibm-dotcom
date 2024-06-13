# `c4d-image`

## `Misc attributes`

####   `should render with minimum attributes`

```
<slot>
</slot>
<picture part="picture">
  <img
    alt=""
    aria-describedby="image-caption long-description"
    class="c4d--image__img"
    loading="lazy"
    part="image"
    src=""
  >
</picture>
<div
  class="c4d--image__longdescription"
  id="long-description"
  part="long-description"
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
<picture part="picture">
  <img
    alt=""
    aria-describedby="image-caption long-description"
    class="c4d--image__img"
    loading="lazy"
    part="image"
    src=""
  >
</picture>
<div
  class="c4d--image__longdescription"
  id="long-description"
  part="long-description"
>
  <slot name="long-description">
  </slot>
</div>
<slot name="icon">
</slot>

```

