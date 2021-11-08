# `dds-button-group`

#### `renders dds-button-group properly`

```
<slot>
</slot>

```

#### `renders dds-button-group-item properly`

```
<a
  class="bx--btn bx--btn--expressive bx--btn--primary"
  href="https://example.com"
  id="button"
  part="button"
  role="button"
>
  <slot>
  </slot>
  <p
    aria-hidden="true"
    class="bx--btn--hidden"
  >
    (https://example.com)
  </p>
  <slot name="icon">
  </slot>
</a>

```

