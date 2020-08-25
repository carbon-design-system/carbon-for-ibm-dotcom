# `dds-masthead-composite`

## `Rendering global bar`

####   `should render unauthenticated state`

```
<dds-masthead-global-bar>
  <dds-masthead-profile role="listitem">
    <dds-masthead-profile-item
      href="https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?response_type=token&client_id=v18loginprod&state=http%3A%2F%2Flocalhost%3A9876%2Fcontext.html&redirect_uri=https%3A%2F%2Fmyibm.ibm.com%2FOIDCHandler.html&scope=openid&nonce=login-nonce-foo"
      key="login"
    >
      Log in
    </dds-masthead-profile-item>
  </dds-masthead-profile>
</dds-masthead-global-bar>

```

####   `should render authenticated state`

```
<dds-masthead-global-bar>
  <dds-masthead-profile
    authenticated=""
    role="listitem"
  >
    <dds-masthead-profile-item
      href="https://myibm.ibm.com/?lnk=mmi"
      key="my-ibm"
    >
      My IBM
    </dds-masthead-profile-item>
    <dds-masthead-profile-item
      href="https://myibm.ibm.com/profile/?lnk=mmi"
      key="profile"
    >
      Profile
    </dds-masthead-profile-item>
    <dds-masthead-profile-item
      href="https://myibm.ibm.com/billing/?lnk=mmi"
      key="billing"
    >
      Billing
    </dds-masthead-profile-item>
    <dds-masthead-profile-item
      href="https://myibm.ibm.com/pkmslogout?filename=accountRedir.html"
      key="logout"
    >
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
  role="navigation"
>
  <dds-top-nav-item
    data-autoid="dds--masthead__l0-nav--nav-0"
    href="https://ibmdotcom-webcomponents.mybluemix.net/foo"
    title="item-title-foo"
  >
  </dds-top-nav-item>
  <dds-top-nav-menu
    data-autoid="dds--masthead__l0-nav--nav-1"
    menu-label="menu-title-foo"
    role="listitem"
    trigger-content="menu-title-foo"
  >
    <dds-top-nav-menu-item
      data-autoid="dds--masthead__l0-nav--subnav-col1-item0"
      href="https://ibmdotcom-webcomponents.mybluemix.net/bar"
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
  <dds-left-nav-item
    data-autoid="dds--masthead__l0-sidenav--nav-0"
    href="https://ibmdotcom-webcomponents.mybluemix.net/foo"
    role="listitem"
    title="item-title-foo"
  >
  </dds-left-nav-item>
  <dds-left-nav-menu
    data-autoid="dds--masthead__l0-sidenav--nav-1"
    title="menu-title-foo"
  >
    <dds-left-nav-menu-item
      data-autoid="dds--masthead__l0-sidenav--subnav-col1-item0"
      href="https://ibmdotcom-webcomponents.mybluemix.net/bar"
      title="menu-item-title-bar"
    >
    </dds-left-nav-menu-item>
  </dds-left-nav-menu>
</dds-left-nav>

```

