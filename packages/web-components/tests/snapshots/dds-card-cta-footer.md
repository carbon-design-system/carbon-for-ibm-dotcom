# `dds-card-cta-footer`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  aria-label=""
  class="cds--card__footer cds--link cds--link--lg cds--link-with-icon cds--link-with-icon--inline-icon cds--link-with-icon__icon-right dds-ce--card__footer"
  id="link"
  part="link"
  tabindex="0"
>
  <span
    class="cds--card__cta__copy"
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
  class="cds--card__footer cds--link cds--link--lg cds--link-with-icon cds--link-with-icon--inline-icon cds--link-with-icon__icon-right dds-ce--card__footer"
  href="#"
  id="link"
  part="link"
  tabindex="0"
>
  <span class="cds--card__cta__copy">
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

