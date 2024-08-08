# `c4d-lightbox-video-player`

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
      <div
        class="c4d--video-player"
        part="video-player"
      >
        <div
          class="c4d--video-player__video-container"
          part="video-container"
        >
          <slot>
          </slot>
        </div>
      </div>
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
            <h2 style="all: inherit;">
            </h2>
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
      <div
        class="c4d--video-player"
        part="video-player"
      >
        <div
          class="c4d--video-player__video-container"
          part="video-container"
        >
          <slot>
          </slot>
        </div>
      </div>
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
            <h2 style="all: inherit;">
              video-name-foo (0:30 min)
            </h2>
          </slot>
        </div>
        <div
          class="c4d--lightbox-media-viewer__content__desc"
          data-autoid="c4d--lightbox-media-viewer__content__desc"
          part="description"
        >
          <slot name="description">
            video-description-foo
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

