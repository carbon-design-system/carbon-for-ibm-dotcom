# `c4d-locale-modal`

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
      id="cds--modal-header"
      part="header-container"
    >
      <c4d-expressive-modal-header
        data-autoid="c4d--expressive-modal-header"
        part="header"
      >
        <c4d-expressive-modal-close-button
          data-autoid="c4d--expressive-modal-close-button"
          part="close-button"
        >
        </c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading
          aria-level="2"
          data-autoid="c4d--expressive-modal-heading"
          part="heading"
          role="heading"
        >
        </c4d-expressive-modal-heading>
      </c4d-expressive-modal-header>
    </div>
    <div
      class="c4d--locale-modal cds--modal-content"
      part="modal-content"
    >
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
      id="cds--modal-header"
      part="header-container"
    >
      <c4d-expressive-modal-header
        data-autoid="c4d--expressive-modal-header"
        part="header"
      >
        <c4d-expressive-modal-close-button
          data-autoid="c4d--expressive-modal-close-button"
          part="close-button"
        >
        </c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading
          aria-level="2"
          data-autoid="c4d--expressive-modal-heading"
          part="heading"
          role="heading"
        >
          <p
            class="cds--modal-header__label cds--type-delta"
            part="header-label"
          >
            lang-display-foo
          </p>
          <p
            class="cds--modal-header__heading cds--type-beta"
            part="title"
          >
            header-title-foo
          </p>
        </c4d-expressive-modal-heading>
      </c4d-expressive-modal-header>
    </div>
    <div
      class="c4d--locale-modal cds--modal-content"
      part="modal-content"
    >
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
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

####   `should render locale selector`

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
      id="cds--modal-header"
      part="header-container"
    >
      <c4d-expressive-modal-header
        close-button=""
        data-autoid="c4d--expressive-modal-header"
        part="header"
        slot="header"
      >
        <c4d-expressive-modal-close-button
          data-autoid="c4d--expressive-modal-close-button"
          part="close-button"
          size=""
        >
        </c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading
          aria-level="2"
          data-autoid="c4d--expressive-modal-heading"
          part="heading"
          role="heading"
        >
          <c4d-link-with-icon
            data-autoid="c4d--link-with-icon"
            href="#"
            icon-placement="left"
            part="link-with-icon"
          >
            header-title-foo
          </c4d-link-with-icon>
          <p
            class="cds--modal-header__heading cds--type-beta"
            part="link-heading"
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
  part="sentinel-button sentinel-button--end"
>
  END
</button>

```

