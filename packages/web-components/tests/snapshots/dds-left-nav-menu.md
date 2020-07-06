# `dds-left-nav-menu`

## `Misc attributes`

#### `should render with minimum attributes`

```
<button
  aria-expanded="false"
  aria-haspopup="true"
  class="bx--side-nav__submenu"
  type="button"
>
  <span class="bx--side-nav__submenu-title">
  </span>
  <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
  </div>
</button>
<ul
  class="bx--side-nav__menu"
  role="menu"
>
  <li
    class="bx--masthead__side-nav--submemu-back bx--side-nav__menu-item"
    role="none"
  >
    <a
      class="bx--side-nav__link"
      role="menuitem"
    >
      <span class="bx--side-nav__link-text">
        Back
      </span>
    </a>
  </li>
  <li class="bx--masthead__side-nav--submemu-title">
  </li>
  <slot>
  </slot>
</ul>

```

#### `should render with various attributes`

```
<button
  aria-expanded="true"
  aria-haspopup="true"
  class="bx--side-nav__submenu"
  type="button"
>
  <span class="bx--side-nav__submenu-title">
    title-foo
  </span>
  <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
  </div>
</button>
<ul
  class="bx--side-nav__menu"
  role="menu"
>
  <li
    class="bx--masthead__side-nav--submemu-back bx--side-nav__menu-item"
    role="none"
  >
    <a
      class="bx--side-nav__link"
      role="menuitem"
    >
      <span class="bx--side-nav__link-text">
        back-button-text-foo
      </span>
    </a>
  </li>
  <li class="bx--masthead__side-nav--submemu-title">
    title-foo
  </li>
  <slot>
  </slot>
</ul>

```
