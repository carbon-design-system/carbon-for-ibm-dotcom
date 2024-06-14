# `c4d-video-player`

#### `should render with minimum attributes`

```
<div class="c4d--video-player__video-container">
  <div
    class="c4d--video-player__video"
    part="video"
  >
    <button
      class="c4d--video-player__image-overlay"
      part="button"
    >
      <c4d-image
        alt=""
        data-autoid="c4d--image"
        default-src="about:blank"
        part="image"
      >
      </c4d-image>
    </button>
  </div>
</div>
<div
  class="c4d--video-player__video-caption"
  part="caption"
>
</div>

```

#### `should render with various attributes`

```
<div class="c4d--video-player__video-container">
  <slot>
  </slot>
</div>
<div
  class="c4d--video-player__video-caption"
  part="caption"
>
  video-name-foo (0:30 min)
</div>

```

