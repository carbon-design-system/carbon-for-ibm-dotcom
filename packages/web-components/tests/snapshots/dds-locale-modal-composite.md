# `dds-locale-modal-composite`

## `Misc attributes`

####   `should render minimum attributes`

```
<dds-locale-modal
  close-button-assistive-text="Close modal"
  data-autoid="dds--locale-modal"
  header-title="Select region"
  tabindex="0"
>
  <dds-regions>
  </dds-regions>
  <dds-locale-search
    availability-label-text="This page is available in the following locations and languages"
    close-button-assistive-text="Clear search input"
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
  tabindex="0"
>
  <dds-regions>
    <dds-region-item name="region-name-foo">
    </dds-region-item>
    <dds-region-item name="region-name-bar">
    </dds-region-item>
  </dds-regions>
  <dds-locale-search
    availability-label-text="availability-text-foo"
    close-button-assistive-text="search-clear-text-foo"
    label-text="search-label-foo"
    placeholder="search-placeholder-foo"
    unavailability-label-text="unavailability-text-foo"
  >
    <dds-locale-item
      country="country-name-foo"
      href="https://example.com/locale-id-foo"
      language="language-foo"
      locale="locale-id-foo"
      region="region-name-foo"
    >
    </dds-locale-item>
    <dds-locale-item
      country="country-name-foo"
      href="https://example.com/locale-id-bar"
      language="language-bar"
      locale="locale-id-bar"
      region="region-name-foo"
    >
    </dds-locale-item>
    <dds-locale-item
      country="country-name-bar"
      href="https://example.com/locale-id-baz"
      language="language-baz"
      locale="locale-id-baz"
      region="region-name-bar"
    >
    </dds-locale-item>
    <dds-locale-item
      country="country-name-baz"
      href="https://example.com/locale-id-qux"
      language="language-qux"
      locale="locale-id-qux"
      region="region-name-bar"
    >
    </dds-locale-item>
    <dds-locale-item
      country="country-name-baz"
      href="https://example.com/locale-id-quux"
      language="language-quux"
      locale="locale-id-quux"
      region="region-name-bar"
    >
    </dds-locale-item>
  </dds-locale-search>
</dds-locale-modal>

```

