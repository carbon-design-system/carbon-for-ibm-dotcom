# `dds-locale-search`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--locale-modal__filter">
  <div class="bx--locale-modal__search">
    <dds-search
      close-button-assistive-text=""
      color-scheme="light"
      data-autoid="dds--locale-modal__filter"
      label-text=""
      part="searchbox"
      placeholder=""
      size="xl"
    >
    </dds-search>
    <p class="bx--locale-modal__search-text">
      This page is available in the following locations and languages
    </p>
  </div>
  <div
    class="bx--locale-modal__list"
    role="listbox"
  >
    <slot>
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--locale-modal__filter">
  <div class="bx--locale-modal__search">
    <dds-search
      close-button-assistive-text="close-button-assistive-text-foo"
      color-scheme="light"
      data-autoid="dds--locale-modal__filter"
      label-text="label-text-foo"
      part="searchbox"
      placeholder="placeholder-foo"
      size="xl"
    >
    </dds-search>
    <p class="bx--locale-modal__search-text">
      availability-label-text-foo
    </p>
  </div>
  <div
    class="bx--locale-modal__list"
    role="listbox"
  >
    <slot>
    </slot>
  </div>
</div>

```

