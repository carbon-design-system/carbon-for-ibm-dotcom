# `c4d-locale-modal`

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
    <div id="cds--modal-header">
      <c4d-expressive-modal-header data-autoid="c4d--expressive-modal-header">
        <c4d-expressive-modal-close-button data-autoid="c4d--expressive-modal-close-button">
        </c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading
          aria-level="2"
          data-autoid="c4d--expressive-modal-heading"
          role="heading"
        >
        </c4d-expressive-modal-heading>
      </c4d-expressive-modal-header>
    </div>
    <div class="c4d--locale-modal cds--modal-content">
      <slot name="regions-selector">
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
    <div id="cds--modal-header">
      <c4d-expressive-modal-header data-autoid="c4d--expressive-modal-header">
        <c4d-expressive-modal-close-button data-autoid="c4d--expressive-modal-close-button">
        </c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading
          aria-level="2"
          data-autoid="c4d--expressive-modal-heading"
          role="heading"
        >
          <p class="cds--modal-header__label cds--type-delta">
            lang-display-foo
          </p>
          <p class="cds--modal-header__heading cds--type-beta">
            header-title-foo
          </p>
        </c4d-expressive-modal-heading>
      </c4d-expressive-modal-header>
    </div>
    <div class="c4d--locale-modal cds--modal-content">
      <slot name="regions-selector">
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

####   `should render locale selector`

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
    <div id="cds--modal-header">
      <c4d-expressive-modal-header
        close-button=""
        data-autoid="c4d--expressive-modal-header"
        slot="header"
      >
        <c4d-expressive-modal-close-button
          data-autoid="c4d--expressive-modal-close-button"
          size=""
        >
        </c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading
          aria-level="2"
          data-autoid="c4d--expressive-modal-heading"
          role="heading"
        >
          <c4d-link-with-icon
            data-autoid="c4d--link-with-icon"
            href="#"
            icon-placement="left"
          >
            header-title-foo
          </c4d-link-with-icon>
          <p
            class="cds--modal-header__heading cds--type-beta"
            tabindex="0"
          >
            region-foo
          </p>
        </c4d-expressive-modal-heading>
      </c4d-expressive-modal-header>
    </div>
    <slot name="locales-selector">
    </slot>
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

