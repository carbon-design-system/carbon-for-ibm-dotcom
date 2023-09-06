# `c4d-masthead-composite`

## `Rendering global bar`

####   `should render unauthenticated state`

```
<c4d-masthead-global-bar data-autoid="c4d--masthead-global-bar">
  <c4d-masthead-profile data-autoid="c4d--masthead-profile">
    <c4d-masthead-profile-item href="https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?response_type=token&amp;client_id=v18loginprod&amp;state=http%3A%2F%2Flocalhost%3A9876%2Fcontext.html&amp;redirect_uri=https%3A%2F%2Fmyibm.ibm.com%2FOIDCHandler.html&amp;scope=openid">
      Log in
    </c4d-masthead-profile-item>
  </c4d-masthead-profile>
</c4d-masthead-global-bar>

```

####   `should render authenticated state`

```
<c4d-masthead-global-bar data-autoid="c4d--masthead-global-bar">
  <c4d-masthead-profile
    authenticated=""
    data-autoid="c4d--masthead-profile"
  >
    <c4d-masthead-profile-item href="https://myibm.ibm.com/?lnk=mmi">
      My IBM
    </c4d-masthead-profile-item>
    <c4d-masthead-profile-item href="https://myibm.ibm.com/profile/?lnk=mmi">
      Profile
    </c4d-masthead-profile-item>
    <c4d-masthead-profile-item href="https://myibm.ibm.com/billing/?lnk=mmi">
      Billing
    </c4d-masthead-profile-item>
    <c4d-masthead-profile-item href="https://myibm.ibm.com/pkmslogout?filename=accountRedir.html">
      Log out
    </c4d-masthead-profile-item>
  </c4d-masthead-profile>
</c4d-masthead-global-bar>

```

## `Rendering nav items`

####   `should render the given nav items to the top`

```
<c4d-top-nav
  data-autoid="c4d--masthead__l0-nav"
  selected-menu-item=""
>
  <c4d-top-nav-item
    data-autoid="c4d--masthead__l0-nav--nav0"
    href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo"
    title="item-title-foo"
  >
  </c4d-top-nav-item>
  <c4d-top-nav-menu
    data-autoid="c4d--masthead__l0-nav--nav1"
    menu-label="menu-title-foo"
    trigger-content="menu-title-foo"
  >
    <c4d-top-nav-menu-item
      data-autoid="c4d--masthead__l0-nav--subnav-col1-item0"
      href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar"
      title="menu-item-title-bar"
    >
    </c4d-top-nav-menu-item>
  </c4d-top-nav-menu>
</c4d-top-nav>

```

####   `should render the given nav items to the left`

```
<c4d-left-nav
  data-autoid="c4d--masthead__l0-sidenav"
  role="navigation"
>
  <c4d-left-nav-menu-section
    section-id="-1, -1"
    title=""
    titleurl=""
  >
    <c4d-left-nav-menu-item
      data-autoid="c4d--masthead__l0--sidenav--nav0"
      href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo"
      title="item-title-foo"
    >
    </c4d-left-nav-menu-item>
    <c4d-left-nav-menu
      data-autoid="c4d--masthead__l0--sidenav--nav1"
      panel-id="1, -1"
      title="menu-title-foo"
    >
    </c4d-left-nav-menu>
  </c4d-left-nav-menu-section>
  <c4d-left-nav-menu-section
    is-submenu=""
    section-id="1, -1"
    show-back-button=""
    title="menu-title-foo"
    titleurl=""
  >
    <c4d-left-nav-menu-item
      data-autoid="c4d--masthead__l0--sidenav--nav1-list0"
      href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar"
      title="menu-item-title-bar"
    >
    </c4d-left-nav-menu-item>
  </c4d-left-nav-menu-section>
</c4d-left-nav>

```

