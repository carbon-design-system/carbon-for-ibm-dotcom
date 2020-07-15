# `dds-lightbox-video-player`

#### `should render with minimum attributes`

```
<div class="bx--lightbox-media-viewer__row">
  <div class="bx--lightbox-media-viewer__media bx--no-gutter">
    <div class="bx--video-player">
      <div class="bx--video-player__video-container">
        <slot>
        </slot>
      </div>
    </div>
  </div>
  <div class="bx--lightbox-media-viewer__media-description bx--no-gutter">
    <div class="bx--lightbox-media-viewer__content">
      <div class="bx--lightbox-media-viewer__content__title">
        <slot name="name">
        </slot>
      </div>
      <div class="bx--lightbox-media-viewer__content__desc">
        <slot name="description">
        </slot>
      </div>
    </div>
  </div>
</div>

```

#### `should render with various attributes`

```
<div class="bx--lightbox-media-viewer__row">
  <div class="bx--lightbox-media-viewer__media bx--no-gutter">
    <div class="bx--video-player">
      <div class="bx--video-player__video-container">
        <slot>
        </slot>
      </div>
    </div>
  </div>
  <div class="bx--lightbox-media-viewer__media-description bx--no-gutter">
    <div class="bx--lightbox-media-viewer__content">
      <div class="bx--lightbox-media-viewer__content__title">
        <slot name="name">
          video-name-foo (0:30)
        </slot>
      </div>
      <div class="bx--lightbox-media-viewer__content__desc">
        <slot name="description">
          video-description-foo
        </slot>
      </div>
    </div>
  </div>
</div>

```
