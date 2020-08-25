# `dds-lightbox-video-player-container`

#### `should render the video player`

```
<dds-lightbox-video-player-container video-id="video-id-foo">
  <dds-modal
    data-autoid="dds--expressive-modal"
    expressive-size="full-width"
    size=""
    tabindex="0"
  >
    <bx-modal-close-button
      role="button"
      tabindex="0"
    >
    </bx-modal-close-button>
    <dds-lightbox-media-viewer-body>
      <dds-lightbox-video-player
        aria-label="video-name-foo (1:00)"
        duration="60000"
        name="video-name-foo"
      >
        <div
          data-autoplay="true"
          data-video-id="video-id-foo"
        >
        </div>
      </dds-lightbox-video-player>
    </dds-lightbox-media-viewer-body>
  </dds-modal>
</dds-lightbox-video-player-container>

```

