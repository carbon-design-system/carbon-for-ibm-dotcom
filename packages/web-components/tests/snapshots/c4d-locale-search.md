# `c4d-locale-search`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="c4d--locale-modal__filter">
  <div class="c4d--locale-modal__search">
    <cds-search
      close-button-assistive-text=""
      data-autoid="c4d--locale-modal__filter"
      label-text=""
      part="searchbox"
      placeholder=""
      size="lg"
    >
    </cds-search>
    <div
      aria-live="polite"
      class="cds--visually-hidden"
    >
      0 results
    </div>
    <p class="c4d--locale-modal__search-text">
      This page is available in the following locations and languages
    </p>
  </div>
  <div
    class="c4d--locale-modal__list"
    role="list"
  >
    <slot>
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="c4d--locale-modal__filter">
  <div class="c4d--locale-modal__search">
    <cds-search
      close-button-assistive-text="close-button-assistive-text-foo"
      data-autoid="c4d--locale-modal__filter"
      label-text="label-text-foo"
      part="searchbox"
      placeholder="placeholder-foo"
      size="lg"
    >
    </cds-search>
    <div
      aria-live="polite"
      class="cds--visually-hidden"
    >
      0 results
    </div>
    <p class="c4d--locale-modal__search-text">
      availability-label-text-foo
    </p>
  </div>
  <div
    class="c4d--locale-modal__list"
    role="list"
  >
    <slot>
    </slot>
  </div>
</div>

```

