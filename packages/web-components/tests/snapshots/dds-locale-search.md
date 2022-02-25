# `dds-locale-search`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--locale-modal__filter">
  <div class="bx--locale-modal__search">
    <dds-search
      close-button-assistive-text=""
      color-scheme=""
      data-autoid="dds--locale-modal__filter"
      label-text=""
      part="searchbox"
      placeholder=""
      size="xl"
    >
    </dds-search>
    <div
      aria-live="polite"
      class="bx--visually-hidden"
    >
      0 results
    </div>
    <p class="bx--locale-modal__search-text">
      This page is available in the following locations and languages
    </p>
  </div>
  <div
    class="bx--locale-modal__list"
    role="list"
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
      color-scheme=""
      data-autoid="dds--locale-modal__filter"
      label-text="label-text-foo"
      part="searchbox"
      placeholder="placeholder-foo"
      size="xl"
    >
    </dds-search>
    <div
      aria-live="polite"
      class="bx--visually-hidden"
    >
      0 results
    </div>
    <p class="bx--locale-modal__search-text">
      availability-label-text-foo
    </p>
  </div>
  <div
    class="bx--locale-modal__list"
    role="list"
  >
    <slot>
    </slot>
  </div>
</div>

```

