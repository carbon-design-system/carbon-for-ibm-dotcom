# `c4d-expressive-modal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div
      class="c4d-ce--modal__header--with-body"
<<<<<<< HEAD
      id="c4d--modal-header"
=======
      id="cds--modal-header"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
    >
      <slot name="header">
      </slot>
    </div>
    <div class="c4d-ce--modal__body c4d-ce--modal__body--with-footer">
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
  class="cds--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

####   `should render with various attributes`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div
      class="c4d-ce--modal__header--with-body"
<<<<<<< HEAD
      id="c4d--modal-header"
=======
      id="cds--modal-header"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
    >
      <slot name="header">
      </slot>
    </div>
    <div class="c4d-ce--modal__body c4d-ce--modal__body--with-footer">
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
  class="cds--visually-hidden"
  id="end-sentinel"
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
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div
      class="c4d-ce--modal__header--with-body"
<<<<<<< HEAD
      id="c4d--modal-header"
=======
      id="cds--modal-header"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
    >
      <slot name="header">
      </slot>
    </div>
    <div class="c4d-ce--modal__body">
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
  class="cds--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

####   `should render with header and body only`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div
      class="c4d-ce--modal__header--with-body"
<<<<<<< HEAD
      id="c4d--modal-header"
=======
      id="cds--modal-header"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
    >
      <slot name="header">
      </slot>
    </div>
    <div class="c4d-ce--modal__body">
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
  class="cds--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

####   `should render with header and footer only`

```
<button
  class="cds--visually-hidden"
  id="start-sentinel"
>
  START
</button>
<div
  aria-labelledby="c4d--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div
      class="c4d-ce--modal__header--with-body"
<<<<<<< HEAD
      id="c4d--modal-header"
=======
      id="cds--modal-header"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
    >
      <slot name="header">
      </slot>
    </div>
    <div class="c4d-ce--modal__body c4d-ce--modal__body--with-footer">
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
  class="cds--visually-hidden"
  id="end-sentinel"
>
  END
</button>

```

