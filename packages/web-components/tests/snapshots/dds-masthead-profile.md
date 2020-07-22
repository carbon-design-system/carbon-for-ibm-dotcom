# `dds-masthead-profile`

## `Misc attributes`

#### `should render with minimum attributes`

```
<a
  aria-expanded="false"
  aria-haspopup="menu"
  aria-label="User profile"
  class="bx--header__menu-item bx--header__menu-title"
  href="javascript:void 0"
  role="menuitem"
  tabindex="0"
>
</a>
<ul
  class="bx--header__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```

#### `should render with various attributes`

```
<a
  aria-expanded="true"
  aria-haspopup="menu"
  aria-label="User profile"
  class="bx--header__menu-item bx--header__menu-title"
  href="javascript:void 0"
  role="menuitem"
  tabindex="0"
>
</a>
<ul
  aria-label="menu-label-foo"
  class="bx--header__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```
