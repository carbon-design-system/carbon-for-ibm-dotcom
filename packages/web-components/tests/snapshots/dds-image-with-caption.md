# `dds-image-with-caption`

## `Misc attributes`

####   `should render with minimum attributes`

```
<dds-image
  alt=""
  data-autoid="dds--image"
  default-src=""
>
  <slot>
  </slot>
</dds-image>
<p class="bx--image__caption">
</p>

```

####   `should render with various attributes`

```
<button
  aria-label="launch light box media viewer"
  class="bx--image-with-caption__image"
>
  <dds-image
    alt="Image alt text"
    data-autoid="dds--image"
    default-src="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"
  >
    <slot>
    </slot>
  </dds-image>
  <div class="bx--image-with-caption__zoom-button">
  </div>
</button>
<p class="bx--image__caption">
  This is a heading
</p>

```

