# `dds-left-nav-menu`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--side-nav__item">
  <button
    aria-expanded="false"
    aria-haspopup="true"
    class="bx--side-nav__submenu"
    tabindex="-1"
    type="button"
  >
    <div class="bx--side-nav__submenu-content">
      <span class="bx--side-nav__submenu-title">
      </span>
      <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
      </div>
    </div>
  </button>
</div>

```

####   `should render with various attributes`

```
<div class="bx--side-nav__item">
  <button
    aria-expanded="true"
    aria-haspopup="true"
    class="bx--side-nav__submenu"
    tabindex="-1"
    type="button"
  >
    <div class="bx--side-nav__submenu-content">
      <span class="bx--side-nav__submenu-title">
        title-foo
      </span>
      <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
      </div>
    </div>
  </button>
</div>

```

