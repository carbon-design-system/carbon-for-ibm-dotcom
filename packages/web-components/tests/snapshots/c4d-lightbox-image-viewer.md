# `c4d-lightbox-image-viewer`

#### `should render with minimum attributes`

```
<div
  class="c4d--lightbox-media-viewer__container"
  part="container"
>
  <div
    class="c4d--lightbox-media-viewer__row"
    part="row"
  >
    <div
      class="c4d--lightbox-media-viewer__media"
      part="media"
    >
      <img
        alt=""
        class="c4d--image__img"
        loading="lazy"
        part="image"
        src=""
      >
    </div>
    <div
      class="c4d--lightbox-media-viewer__media-description"
      part="content-wrapper"
    >
      <div
        class="c4d--lightbox-media-viewer__content"
        part="content"
      >
        <div
          class="c4d--lightbox-media-viewer__content__title"
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
          </slot>
        </div>
        <div
          class="c4d--lightbox-media-viewer__content__desc"
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
<div
  class="c4d--lightbox-media-viewer__container"
  part="container"
>
  <div
    class="c4d--lightbox-media-viewer__row"
    part="row"
  >
    <div
      class="c4d--lightbox-media-viewer__media"
      part="media"
    >
      <img
        alt="image-alt-foo"
        class="c4d--image__img"
        loading="lazy"
        part="image"
        src="https://example.com/image"
      >
    </div>
    <div
      class="c4d--lightbox-media-viewer__media-description"
      part="content-wrapper"
    >
      <div
        class="c4d--lightbox-media-viewer__content"
        part="content"
      >
        <div
          class="c4d--lightbox-media-viewer__content__title"
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
            image-title-foo
          </slot>
        </div>
        <div
          class="c4d--lightbox-media-viewer__content__desc"
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

