# `c4d-callout-quote`

#### `Renders as expected`

```
<div
  class="cds--callout__column"
  part="column"
>
  <div
    class="cds--callout__content"
    part="content"
  >
    <div
      class="cds--quote__container"
      part="container"
    >
      <div
        class="cds--quote__wrapper"
        part="wrapper"
      >
        <span class="cds--quote__mark">
          “
        </span>
        <blockquote class="cds--quote__copy">
          <slot>
          </slot>
          <span class="cds--quote__mark-closing">
            ”
          </span>
        </blockquote>
        <div
          class="cds--quote__source"
          hidden=""
        >
          <slot name="source-heading">
          </slot>
          <slot name="source-copy">
          </slot>
          <slot name="source-bottom-copy">
          </slot>
        </div>
        <div
          class="cds--quote__footer"
          hidden=""
        >
          <c4d-hr
            data-autoid="c4d--hr"
            role="separator"
          >
          </c4d-hr>
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

