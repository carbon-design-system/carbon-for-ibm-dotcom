# `dds-image-with-caption`

## `Misc attributes`

####   `should render with minimum attributes`

```
<dds-image
  alt=""
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
    default-src="https://dummyimage.com/672x336/ee5396/161616&text=2:1"
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

