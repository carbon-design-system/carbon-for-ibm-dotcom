# `dds-card-cta-footer`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  aria-label=""
  class="bx--card__footer bx--link-with-icon bx--link-with-icon--inline-icon bx--link-with-icon__icon-right cds--link cds--link--lg dds-ce--card__footer"
  id="link"
  part="link"
  tabindex="0"
>
  <span
    class="bx--card__cta__copy"
    hidden=""
  >
    <slot>
    </slot>
  </span>
  <slot name="icon">
    <span class="bx--visually-hidden">
    </span>
  </slot>
</a>

```

####   `should render with various attributes`

```
<a
  aria-label=" - This link plays a video"
  class="bx--card__footer bx--link-with-icon bx--link-with-icon--inline-icon bx--link-with-icon__icon-right cds--link cds--link--lg dds-ce--card__footer"
  href="#"
  id="link"
  part="link"
  tabindex="0"
>
  <span class="bx--card__cta__copy">
    <slot>
    </slot>
    undefined-180000
  </span>
  <slot name="icon">
    <span class="bx--visually-hidden">
      - This link plays a video
    </span>
  </slot>
</a>

```

