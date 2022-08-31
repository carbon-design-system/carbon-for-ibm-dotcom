# `dds-content-block-card-static`

## `Misc attributes`

####   `should render with minimum attributes`

```
<dds-content-block-card-static>
  <dds-card-group-item
    color-scheme=""
    cta-type=""
    data-autoid="dds--card-group-item"
    pictogram-placement="top"
    size=""
  >
  </dds-card-group-item>
  <dds-card-group
    data-autoid="dds--card-group"
    grid-mode="collapsed"
  >
  </dds-card-group>
  <dds-content-item data-autoid="dds--content-item">
    <dds-content-item-heading
      aria-level="4"
      data-autoid="dds--content-item__heading"
      role="heading"
      slot="heading"
    >
    </dds-content-item-heading>
    <dds-content-item-copy data-autoid="dds--content-item__copy">
    </dds-content-item-copy>
  </dds-content-item>
  <dds-button-group
    data-autoid="dds--button-group"
    role="list"
    style="--dds--button-group--item-count:2;"
  >
    <dds-button-group-item
      data-autoid="dds--button-group-item"
      icon-layout=""
      kind="tertiary"
      role="listitem"
      size=""
    >
      Button 1
    </dds-button-group-item>
    <dds-button-group-item
      data-autoid="dds--button-group-item"
      icon-layout=""
      kind="primary"
      role="listitem"
      size=""
    >
      Buuton 2
    </dds-button-group-item>
  </dds-button-group>
</dds-content-block-card-static>

```

####   `should render with various attributes`

```
<dds-content-block-card-static>
  <dds-card-group-item
    color-scheme=""
    cta-type=""
    data-autoid="dds--card-group-item"
    pictogram-placement="top"
    size=""
  >
    heading-foo
  </dds-card-group-item>
  <dds-card-group
    data-autoid="dds--card-group"
    grid-mode="collapsed"
    style="--dds--card-group--cards-in-row:3;"
  >
    <dds-card-group-item
      color-scheme=""
      cta-type=""
      data-autoid="dds--card-group-item"
      href="https://example.com"
      pictogram-placement="top"
      size=""
    >
      <dds-card-heading
        aria-level="3"
        data-autoid="dds--card-heading"
        role="heading"
        slot="heading"
      >
        Nunc convallis lobortis
      </dds-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <dds-card-cta-footer
        color-scheme=""
        cta-type=""
        data-autoid="dds--card-cta-footer"
        href="https://example.com"
        icon-placement="right"
        parent-href="https://example.com"
        slot="footer"
      >
      </dds-card-cta-footer>
    </dds-card-group-item>
  </dds-card-group>
  <dds-content-item data-autoid="dds--content-item">
    <dds-content-item-heading
      aria-level="4"
      data-autoid="dds--content-item__heading"
      role="heading"
      slot="heading"
    >
      Lorem ipsum
    </dds-content-item-heading>
    <dds-content-item-copy data-autoid="dds--content-item__copy">
      <dds-content-item-paragraph data-autoid="dds--content-item-paragraph">
        ipsum dolor sit amet
      </dds-content-item-paragraph>
    </dds-content-item-copy>
  </dds-content-item>
  <dds-button-group
    data-autoid="dds--button-group"
    role="list"
    style="--dds--button-group--item-count:2;"
  >
    <dds-button-group-item
      data-autoid="dds--button-group-item"
      icon-layout=""
      kind="tertiary"
      role="listitem"
      size=""
    >
      Button 1
    </dds-button-group-item>
    <dds-button-group-item
      data-autoid="dds--button-group-item"
      icon-layout=""
      kind="primary"
      role="listitem"
      size=""
    >
      Buuton 2
    </dds-button-group-item>
  </dds-button-group>
</dds-content-block-card-static>

```

