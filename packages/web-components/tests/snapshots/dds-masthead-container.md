# `dds-masthead-container`

## `Rendering global bar`

#### `should render unauthenticated state`

```
<dds-masthead-global-bar>
  <dds-masthead-profile role="listitem">
    <dds-masthead-profile-item href="https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?response_type=token&client_id=v18loginprod&state=http%3A%2F%2Flocalhost%3A9876%2Fcontext.html&redirect_uri=https%3A%2F%2Fmyibm.ibm.com%2FOIDCHandler.html&scope=openid&nonce=login-nonce-foo">
      Log in
    </dds-masthead-profile-item>
  </dds-masthead-profile>
</dds-masthead-global-bar>

```

#### `should render authenticated state`

```
<dds-masthead-global-bar>
  <dds-masthead-profile
    authenticated=""
    role="listitem"
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

#### `should render the given nav items to the top`

```
<dds-top-nav
  menu-bar-label="IBM [Platform]"
  role="navigation"
>
  <dds-top-nav-item href="https://ibmdotcom-webcomponents.mybluemix.net/foo">
    item-title-foo
  </dds-top-nav-item>
  <dds-top-nav-menu
    menu-label="menu-title-foo"
    role="listitem"
    trigger-content="menu-title-foo"
  >
    <dds-top-nav-menu-item href="https://ibmdotcom-webcomponents.mybluemix.net/bar">
      menu-item-title-bar
    </dds-top-nav-menu-item>
  </dds-top-nav-menu>
</dds-top-nav>

```

#### `should render the given nav items to the left`

```
<dds-left-nav role="navigation">
  <dds-left-nav-item
    href="https://ibmdotcom-webcomponents.mybluemix.net/foo"
    role="listitem"
  >
    item-title-foo
  </dds-left-nav-item>
  <dds-left-nav-menu title="menu-title-foo">
    <dds-left-nav-menu-item href="https://ibmdotcom-webcomponents.mybluemix.net/bar">
      menu-item-title-bar
    </dds-left-nav-menu-item>
  </dds-left-nav-menu>
</dds-left-nav>

```
