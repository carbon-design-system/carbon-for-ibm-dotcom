# `c4d-tabs-extended`

## `Misc attributes`

####   `should render with minimum attributes`

```
<button
  aria-hidden="true"
  class="cds--tab--overflow-nav-button cds--tab--overflow-nav-button--hidden cds--tab--overflow-nav-button--previous cds--tabs__nav-caret-left"
  part="prev-button"
  tabindex="-1"
>
</button>
<div class="cds--tabs-nav-content-container">
  <div
    class="cds--tabs-nav-content"
    style="inset-inline-start: 0px;"
  >
    <div class="cds--tabs-nav">
      <div
        class="cds--tab--list"
        id="tablist"
        role="tablist"
      >
        <div class="cds--sub-content-left">
        </div>
        <slot>
        </slot>
        <div class="cds--sub-content-right">
        </div>
      </div>
    </div>
  </div>
</div>
<button
  aria-hidden="true"
  class="cds--tab--overflow-nav-button cds--tab--overflow-nav-button--hidden cds--tab--overflow-nav-button--next cds--tabs__nav-caret-right"
  part="next-button"
  tabindex="-1"
>
</button>
<div
  aria-live="assertive"
  aria-relevant="additions text"
  class="cds--assistive-text"
  role="status"
>
</div>

```

####   `should render with various attributes`

```
<button
  aria-hidden="true"
  class="cds--tab--overflow-nav-button cds--tab--overflow-nav-button--hidden cds--tab--overflow-nav-button--previous cds--tabs__nav-caret-left"
  part="prev-button"
  tabindex="-1"
>
</button>
<div class="cds--tabs-nav-content-container">
  <div
    class="cds--tabs-nav-content"
    style="inset-inline-start: 0px;"
  >
    <div class="cds--tabs-nav">
      <div
        class="cds--tab--list"
        id="tablist"
        role="tablist"
      >
        <div class="cds--sub-content-left">
        </div>
        <slot>
        </slot>
        <div class="cds--sub-content-right">
        </div>
      </div>
    </div>
  </div>
</div>
<button
  aria-hidden="true"
  class="cds--tab--overflow-nav-button cds--tab--overflow-nav-button--hidden cds--tab--overflow-nav-button--next cds--tabs__nav-caret-right"
  part="next-button"
  tabindex="-1"
>
</button>
<div
  aria-live="assertive"
  aria-relevant="additions text"
  class="cds--assistive-text"
  role="status"
>
</div>

```

