# `c4d-content-block-card-static`

## `Misc attributes`

####   `should render with minimum attributes`

```
<c4d-content-block-card-static>
  <c4d-card-group-item>
  </c4d-card-group-item>
  <c4d-card-group>
  </c4d-card-group>
  <c4d-content-item>
    <c4d-content-item-heading>
    </c4d-content-item-heading>
    <c4d-content-item-copy>
    </c4d-content-item-copy>
  </c4d-content-item>
  <c4d-button-group>
    <c4d-button-group-item>
      Button 1
    </c4d-button-group-item>
    <c4d-button-group-item>
      Buuton 2
    </c4d-button-group-item>
  </c4d-button-group>
</c4d-content-block-card-static>

```

####   `should render with various attributes`

```
<c4d-content-block-card-static>
  <c4d-card-group-item>
    heading-foo
  </c4d-card-group-item>
  <c4d-card-group>
    <c4d-card-group-item href="https://example.com">
      <c4d-card-heading>
        Nunc convallis lobortis
      </c4d-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                et ultricies est. Mauris iaculis eget dolor nec hendrerit.
                Phasellus at elit sollicitudin, sodales nulla quis, consequat
                libero.
      </p>
      <c4d-card-cta-footer slot="footer">
      </c4d-card-cta-footer>
    </c4d-card-group-item>
  </c4d-card-group>
  <c4d-content-item>
    <c4d-content-item-heading>
      Lorem ipsum
    </c4d-content-item-heading>
    <c4d-content-item-copy>
      ipsum dolor sit amet
    </c4d-content-item-copy>
  </c4d-content-item>
  <c4d-button-group>
    <c4d-button-group-item>
      Button 1
    </c4d-button-group-item>
    <c4d-button-group-item>
      Buuton 2
    </c4d-button-group-item>
  </c4d-button-group>
</c4d-content-block-card-static>

```

