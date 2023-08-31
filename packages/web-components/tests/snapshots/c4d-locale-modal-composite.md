# `c4d-locale-modal-composite`

## `Misc attributes`

####   `should render minimum attributes`

```
<c4d-locale-modal
  close-button-assistive-text="Close modal"
  data-autoid="c4d--locale-modal"
  header-title="Select geographic area"
>
  <c4d-regions
    data-autoid="c4d--regions"
    title="Select geographic area"
  >
  </c4d-regions>
  <c4d-locale-search
    availability-label-text="This page is available in the following locations and languages"
    close-button-assistive-text="Clear search input"
    data-autoid="c4d--locale-search"
    label-text="Search by location or language"
    placeholder="Search by location or language"
    unavailability-label-text="This page is unavailable in your preferred location or language"
  >
  </c4d-locale-search>
</c4d-locale-modal>

```

####   `should render various attributes`

```
<c4d-locale-modal
  close-button-assistive-text="modal-close-foo"
  data-autoid="c4d--locale-modal"
  header-title="header-title-foo"
  lang-display="lang-display-foo"
  open=""
>
  <c4d-regions
    data-autoid="c4d--regions"
    title="header-title-foo"
  >
    <c4d-region-item name="region-name-foo">
    </c4d-region-item>
    <c4d-region-item name="region-name-bar">
    </c4d-region-item>
  </c4d-regions>
  <c4d-locale-search
    availability-label-text="availability-text-foo"
    close-button-assistive-text="search-clear-text-foo"
    data-autoid="c4d--locale-search"
    label-text="search-label-foo"
    placeholder="search-placeholder-foo"
    unavailability-label-text="unavailability-text-foo"
  >
    <c4d-locale-item
      country="country-name-foo"
      href="https://example.com/locale-id-foo"
      language="language-foo"
      locale="locale-id-foo"
      region="region-name-foo"
    >
    </c4d-locale-item>
    <c4d-locale-item
      country="country-name-foo"
      href="https://example.com/locale-id-bar"
      language="language-bar"
      locale="locale-id-bar"
      region="region-name-foo"
    >
    </c4d-locale-item>
    <c4d-locale-item
      country="country-name-bar"
      href="https://example.com/locale-id-baz"
      language="language-baz"
      locale="locale-id-baz"
      region="region-name-bar"
    >
    </c4d-locale-item>
    <c4d-locale-item
      country="country-name-baz"
      href="https://example.com/locale-id-qux"
      language="language-qux"
      locale="locale-id-qux"
      region="region-name-bar"
    >
    </c4d-locale-item>
    <c4d-locale-item
      country="country-name-baz"
      href="https://example.com/locale-id-quux"
      language="language-quux"
      locale="locale-id-quux"
      region="region-name-bar"
    >
    </c4d-locale-item>
  </c4d-locale-search>
</c4d-locale-modal>

```

