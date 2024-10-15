# `c4d-footer-nav-group`

## `Misc attributes`

####   `should render with minimum attributes for narrow screen`

```
<h2
  class="cds--footer-nav-group__title"
  part="nav-group-title"
>
  <slot name="title">
  </slot>
</h2>
<div
  class="cds--accordion__content"
  id="content"
  part="accordion-content"
>
  <ul part="link-list">
    <slot>
    </slot>
  </ul>
</div>

```

####   `should render with various attributes for narrow screen`

```
<button
  aria-controls="content"
  aria-expanded="false"
  class="cds--accordion__heading"
  part="accordion-heading"
  type="button"
>
  <div
    class="cds--accordion__title"
    part="accordion-title"
  >
    <slot name="title">
    </slot>
  </div>
</button>
<div
  class="cds--accordion__content"
  id="content"
  part="accordion-content"
>
  <ul part="link-list">
    <slot>
    </slot>
  </ul>
</div>

```

####   `should render with various attributes for wide screen`

```
<h2
  class="cds--footer-nav-group__title"
  part="nav-group-title"
>
  <slot name="title">
    title-text-foo
  </slot>
</h2>
<div
  class="cds--accordion__content"
  id="content"
  part="accordion-content"
>
  <ul part="link-list">
    <slot>
    </slot>
  </ul>
</div>

```

####   `should render with various attributes for wide screen`

```
<button
  aria-controls="content"
  aria-expanded="true"
  class="cds--accordion__heading"
  part="accordion-heading"
  type="button"
>
  <div
    class="cds--accordion__title"
    part="accordion-title"
  >
    <slot name="title">
      title-text-foo
    </slot>
  </div>
</button>
<div
  class="cds--accordion__content"
  id="content"
  part="accordion-content"
>
  <ul part="link-list">
    <slot>
    </slot>
  </ul>
</div>

```

