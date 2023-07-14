# `dds-callout-quote`

#### `Renders as expected`

```
<div class="bx--callout__column">
  <div class="bx--callout__content">
    <div class="bx--quote__container">
      <div class="bx--quote__wrapper">
        <span class="bx--quote__mark">
          “
        </span>
        <blockquote class="bx--quote__copy">
          <slot>
          </slot>
          <span class="bx--quote__mark-closing">
            ”
          </span>
        </blockquote>
        <div
          class="bx--quote__source"
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
          class="bx--quote__footer"
          hidden=""
        >
          <dds-hr
            data-autoid="dds--hr"
            role="separator"
          >
          </dds-hr>
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

