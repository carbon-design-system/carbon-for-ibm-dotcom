# `dds-cta-container`

## `Text CTA`

#### `should render default type`

```
<dds-cta-container cta-style="text">
  <dds-text-cta
    data-auto-id="dds--link-with-icon"
    href="https://www.example.com"
  >
    copy-foo
  </dds-text-cta>
</dds-cta-container>

```

#### `should render local type`

```
<dds-cta-container cta-style="text">
  <dds-text-cta
    data-auto-id="dds--link-with-icon"
    href="https://www.example.com"
    type="local"
  >
    copy-foo
  </dds-text-cta>
</dds-cta-container>

```

#### `should render download type`

```
<dds-cta-container cta-style="text">
  <dds-text-cta
    data-auto-id="dds--link-with-icon"
    download="IBM_Annual_Report_2019.pdf"
    href="https://www.example.com"
    type="download"
  >
    copy-foo
  </dds-text-cta>
</dds-cta-container>

```

#### `should render jump type`

```
<dds-cta-container cta-style="text">
  <dds-text-cta
    data-auto-id="dds--link-with-icon"
    href="#example"
    type="jump"
  >
    copy-foo
  </dds-text-cta>
</dds-cta-container>

```

#### `should render external type`

```
<dds-cta-container cta-style="text">
  <dds-text-cta
    data-auto-id="dds--link-with-icon"
    href="https://www.example.com"
    type="external"
  >
    copy-foo
  </dds-text-cta>
</dds-cta-container>

```

#### `should render video type`

```
<dds-cta-container cta-style="text">
  <dds-text-cta
    data-auto-id="dds--link-with-icon"
    href="0_uka1msg4"
    type="video"
  >
    copy-foo
  </dds-text-cta>
</dds-cta-container>

```

## `Handling video type`

#### `should render the media viewer`

```
<div>
  <dds-lightbox-video-player-container>
    <dds-modal
      data-auto-id="dds--expressive-modal"
      size="full-width"
      tabindex="0"
    >
      <bx-modal-close-button
        role="button"
        tabindex="0"
      >
      </bx-modal-close-button>
      <dds-lightbox-media-viewer-body>
      </dds-lightbox-media-viewer-body>
    </dds-modal>
  </dds-lightbox-video-player-container>
</div>

```
