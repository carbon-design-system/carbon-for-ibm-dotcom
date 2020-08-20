# `dds-footer-composite`

## `Misc attributes`

####   `should render minimum attributes`

```
<dds-footer-composite size="">
  <dds-footer
    data-autoid="dds--footer"
    role="footer"
    size=""
  >
    <dds-footer-logo data-autoid="dds--footer-logo">
    </dds-footer-logo>
    <dds-footer-nav
      data-autoid="dds--footer-nav"
      role="navigation"
    >
    </dds-footer-nav>
    <dds-locale-button data-autoid="dds--locale-btn">
    </dds-locale-button>
    <dds-legal-nav
      data-autoid="dds--footer-legal-nav"
      role="complementary"
    >
      <dds-legal-nav-cookie-preferences-placeholder data-autoid="dds--privacy-cp">
      </dds-legal-nav-cookie-preferences-placeholder>
    </dds-legal-nav>
  </dds-footer>
</dds-footer-composite>

```

####   `should render various attributes`

```
<dds-footer-composite
  lang-display="lang-display-foo"
  language="ko-KR"
  size=""
>
  <dds-footer
    data-autoid="dds--footer"
    role="footer"
    size=""
  >
    <dds-footer-logo data-autoid="dds--footer-logo">
    </dds-footer-logo>
    <dds-footer-nav
      data-autoid="dds--footer-nav"
      role="navigation"
    >
      <dds-footer-nav-group
        data-autoid="dds--footer-nav-group"
        role="listitem"
        title-text="group-title-foo"
      >
        <dds-footer-nav-item
          href="https://dummy.ibm.com/foo/foo"
          role="listitem"
        >
          item-title-foo-foo
        </dds-footer-nav-item>
        <dds-footer-nav-item
          href="https://dummy.ibm.com/foo/bar"
          role="listitem"
        >
          item-title-foo-bar
        </dds-footer-nav-item>
      </dds-footer-nav-group>
      <dds-footer-nav-group
        data-autoid="dds--footer-nav-group"
        role="listitem"
        title-text="group-title-bar"
      >
        <dds-footer-nav-item
          href="https://dummy.ibm.com/bar/foo"
          role="listitem"
        >
          item-title-bar-foo
        </dds-footer-nav-item>
        <dds-footer-nav-item
          href="https://dummy.ibm.com/bar/bar"
          role="listitem"
        >
          item-title-bar-bar
        </dds-footer-nav-item>
      </dds-footer-nav-group>
    </dds-footer-nav>
    <dds-locale-button data-autoid="dds--locale-btn">
      lang-display-foo
    </dds-locale-button>
    <dds-legal-nav
      data-autoid="dds--footer-legal-nav"
      role="complementary"
    >
      <dds-legal-nav-item
        href="https://dummy.ibm.com/foo"
        role="listitem"
      >
        title-foo
      </dds-legal-nav-item>
      <dds-legal-nav-item
        href="https://dummy.ibm.com/bar"
        role="listitem"
      >
        title-bar
      </dds-legal-nav-item>
      <dds-legal-nav-cookie-preferences-placeholder data-autoid="dds--privacy-cp">
      </dds-legal-nav-cookie-preferences-placeholder>
    </dds-legal-nav>
  </dds-footer>
</dds-footer-composite>

```

