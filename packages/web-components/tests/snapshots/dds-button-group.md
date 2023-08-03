# `dds-button-group`

#### `renders dds-button-group properly`

```
<slot>
</slot>

```

#### `renders dds-button-group-item properly`

```
<a
  class="cds--btn cds--btn--expressive cds--btn--primary"
  href="https://example.com"
  id="button"
  part="button"
  role="button"
>
  <slot>
  </slot>
  <p
    aria-hidden="true"
    class="cds--btn--hidden"
  >
    <span>
      :
    </span>
    https://example.com
  </p>
  <slot name="icon">
  </slot>
</a>

```

