# `c4d-lightbox-image-viewer`

#### `should render with minimum attributes`

```
<div class="cds--lightbox-media-viewer__container">
  <div class="cds--lightbox-media-viewer__row">
    <div class="cds--lightbox-media-viewer__media cds--no-gutter">
      <img
        alt=""
        class="cds--image__img"
        loading="lazy"
        src=""
      >
    </div>
    <div class="cds--lightbox-media-viewer__media-description cds--no-gutter">
      <div class="cds--lightbox-media-viewer__content">
        <div
          class="cds--lightbox-media-viewer__content__title"
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
          </slot>
        </div>
        <div
          class="cds--lightbox-media-viewer__content__desc"
          data-autoid="c4d--lightbox-media-viewer__content__desc"
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
<div class="cds--lightbox-media-viewer__container">
  <div class="cds--lightbox-media-viewer__row">
    <div class="cds--lightbox-media-viewer__media cds--no-gutter">
      <img
        alt="image-alt-foo"
        class="cds--image__img"
        loading="lazy"
        src="https://example.com/image"
      >
    </div>
    <div class="cds--lightbox-media-viewer__media-description cds--no-gutter">
      <div class="cds--lightbox-media-viewer__content">
        <div
          class="cds--lightbox-media-viewer__content__title"
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
            image-title-foo
          </slot>
        </div>
        <div
          class="cds--lightbox-media-viewer__content__desc"
          data-autoid="c4d--lightbox-media-viewer__content__desc"
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

