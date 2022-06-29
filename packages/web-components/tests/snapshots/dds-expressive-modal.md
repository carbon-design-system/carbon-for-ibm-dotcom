# `dds-expressive-modal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<button
  class="bx--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="modal-header"
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <div
      class="dds-ce--modal__header--with-body"
      id="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div class="dds-ce--modal__body dds-ce--modal__body--with-footer">
      <slot>
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="bx--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

####   `should render with various attributes`

```
<button
  class="bx--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="modal-header"
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <div
      class="dds-ce--modal__header--with-body"
      id="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div class="dds-ce--modal__body dds-ce--modal__body--with-footer">
      <slot>
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="bx--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

## `Misc contents`

####   `should render with header only`

```
<button
  class="bx--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="modal-header"
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <div id="modal-header">
      <slot name="header">
      </slot>
    </div>
    <div class="dds-ce--modal__body">
      <slot>
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="bx--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

####   `should render with header and body only`

```
<button
  class="bx--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="modal-header"
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <div
      class="dds-ce--modal__header--with-body"
      id="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div class="dds-ce--modal__body">
      <slot>
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="bx--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

####   `should render with header and footer only`

```
<button
  class="bx--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="modal-header"
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <div
      class="dds-ce--modal__header--with-body"
      id="modal-header"
    >
      <slot name="header">
      </slot>
    </div>
    <div class="dds-ce--modal__body">
      <slot>
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<button
  class="bx--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

