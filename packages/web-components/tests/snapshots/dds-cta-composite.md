# `dds-cta-composite`

## `Text CTA`

####   `should render default type`

```
<dds-cta-composite cta-style="text">
  <dds-text-cta
    data-autoid="dds--link-with-icon"
    href="https://www.example.com"
  >
    <span>
      copy-foo
    </span>
  </dds-text-cta>
</dds-cta-composite>

```

####   `should render local type`

```
<dds-cta-composite cta-style="text">
  <dds-text-cta
    data-autoid="dds--link-with-icon"
    href="https://www.example.com"
    type="local"
  >
    <span>
      copy-foo
    </span>
  </dds-text-cta>
</dds-cta-composite>

```

####   `should render download type`

```
<dds-cta-composite cta-style="text">
  <dds-text-cta
    data-autoid="dds--link-with-icon"
    download="IBM_Annual_Report_2019.pdf"
    href="https://www.example.com"
    type="download"
  >
    <span>
      copy-foo
    </span>
  </dds-text-cta>
</dds-cta-composite>

```

####   `should render jump type`

```
<dds-cta-composite cta-style="text">
  <dds-text-cta
    data-autoid="dds--link-with-icon"
    href="#example"
    type="jump"
  >
    <span>
      copy-foo
    </span>
  </dds-text-cta>
</dds-cta-composite>

```

####   `should render external type`

```
<dds-cta-composite cta-style="text">
  <dds-text-cta
    data-autoid="dds--link-with-icon"
    href="https://www.example.com"
    type="external"
  >
    <span>
      copy-foo
    </span>
  </dds-text-cta>
</dds-cta-composite>

```

####   `should render video type`

```
<dds-cta-composite cta-style="text">
  <dds-text-cta
    data-autoid="dds--link-with-icon"
    href="0_uka1msg4"
    type="video"
  >
    <span>
      copy-foo
    </span>
  </dds-text-cta>
</dds-cta-composite>

```

## `Handling video type`

####   `should render the media viewer`

```
<div>
  <dds-lightbox-video-player-composite>
  </dds-lightbox-video-player-composite>
</div>

```

