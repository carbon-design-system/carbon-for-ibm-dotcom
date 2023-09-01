# `cds-content-block-card-static`

## `Misc attributes`

####   `should render with minimum attributes`

```
<cds-content-block-card-static>
  <cds-card-group-item
    color-scheme=""
    data-autoid="cds--card-group-item"
    pictogram-placement=""
    size="md"
  >
  </cds-card-group-item>
  <cds-card-group
    data-autoid="cds--card-group"
    grid-mode="collapsed"
  >
  </cds-card-group>
  <cds-content-item data-autoid="cds--content-item">
    <cds-content-item-heading
      aria-level="4"
      data-autoid="cds--content-item__heading"
      role="heading"
      slot="heading"
    >
    </cds-content-item-heading>
    <cds-content-item-copy data-autoid="cds--content-item__copy">
    </cds-content-item-copy>
  </cds-content-item>
  <cds-button-group
    data-autoid="cds--button-group"
    role="list"
  >
    <cds-button-group-item
      cta-type=""
      data-autoid="cds--button-group-item"
      kind="primary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Button 1
    </cds-button-group-item>
    <cds-button-group-item
      cta-type=""
      data-autoid="cds--button-group-item"
      kind="primary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Buuton 2
    </cds-button-group-item>
  </cds-button-group>
</cds-content-block-card-static>

```

####   `should render with various attributes`

```
<cds-content-block-card-static>
  <cds-card-group-item
    color-scheme=""
    data-autoid="cds--card-group-item"
    pictogram-placement=""
    size="md"
  >
    heading-foo
  </cds-card-group-item>
  <cds-card-group
    data-autoid="cds--card-group"
    grid-mode="collapsed"
  >
    <cds-card-group-item
      color-scheme=""
      data-autoid="cds--card-group-item"
      href="https://example.com"
      pictogram-placement=""
      size="md"
    >
      <cds-card-heading
        aria-level="3"
        data-autoid="cds--card-heading"
        role="heading"
        slot="heading"
      >
        Nunc convallis lobortis
      </cds-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                et ultricies est. Mauris iaculis eget dolor nec hendrerit.
                Phasellus at elit sollicitudin, sodales nulla quis, consequat
                libero.
      </p>
      <cds-card-cta-footer
        color-scheme=""
        cta-type=""
        data-autoid="cds--card-cta-footer"
        icon-placement="right"
        slot="footer"
      >
      </cds-card-cta-footer>
    </cds-card-group-item>
  </cds-card-group>
  <cds-content-item data-autoid="cds--content-item">
    <cds-content-item-heading
      aria-level="4"
      data-autoid="cds--content-item__heading"
      role="heading"
      slot="heading"
    >
      Lorem ipsum
    </cds-content-item-heading>
    <cds-content-item-copy data-autoid="cds--content-item__copy">
      <cds-content-item-paragraph data-autoid="cds--content-item-paragraph">
        ipsum dolor sit amet
      </cds-content-item-paragraph>
    </cds-content-item-copy>
  </cds-content-item>
  <cds-button-group
    data-autoid="cds--button-group"
    role="list"
  >
    <cds-button-group-item
      cta-type=""
      data-autoid="cds--button-group-item"
      kind="primary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Button 1
    </cds-button-group-item>
    <cds-button-group-item
      cta-type=""
      data-autoid="cds--button-group-item"
      kind="primary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Buuton 2
    </cds-button-group-item>
  </cds-button-group>
</cds-content-block-card-static>

```

