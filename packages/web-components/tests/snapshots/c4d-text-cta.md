# `c4d-text-cta`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="cds--link cds--link--lg cds--link-with-icon cds--link-with-icon--inline-icon cds--link-with-icon__icon-right"
  id="link"
  part="link"
  tabindex="0"
>
  <span>
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
  class="cds--link cds--link--lg cds--link-with-icon cds--link-with-icon--inline-icon cds--link-with-icon__icon-right"
  href="#"
  id="link"
  part="link"
  tabindex="0"
  target="_blank"
>
  <span>
    <slot>
    </slot>
    video-name-foo-caption
  </span>
  <slot name="icon">
    <span class="bx--visually-hidden">
      - This link plays a video
    </span>
  </slot>
</a>

```

