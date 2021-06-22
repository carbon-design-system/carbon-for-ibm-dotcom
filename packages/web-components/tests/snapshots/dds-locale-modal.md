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
  tabindex="-1"
>
  <div class="bx--modal-content">
    <dds-expressive-modal-header data-autoid="dds--expressive-modal-header">
      <dds-expressive-modal-close-button data-autoid="dds--expressive-modal-close-button">
      </dds-expressive-modal-close-button>
      <dds-expressive-modal-heading data-autoid="dds--expressive-modal-heading">
      </dds-expressive-modal-heading>
    </dds-expressive-modal-header>
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
  tabindex="-1"
>
  <div class="bx--modal-content">
    <dds-expressive-modal-header data-autoid="dds--expressive-modal-header">
      <dds-expressive-modal-close-button data-autoid="dds--expressive-modal-close-button">
      </dds-expressive-modal-close-button>
      <dds-expressive-modal-heading data-autoid="dds--expressive-modal-heading">
        <p class="bx--modal-header__label bx--type-delta">
          lang-display-foo
        </p>
        <p class="bx--modal-header__heading bx--type-beta">
          header-title-foo
        </p>
      </dds-expressive-modal-heading>
    </dds-expressive-modal-header>
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
  tabindex="-1"
>
  <div class="bx--modal-content">
    <dds-expressive-modal-header
      data-autoid="dds--expressive-modal-header"
      slot="header"
    >
      <dds-expressive-modal-close-button
        data-autoid="dds--expressive-modal-close-button"
        size=""
      >
      </dds-expressive-modal-close-button>
      <dds-expressive-modal-heading data-autoid="dds--expressive-modal-heading">
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

