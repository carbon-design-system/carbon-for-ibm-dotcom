# `c4d-video-player`

#### `should render with minimum attributes`

```
<div class="cds--video-player__video-container">
  <div class="cds--video-player__video">
    <button class="cds--video-player__image-overlay">
      <c4d-image
        alt=""
        data-autoid="c4d--image"
        default-src="about:blank"
      >
        [object Object]
      </c4d-image>
    </button>
  </div>
</div>
<div class="cds--video-player__video-caption">
</div>

```

#### `should render with various attributes`

```
<div class="cds--video-player__video-container">
  <slot>
  </slot>
</div>
<div class="cds--video-player__video-caption">
  video-name-foo (0:30)
</div>

```

