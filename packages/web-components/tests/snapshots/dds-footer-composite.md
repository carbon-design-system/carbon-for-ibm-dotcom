# `dds-footer-composite`

## `Misc attributes`

#### `should render minimum attributes`

```
<dds-footer-composite>
  <dds-footer-shell
    data-auto-id="dds--footer"
    role="footer"
  >
    <dds-footer-logo data-auto-id="dds--footer-logo">
    </dds-footer-logo>
    <dds-footer-nav
      data-auto-id="dds--footer-nav"
      role="navigation"
    >
    </dds-footer-nav>
    <dds-locale-button>
    </dds-locale-button>
    <dds-legal-nav
      data-auto-id="dds--footer-legal-nav__link"
      role="complementary"
    >
    </dds-legal-nav>
  </dds-footer-shell>
</dds-footer-composite>

```

#### `should render various attributes`

```
<dds-footer-composite
  lang-display="lang-display-foo"
  language="ko-KR"
>
  <dds-footer-shell
    data-auto-id="dds--footer"
    role="footer"
  >
    <dds-footer-logo data-auto-id="dds--footer-logo">
    </dds-footer-logo>
    <dds-footer-nav
      data-auto-id="dds--footer-nav"
      role="navigation"
    >
      <dds-footer-nav-group
        data-auto-id="dds--footer-nav-group"
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
        data-auto-id="dds--footer-nav-group"
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
    <dds-locale-button>
      lang-display-foo
    </dds-locale-button>
    <dds-legal-nav
      data-auto-id="dds--footer-legal-nav__link"
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
    </dds-legal-nav>
  </dds-footer-shell>
</dds-footer-composite>

```
