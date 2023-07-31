# `dds-link-with-icon`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link-with-icon cds--link cds--link--lg"
  id="link"
  part="link"
  tabindex="0"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
  </slot>
</a>

```

####   `should render with various attributes`

```
<p
  class="bx--link-with-icon cds--link cds--link--disabled cds--link--lg"
  id="link"
  part="link"
>
  <span>
    <slot>
    </slot>
  </span>
  <slot name="icon">
  </slot>
</p>

```

