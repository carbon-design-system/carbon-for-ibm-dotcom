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
          <slot name="copy">
          </slot>
          <span class="bx--quote__mark-closing">
            ”
          </span>
        </blockquote>
        <div
          class="bx--quote__source"
          hidden=""
        >
          <p class="bx--quote__source-heading">
            <slot name="source-heading">
            </slot>
          </p>
          <p class="bx--quote__source-body">
            <slot name="source-copy">
            </slot>
          </p>
          <p
            class="bx--quote__source-optional-copy"
            hidden=""
          >
            <slot name="source-bottom-copy">
            </slot>
          </p>
        </div>
        <div
          class="bx--quote__footer"
          hidden=""
        >
          <dds-hr data-autoid="dds--hr">
          </dds-hr>
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

