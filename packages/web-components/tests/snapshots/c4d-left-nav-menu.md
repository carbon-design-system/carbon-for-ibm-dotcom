# `c4d-left-nav-menu`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--side-nav__item">
  <button
    aria-expanded="false"
    aria-haspopup="true"
    class="cds--side-nav__submenu"
    data-attribute1="headerNav"
    data-attribute2="L0"
    data-attribute3=""
    tabindex="-1"
    type="button"
  >
    <div class="cds--side-nav__submenu-content">
      <span class="cds--side-nav__submenu-title">
      </span>
      <div class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron">
      </div>
    </div>
  </button>
</div>

```

####   `should render with various attributes`

```
<div class="cds--side-nav__item">
  <button
    aria-expanded="true"
    aria-haspopup="true"
    class="cds--side-nav__submenu"
    data-attribute1="headerNav"
    data-attribute2="L0"
    data-attribute3="title-foo"
    tabindex="-1"
    type="button"
  >
    <div class="cds--side-nav__submenu-content">
      <span class="cds--side-nav__submenu-title">
        title-foo
      </span>
      <div class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron">
      </div>
    </div>
  </button>
</div>

```

