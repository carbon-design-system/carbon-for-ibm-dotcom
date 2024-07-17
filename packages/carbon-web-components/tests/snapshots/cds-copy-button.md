# `cds-copy-button`

## `Rendering`

####   `Should render with minimum attributes`

```
<cds-copy
  button-class-name="cds--copy-btn"
  feedback="Copied!"
  feedback-timeout="2000"
  part="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>

```

####   `Should render with various attributes`

```
<cds-copy
  button-class-name="cds--copy-btn"
  feedback="feedback-text-foo"
  feedback-timeout="16"
  part="button"
>
  <slot slot="tooltip-content">
  </slot>
</cds-copy>

```

