# `dds-video-player`

#### `should render with minimum attributes`

```
<div class="bx--video-player__video-container">
  <div class="bx--video-player__video">
    <button class="bx--video-player__image-overlay">
      <dds-image
        alt=""
        default-src="data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E"
      >
      </dds-image>
    </button>
  </div>
</div>
<div class="bx--video-player__video-caption">
</div>

```

#### `should render with various attributes`

```
<div class="bx--video-player__video-container">
  <slot>
  </slot>
</div>
<div class="bx--video-player__video-caption">
  video-name-foo (0:30)
</div>

```

