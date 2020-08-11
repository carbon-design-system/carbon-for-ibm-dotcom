# `dds-locale-modal`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--visually-hidden"
  href="javascript:void 0"
  id="start-sentinel"
  role="navigation"
>
</a>
<div
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <dds-modal-header>
      <dds-modal-close-button
        role="button"
        tabindex="0"
      >
      </dds-modal-close-button>
      <dds-modal-heading>
      </dds-modal-heading>
    </dds-modal-header>
    <div class="bx--locale-modal bx--modal-content">
      <slot name="regions-selector">
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<a
  class="bx--visually-hidden"
  href="javascript:void 0"
  id="end-sentinel"
  role="navigation"
>
</a>

```

####   `should render with various attributes`

```
<a
  class="bx--visually-hidden"
  href="javascript:void 0"
  id="start-sentinel"
  role="navigation"
>
</a>
<div
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <dds-modal-header>
      <dds-modal-close-button
        role="button"
        tabindex="0"
      >
      </dds-modal-close-button>
      <dds-modal-heading>
        <p class="bx--modal-header__label bx--type-delta">
          lang-display-foo
        </p>
        <p class="bx--modal-header__heading bx--type-beta">
          header-title-foo
        </p>
      </dds-modal-heading>
    </dds-modal-header>
    <div class="bx--locale-modal bx--modal-content">
      <slot name="regions-selector">
      </slot>
    </div>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<a
  class="bx--visually-hidden"
  href="javascript:void 0"
  id="end-sentinel"
  role="navigation"
>
</a>

```

####   `should render locale selector`

```
<a
  class="bx--visually-hidden"
  href="javascript:void 0"
  id="start-sentinel"
  role="navigation"
>
</a>
<div
  class="bx--modal-container"
  role="dialog"
  tabindex="-1"
>
  <div class="bx--modal-content">
    <dds-modal-header slot="header">
      <dds-modal-close-button
        role="button"
        tabindex="0"
      >
      </dds-modal-close-button>
      <dds-modal-heading>
        <button
          class="bx--modal-header__label bx--type-delta"
          data-autoid="dds--locale-modal__region-back"
          part="back-button"
        >
          header-title-foo
        </button>
        <p
          class="bx--modal-header__heading bx--type-beta"
          tabindex="0"
        >
          region-foo
        </p>
      </dds-modal-heading>
    </dds-modal-header>
    <slot name="locales-selector">
    </slot>
    <div>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>
<a
  class="bx--visually-hidden"
  href="javascript:void 0"
  id="end-sentinel"
  role="navigation"
>
</a>

```

