# `cds-footer-composite`

## `Misc attributes`

####   `should render minimum attributes`

```
<cds-footer-composite size="">
  <cds-footer
    aria-label="footer"
    data-autoid="cds--footer"
    role="contentinfo"
    size=""
  >
    <cds-footer-logo data-autoid="cds--footer-logo">
    </cds-footer-logo>
    <cds-footer-nav
      aria-label="Footer navigation"
      data-autoid="cds--footer-nav"
      role="navigation"
    >
    </cds-footer-nav>
    <cds-locale-button
      data-autoid="cds--locale-btn"
      size=""
      slot="locale-button"
    >
    </cds-locale-button>
    <cds-legal-nav
      data-autoid="cds--footer-legal-nav"
      size=""
    >
      <cds-legal-nav-cookie-preferences-placeholder data-autoid="cds--privacy-cp">
      </cds-legal-nav-cookie-preferences-placeholder>
    </cds-legal-nav>
  </cds-footer>
</cds-footer-composite>

```

####   `should render various attributes`

```
<cds-footer-composite
  lang-display="lang-display-foo"
  language="ko-KR"
  size=""
>
  <cds-footer
    aria-label="footer"
    data-autoid="cds--footer"
    role="contentinfo"
    size=""
  >
    <cds-footer-logo data-autoid="cds--footer-logo">
    </cds-footer-logo>
    <cds-footer-nav
      aria-label="Footer navigation"
      data-autoid="cds--footer-nav"
      role="navigation"
    >
      <cds-footer-nav-group
        data-autoid="cds--footer-nav-group"
        role="listitem"
        title-text="group-title-foo"
      >
        <cds-footer-nav-item
          href="https://dummy.ibm.com/foo/foo"
          role="listitem"
        >
          item-title-foo-foo
        </cds-footer-nav-item>
        <cds-footer-nav-item
          href="https://dummy.ibm.com/foo/bar"
          role="listitem"
        >
          item-title-foo-bar
        </cds-footer-nav-item>
      </cds-footer-nav-group>
      <cds-footer-nav-group
        data-autoid="cds--footer-nav-group"
        role="listitem"
        title-text="group-title-bar"
      >
        <cds-footer-nav-item
          href="https://dummy.ibm.com/bar/foo"
          role="listitem"
        >
          item-title-bar-foo
        </cds-footer-nav-item>
        <cds-footer-nav-item
          href="https://dummy.ibm.com/bar/bar"
          role="listitem"
        >
          item-title-bar-bar
        </cds-footer-nav-item>
      </cds-footer-nav-group>
    </cds-footer-nav>
    <cds-locale-button
      data-autoid="cds--locale-btn"
      size=""
      slot="locale-button"
    >
      lang-display-foo
    </cds-locale-button>
    <cds-legal-nav
      data-autoid="cds--footer-legal-nav"
      size=""
    >
      <cds-legal-nav-item
        href="https://dummy.ibm.com/foo"
        role="listitem"
      >
        title-foo
      </cds-legal-nav-item>
      <cds-legal-nav-item
        href="https://dummy.ibm.com/bar"
        role="listitem"
      >
        title-bar
      </cds-legal-nav-item>
      <cds-legal-nav-cookie-preferences-placeholder data-autoid="cds--privacy-cp">
      </cds-legal-nav-cookie-preferences-placeholder>
    </cds-legal-nav>
  </cds-footer>
</cds-footer-composite>

```

