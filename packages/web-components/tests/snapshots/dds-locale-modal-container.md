# `dds-locale-modal-container`

## `Misc attributes`

####   `should render minimum attributes`

```
<dds-locale-modal
  data-auto-id="dds--locale-modal"
  tabindex="0"
>
  <dds-regions>
  </dds-regions>
  <dds-locale-search placeholder="Search by location or language">
  </dds-locale-search>
</dds-locale-modal>

```

####   `should render various attributes`

```
<dds-locale-modal
  data-auto-id="dds--locale-modal"
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
  <dds-locale-search placeholder="search-placeholder-foo">
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

