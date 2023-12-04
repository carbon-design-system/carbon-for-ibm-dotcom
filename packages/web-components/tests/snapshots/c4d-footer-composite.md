# `c4d-footer-composite`

## `Misc attributes`

####   `should render minimum attributes`

```
<c4d-footer-composite size="">
  <c4d-footer
    aria-label="footer"
    data-autoid="c4d--footer"
    role="contentinfo"
    size=""
  >
    <c4d-footer-logo data-autoid="c4d--footer-logo">
    </c4d-footer-logo>
    <c4d-footer-nav
      aria-label="Footer navigation"
      data-autoid="c4d--footer-nav"
      role="navigation"
    >
    </c4d-footer-nav>
    <c4d-locale-button
      data-autoid="c4d--locale-btn"
      size=""
      slot="locale-button"
    >
    </c4d-locale-button>
    <c4d-legal-nav
      data-autoid="c4d--footer-legal-nav"
      size=""
    >
      <c4d-legal-nav-cookie-preferences-placeholder data-autoid="c4d--privacy-cp">
      </c4d-legal-nav-cookie-preferences-placeholder>
    </c4d-legal-nav>
  </c4d-footer>
</c4d-footer-composite>

```

####   `should render various attributes`

```
<c4d-footer-composite
  lang-display="lang-display-foo"
  language="ko-KR"
  size=""
>
  <c4d-footer
    aria-label="footer"
    data-autoid="c4d--footer"
    role="contentinfo"
    size=""
  >
    <c4d-footer-logo data-autoid="c4d--footer-logo">
    </c4d-footer-logo>
    <c4d-footer-nav
      aria-label="Footer navigation"
      data-autoid="c4d--footer-nav"
      role="navigation"
    >
      <c4d-footer-nav-group
        data-autoid="c4d--footer-nav-group"
        role="listitem"
        title-text="group-title-foo"
      >
        <c4d-footer-nav-item
          href="https://dummy.ibm.com/foo/foo"
          role="listitem"
        >
          item-title-foo-foo
        </c4d-footer-nav-item>
        <c4d-footer-nav-item
          href="https://dummy.ibm.com/foo/bar"
          role="listitem"
        >
          item-title-foo-bar
        </c4d-footer-nav-item>
      </c4d-footer-nav-group>
      <c4d-footer-nav-group
        data-autoid="c4d--footer-nav-group"
        role="listitem"
        title-text="group-title-bar"
      >
        <c4d-footer-nav-item
          href="https://dummy.ibm.com/bar/foo"
          role="listitem"
        >
          item-title-bar-foo
        </c4d-footer-nav-item>
        <c4d-footer-nav-item
          href="https://dummy.ibm.com/bar/bar"
          role="listitem"
        >
          item-title-bar-bar
        </c4d-footer-nav-item>
      </c4d-footer-nav-group>
    </c4d-footer-nav>
    <c4d-locale-button
      data-autoid="c4d--locale-btn"
      size=""
      slot="locale-button"
    >
      lang-display-foo
    </c4d-locale-button>
    <c4d-legal-nav
      data-autoid="c4d--footer-legal-nav"
      size=""
    >
      <c4d-legal-nav-item
        href="https://dummy.ibm.com/foo"
        role="listitem"
      >
        title-foo
      </c4d-legal-nav-item>
      <c4d-legal-nav-item
        href="https://dummy.ibm.com/bar"
        role="listitem"
      >
        title-bar
      </c4d-legal-nav-item>
      <c4d-legal-nav-cookie-preferences-placeholder data-autoid="c4d--privacy-cp">
      </c4d-legal-nav-cookie-preferences-placeholder>
    </c4d-legal-nav>
  </c4d-footer>
</c4d-footer-composite>

```

