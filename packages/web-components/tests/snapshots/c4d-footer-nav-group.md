# `c4d-footer-nav-group`

## `Misc attributes`

####   `should render with minimum attributes for narrow screen`

```
<h2 class="cds--footer-nav-group__title">
  <slot name="title">
  </slot>
</h2>
<div
  class="cds--accordion__content"
  id="content"
>
  <ul>
    <slot>
    </slot>
  </ul>
</div>

```

####   `should render with minimum attributes for wide screen`

```
<button
  aria-controls="content"
  aria-expanded="false"
  class="cds--accordion__heading"
  type="button"
>
  <div class="cds--accordion__title">
    <slot name="title">
    </slot>
  </div>
</button>
<div
  class="cds--accordion__content"
  id="content"
>
  <ul>
    <slot>
    </slot>
  </ul>
</div>

```

####   `should render with various attributes for narrow screen`

```
<h2 class="cds--footer-nav-group__title">
  <slot name="title">
    title-text-foo
  </slot>
</h2>
<div
  class="cds--accordion__content"
  id="content"
>
  <ul>
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
  type="button"
>
  <div class="cds--accordion__title">
    <slot name="title">
      title-text-foo
    </slot>
  </div>
</button>
<div
  class="cds--accordion__content"
  id="content"
>
  <ul>
    <slot>
    </slot>
  </ul>
</div>

```

