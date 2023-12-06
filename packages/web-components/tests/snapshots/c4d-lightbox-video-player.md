# `c4d-lightbox-video-player`

#### `should render with minimum attributes`

```
<div class="cds--lightbox-media-viewer__container">
  <div class="cds--lightbox-media-viewer__row">
    <div class="cds--lightbox-media-viewer__media cds--no-gutter">
      <div class="cds--video-player">
        <div class="cds--video-player__video-container">
          <slot>
          </slot>
        </div>
      </div>
    </div>
    <div class="cds--lightbox-media-viewer__media-description cds--no-gutter">
      <div class="cds--lightbox-media-viewer__content">
        <div
          class="cds--lightbox-media-viewer__content__title"
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
            <h2 style="all: inherit;">
            </h2>
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
      <div class="cds--video-player">
        <div class="cds--video-player__video-container">
          <slot>
          </slot>
        </div>
      </div>
    </div>
    <div class="cds--lightbox-media-viewer__media-description cds--no-gutter">
      <div class="cds--lightbox-media-viewer__content">
        <div
          class="cds--lightbox-media-viewer__content__title"
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
            <h2 style="all: inherit;">
              video-name-foo (0:30)
            </h2>
          </slot>
        </div>
        <div
          class="cds--lightbox-media-viewer__content__desc"
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

