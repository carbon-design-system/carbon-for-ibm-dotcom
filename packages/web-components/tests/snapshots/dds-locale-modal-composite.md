# `dds-locale-modal-composite`

## `Misc attributes`

####   `should render minimum attributes`

```
<dds-locale-modal
  close-button-assistive-text="Close modal"
  data-autoid="dds--locale-modal"
  header-title="Select geographic area"
>
  <dds-regions
    data-autoid="dds--regions"
    title="Select geographic area"
  >
  </dds-regions>
</dds-locale-modal>

```

####   `should render various attributes`

```
<dds-locale-modal
  close-button-assistive-text="modal-close-foo"
  data-autoid="dds--locale-modal"
  header-title="header-title-foo"
  lang-display="lang-display-foo"
  open=""
>
  <dds-regions
    data-autoid="dds--regions"
    title="header-title-foo"
  >
    <dds-region-item name="region-name-foo">
    </dds-region-item>
    <dds-region-item name="region-name-bar">
    </dds-region-item>
  </dds-regions>
</dds-locale-modal>

```

