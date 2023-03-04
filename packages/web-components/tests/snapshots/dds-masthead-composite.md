# `dds-masthead-composite`

## `Rendering global bar`

####   `should render unauthenticated state`

```
<dds-masthead-global-bar data-autoid="dds--masthead-global-bar">
  <dds-masthead-profile data-autoid="dds--masthead-profile">
    <dds-masthead-profile-item href="https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?response_type=token&client_id=v18loginprod&state=http%3A%2F%2Flocalhost%3A9876%2Fcontext.html&redirect_uri=https%3A%2F%2Fmyibm.ibm.com%2FOIDCHandler.html&scope=openid">
      Log in
    </dds-masthead-profile-item>
  </dds-masthead-profile>
</dds-masthead-global-bar>

```

####   `should render authenticated state`

```
<dds-masthead-global-bar data-autoid="dds--masthead-global-bar">
  <dds-masthead-profile
    authenticated=""
    data-autoid="dds--masthead-profile"
  >
    <dds-masthead-profile-item href="https://myibm.ibm.com/?lnk=mmi">
      My IBM
    </dds-masthead-profile-item>
    <dds-masthead-profile-item href="https://myibm.ibm.com/profile/?lnk=mmi">
      Profile
    </dds-masthead-profile-item>
    <dds-masthead-profile-item href="https://myibm.ibm.com/billing/?lnk=mmi">
      Billing
    </dds-masthead-profile-item>
    <dds-masthead-profile-item href="https://myibm.ibm.com/pkmslogout?filename=accountRedir.html">
      Log out
    </dds-masthead-profile-item>
  </dds-masthead-profile>
</dds-masthead-global-bar>

```

## `Rendering nav items`

####   `should render the given nav items to the top`

```
<dds-top-nav
  data-autoid="dds--masthead__l0-nav"
  selected-menu-item="undefined"
>
  <dds-top-nav-item
    data-autoid="dds--masthead__l0-nav--nav0"
    href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo"
    title="item-title-foo"
  >
  </dds-top-nav-item>
  <dds-top-nav-menu
    data-autoid="dds--masthead__l0-nav--nav1"
    menu-label="menu-title-foo"
    trigger-content="menu-title-foo"
  >
    <dds-top-nav-menu-item
      data-autoid="dds--masthead__l0-nav--subnav-col1-item0"
      href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar"
      title="menu-item-title-bar"
    >
    </dds-top-nav-menu-item>
  </dds-top-nav-menu>
</dds-top-nav>

```

####   `should render the given nav items to the left`

```
<dds-left-nav
  data-autoid="dds--masthead__l0-sidenav"
  role="navigation"
>
  <dds-left-nav-menu-section
    section-id="-1, -1"
    title=""
    titleurl=""
  >
    <dds-left-nav-menu-item
      data-autoid="dds--masthead__l0--sidenav--nav0"
      href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo"
      title="item-title-foo"
    >
    </dds-left-nav-menu-item>
    <dds-left-nav-menu
      data-autoid="dds--masthead__l0--sidenav--nav1"
      panel-id="1, -1"
      title="menu-title-foo"
    >
    </dds-left-nav-menu>
  </dds-left-nav-menu-section>
  <dds-left-nav-menu-section
    is-submenu=""
    section-id="1, -1"
    show-back-button=""
    title="menu-title-foo"
    titleurl=""
  >
    <dds-left-nav-menu-item
      data-autoid="dds--masthead__l0--sidenav--nav1-list0"
      href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar"
      title="menu-item-title-bar"
    >
    </dds-left-nav-menu-item>
  </dds-left-nav-menu-section>
</dds-left-nav>

```

