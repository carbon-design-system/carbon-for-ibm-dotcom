# `c4d-left-nav-menu`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div
  class="cds--side-nav__item"
  part="side-nav-item-container"
>
  <button
    aria-expanded="false"
    aria-haspopup="true"
    class="cds--side-nav__submenu"
    data-attribute1="headerNav"
    data-attribute2="L0"
    data-attribute3=""
    part="side-nav-item-button"
    type="button"
  >
    <div
      class="cds--side-nav__submenu-content"
      part="side-nav-submenu-content"
    >
      <span
        class="cds--side-nav__submenu-title"
        part="side-nav-submenu-title"
      >
      </span>
      <div
        class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
        part="side-nav-icon"
      >
      </div>
    </div>
  </button>
</div>

```

####   `should render with various attributes`

```
<div
  class="cds--side-nav__item"
  part="side-nav-item-container"
>
  <button
    aria-expanded="true"
    aria-haspopup="true"
    class="cds--side-nav__submenu"
    data-attribute1="headerNav"
    data-attribute2="L0"
    data-attribute3="title-foo"
    part="side-nav-item-button"
    type="button"
  >
    <div
      class="cds--side-nav__submenu-content"
      part="side-nav-submenu-content"
    >
      <span
        class="cds--side-nav__submenu-title"
        part="side-nav-submenu-title"
      >
        title-foo
      </span>
      <div
        class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
        part="side-nav-icon"
      >
      </div>
    </div>
  </button>
</div>

```

