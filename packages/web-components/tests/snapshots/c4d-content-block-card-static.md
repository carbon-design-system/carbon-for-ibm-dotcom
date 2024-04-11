# `c4d-content-block-card-static`

## `Misc attributes`

####   `should render with minimum attributes`

```
<c4d-content-block-card-static>
  <c4d-card-group-item
    color-scheme=""
    data-autoid="c4d--card-group-item"
    pictogram-placement="bottom"
    size=""
  >
  </c4d-card-group-item>
  <c4d-card-group
    data-autoid="c4d--card-group"
    grid-mode="default"
  >
  </c4d-card-group>
  <c4d-content-item data-autoid="c4d--content-item">
    <c4d-content-item-heading
      aria-level="4"
      data-autoid="c4d--content-item__heading"
      role="heading"
      slot="heading"
    >
    </c4d-content-item-heading>
    <c4d-content-item-copy data-autoid="c4d--content-item__copy">
    </c4d-content-item-copy>
  </c4d-content-item>
  <c4d-button-group
    data-autoid="c4d--button-group"
    role="list"
    style="--c4d--button-group--item-count: 2;"
  >
    <c4d-button-group-item
      cta-type=""
      data-autoid="c4d--button-group-item"
      isexpressive=""
      kind="primary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Button 1
    </c4d-button-group-item>
    <c4d-button-group-item
      cta-type=""
      data-autoid="c4d--button-group-item"
      isexpressive=""
      kind="tertiary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Buuton 2
    </c4d-button-group-item>
  </c4d-button-group>
</c4d-content-block-card-static>

```

####   `should render with various attributes`

```
<c4d-content-block-card-static>
  <c4d-card-group-item
    color-scheme=""
    data-autoid="c4d--card-group-item"
    pictogram-placement="bottom"
    size=""
  >
    heading-foo
  </c4d-card-group-item>
  <c4d-card-group
    data-autoid="c4d--card-group"
    grid-mode="default"
    style="--c4d--card-group--cards-in-row: 3;"
  >
    <c4d-card-group-item
      color-scheme=""
      data-autoid="c4d--card-group-item"
      href="https://example.com"
      pictogram-placement="bottom"
      size=""
    >
      <c4d-card-heading
        aria-level="3"
        data-autoid="c4d--card-heading"
        role="heading"
        slot="heading"
      >
        Nunc convallis lobortis
      </c4d-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                et ultricies est. Mauris iaculis eget dolor nec hendrerit.
                Phasellus at elit sollicitudin, sodales nulla quis, consequat
                libero.
      </p>
      <c4d-card-footer
        color-scheme=""
        cta-type=""
        data-autoid="c4d--card-footer"
        icon-placement="right"
        parent-href="https://example.com"
        slot="footer"
      >
      </c4d-card-footer>
    </c4d-card-group-item>
  </c4d-card-group>
  <c4d-content-item data-autoid="c4d--content-item">
    <c4d-content-item-heading
      aria-level="4"
      data-autoid="c4d--content-item__heading"
      role="heading"
      slot="heading"
    >
      Lorem ipsum
    </c4d-content-item-heading>
    <c4d-content-item-copy data-autoid="c4d--content-item__copy">
      <c4d-content-item-paragraph data-autoid="c4d--content-item-paragraph">
        ipsum dolor sit amet
      </c4d-content-item-paragraph>
    </c4d-content-item-copy>
  </c4d-content-item>
  <c4d-button-group
    data-autoid="c4d--button-group"
    role="list"
    style="--c4d--button-group--item-count: 2;"
  >
    <c4d-button-group-item
      cta-type=""
      data-autoid="c4d--button-group-item"
      isexpressive=""
      kind="primary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Button 1
    </c4d-button-group-item>
    <c4d-button-group-item
      cta-type=""
      data-autoid="c4d--button-group-item"
      isexpressive=""
      kind="tertiary"
      role="listitem"
      size="lg"
      tooltip-alignment=""
      tooltip-position="top"
      type="button"
    >
      Buuton 2
    </c4d-button-group-item>
  </c4d-button-group>
</c4d-content-block-card-static>

```

