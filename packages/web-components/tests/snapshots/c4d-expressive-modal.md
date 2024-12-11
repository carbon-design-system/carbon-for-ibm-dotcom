# `c4d-expressive-modal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
  part="sentinel-button sentinel-button--start"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  part="modal-container"
  role="dialog"
  tabindex="-1"
>
  <div
    class="cds--modal-content"
    part="modal-content"
  >
    <div
      class="c4d-ce--modal__header--with-body"
      id="cds--modal-header"
      part="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div
      class="c4d-ce--modal__body c4d-ce--modal__body--with-footer"
      part="modal-body"
    >
      <slot>
      </slot>
    </div>
    <div part="footer-container">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="cds--visually-hidden"
  id="end-sentinel"
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

####   `should render with various attributes`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
  part="sentinel-button sentinel-button--start"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  part="modal-container"
  role="dialog"
  tabindex="-1"
>
  <div
    class="cds--modal-content"
    part="modal-content"
  >
    <div
      class="c4d-ce--modal__header--with-body"
      id="cds--modal-header"
      part="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div
      class="c4d-ce--modal__body c4d-ce--modal__body--with-footer"
      part="modal-body"
    >
      <slot>
      </slot>
    </div>
    <div part="footer-container">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="cds--visually-hidden"
  id="end-sentinel"
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

## `Misc contents`

####   `should render with header only`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
  part="sentinel-button sentinel-button--start"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  part="modal-container"
  role="dialog"
  tabindex="-1"
>
  <div
    class="cds--modal-content"
    part="modal-content"
  >
    <div
      class="c4d-ce--modal__header--with-body"
      id="cds--modal-header"
      part="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div
      class="c4d-ce--modal__body"
      part="modal-body"
    >
      <slot>
      </slot>
    </div>
    <div part="footer-container">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="cds--visually-hidden"
  id="end-sentinel"
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

####   `should render with header and body only`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
  part="sentinel-button sentinel-button--start"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  part="modal-container"
  role="dialog"
  tabindex="-1"
>
  <div
    class="cds--modal-content"
    part="modal-content"
  >
    <div
      class="c4d-ce--modal__header--with-body"
      id="cds--modal-header"
      part="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div
      class="c4d-ce--modal__body"
      part="modal-body"
    >
      <slot>
      </slot>
    </div>
    <div part="footer-container">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="cds--visually-hidden"
  id="end-sentinel"
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

####   `should render with header and footer only`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
  part="sentinel-button sentinel-button--start"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  part="modal-container"
  role="dialog"
  tabindex="-1"
>
  <div
    class="cds--modal-content"
    part="modal-content"
  >
    <div
      class="c4d-ce--modal__header--with-body"
      id="cds--modal-header"
      part="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div
      class="c4d-ce--modal__body c4d-ce--modal__body--with-footer"
      part="modal-body"
    >
      <slot>
      </slot>
    </div>
    <div part="footer-container">
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="cds--visually-hidden"
  id="end-sentinel"
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

