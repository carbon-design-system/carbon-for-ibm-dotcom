# `dds-lightbox-image-viewer`

#### `should render with minimum attributes`

```
<div class="bx--lightbox-media-viewer__container">
  <div class="bx--lightbox-media-viewer__row">
    <div class="bx--lightbox-media-viewer__media bx--no-gutter">
      <img
        alt=""
        class="bx--image__img"
        src=""
      >
    </div>
    <div class="bx--lightbox-media-viewer__media-description bx--no-gutter">
      <div class="bx--lightbox-media-viewer__content">
        <div
          class="bx--lightbox-media-viewer__content__title"
          data-autoid="dds--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
          </slot>
        </div>
        <div
          class="bx--lightbox-media-viewer__content__desc"
          data-autoid="dds--lightbox-media-viewer__content__desc"
          part="description"
        >
          <slot name="description">
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

#### `should render with various attributes`

```
<div class="bx--lightbox-media-viewer__container">
  <div class="bx--lightbox-media-viewer__row">
    <div class="bx--lightbox-media-viewer__media bx--no-gutter">
      <img
        alt="image-alt-foo"
        class="bx--image__img"
        src="https://example.com/image"
      >
    </div>
    <div class="bx--lightbox-media-viewer__media-description bx--no-gutter">
      <div class="bx--lightbox-media-viewer__content">
        <div
          class="bx--lightbox-media-viewer__content__title"
          data-autoid="dds--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
            image-title-foo
          </slot>
        </div>
        <div
          class="bx--lightbox-media-viewer__content__desc"
          data-autoid="dds--lightbox-media-viewer__content__desc"
          part="description"
        >
          <slot name="description">
            image-description-foo
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

