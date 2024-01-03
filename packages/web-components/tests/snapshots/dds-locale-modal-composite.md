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
  <dds-locale-search
    availability-label-text="This page is available in the following locations and languages"
    close-button-assistive-text="Clear search input"
    data-autoid="dds--locale-search"
    label-text="Search by location or language"
    placeholder="Search by location or language"
    unavailability-label-text="This page is unavailable in your preferred location or language"
  >
  </dds-locale-search>
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
  <dds-locale-search
    availability-label-text="availability-text-foo"
    close-button-assistive-text="search-clear-text-foo"
    data-autoid="dds--locale-search"
    label-text="search-label-foo"
    placeholder="search-placeholder-foo"
    unavailability-label-text="unavailability-text-foo"
  >
  </dds-locale-search>
</dds-locale-modal>

```

