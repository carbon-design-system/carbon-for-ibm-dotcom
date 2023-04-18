# `dds-tabs-extended-media`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--tabs-extended-media">
  <div class="bx--heading">
    <slot name="heading">
    </slot>
  </div>
  <div class="bx--tabs-extended">
    <bx-accordion
      class="bx--accordion"
      role="list"
    >
    </bx-accordion>
    <div class="bx--tabs">
      <ul
        class="bx--tabs__nav bx--tabs__nav--hidden"
        role="tablist"
      >
      </ul>
    </div>
    <div class="bx--tab-content">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--tabs-extended-media">
  <div class="bx--heading">
    <slot name="heading">
    </slot>
  </div>
  <div class="bx--tabs-extended">
    <bx-accordion
      class="bx--accordion"
      role="list"
    >
    </bx-accordion>
    <div class="bx--tabs">
      <ul
        class="bx--tabs__nav bx--tabs__nav--hidden"
        role="tablist"
      >
      </ul>
    </div>
    <div class="bx--tab-content">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

