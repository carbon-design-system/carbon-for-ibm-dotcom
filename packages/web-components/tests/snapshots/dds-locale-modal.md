# `dds-locale-modal`

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
  aria-labelledby="dds--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div id="dds--modal-header">
      <dds-expressive-modal-header data-autoid="dds--expressive-modal-header">
        <dds-expressive-modal-close-button data-autoid="dds--expressive-modal-close-button">
        </dds-expressive-modal-close-button>
        <dds-expressive-modal-heading
          aria-level="2"
          data-autoid="dds--expressive-modal-heading"
          role="heading"
        >
        </dds-expressive-modal-heading>
      </dds-expressive-modal-header>
    </div>
    <div class="cds--locale-modal cds--modal-content">
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
  aria-labelledby="dds--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div id="dds--modal-header">
      <dds-expressive-modal-header data-autoid="dds--expressive-modal-header">
        <dds-expressive-modal-close-button data-autoid="dds--expressive-modal-close-button">
        </dds-expressive-modal-close-button>
        <dds-expressive-modal-heading
          aria-level="2"
          data-autoid="dds--expressive-modal-heading"
          role="heading"
        >
          <p class="cds--modal-header__label cds--type-delta">
            lang-display-foo
          </p>
          <p class="bx--modal-header__heading bx--type-beta">
            header-title-foo
          </p>
        </dds-expressive-modal-heading>
      </dds-expressive-modal-header>
    </div>
    <div class="cds--locale-modal cds--modal-content">
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
  aria-labelledby="dds--modal-header"
  class="cds--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="cds--modal-content">
    <div id="dds--modal-header">
      <dds-expressive-modal-header
        data-autoid="dds--expressive-modal-header"
        slot="header"
      >
        <dds-expressive-modal-close-button
          data-autoid="dds--expressive-modal-close-button"
          size=""
        >
        </dds-expressive-modal-close-button>
        <dds-expressive-modal-heading
          aria-level="2"
          data-autoid="dds--expressive-modal-heading"
          role="heading"
        >
          <dds-link-with-icon
            data-autoid="dds--link-with-icon"
            href="#"
            icon-placement="left"
          >
            header-title-foo
          </dds-link-with-icon>
          <p
            class="bx--modal-header__heading bx--type-beta"
            tabindex="0"
          >
            region-foo
          </p>
        </dds-expressive-modal-heading>
      </dds-expressive-modal-header>
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

