# `c4d-masthead-profile`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  aria-expanded="false"
  aria-label="User profile"
  class="cds--header__menu-item cds--header__menu-title"
  href="javascript:void 0"
  part="profile-link"
  role="button"
  tabindex="0"
>
</a>
<ul
  class="cds--header__menu"
  part="header-menu-ul"
>
  <slot>
  </slot>
</ul>

```

####   `should render with various attributes`

```
<a
  aria-expanded="true"
  aria-label="User profile"
  class="cds--header__menu-item cds--header__menu-title"
  href="javascript:void 0"
  part="profile-link"
  role="button"
  tabindex="0"
>
</a>
<ul
  aria-label="menu-label-foo"
  class="cds--header__menu"
  part="header-menu-ul"
>
  <slot>
  </slot>
</ul>

```

