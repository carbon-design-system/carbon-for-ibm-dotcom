# `cds-masthead-composite`

## `Rendering global bar`

####   `should render unauthenticated state`

```
<c4d-masthead-global-bar data-autoid="c4d--masthead-global-bar">
  <c4d-masthead-contact
    data-autoid="c4d--masthead-profile"
    data-ibm-contact="contact-link"
  >
  </c4d-masthead-contact>
  <c4d-masthead-profile data-autoid="c4d--masthead-profile">
    <c4d-masthead-profile-item href="https://myibm.ibm.com/?lnk=mmi">
      My IBM
    </c4d-masthead-profile-item>
    <c4d-masthead-profile-item href="https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?response_type=token&amp;client_id=v18loginprod&amp;state=http%3A%2F%2Flocalhost%3A9876%2Fcontext.html&amp;redirect_uri=https%3A%2F%2Fmyibm.ibm.com%2FOIDCHandler.html&amp;scope=openid">
      Log in
    </c4d-masthead-profile-item>
  </c4d-masthead-profile>
</c4d-masthead-global-bar>

```

####   `should render authenticated state`

```
<c4d-masthead-global-bar data-autoid="c4d--masthead-global-bar">
  <c4d-masthead-contact
    data-autoid="c4d--masthead-profile"
    data-ibm-contact="contact-link"
  >
  </c4d-masthead-contact>
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

