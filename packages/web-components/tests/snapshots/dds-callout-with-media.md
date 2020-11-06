# `dds-callout-with-media`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--callout__column">
  <div class="bx--callout__content">
    <slot name="heading">
    </slot>
    <div class="bx--content-block__children">
      <div class="bx--content-block-simple__content">
        <div class="bx--content-item">
          <slot>
          </slot>
        </div>
        <div>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      class="bx--content-block__cta-row"
      hidden=""
    >
      <div class="bx--content-block__cta bx--content-block__cta-col">
        <slot name="cta">
        </slot>
      </div>
    </div>
    <slot name="complementary">
    </slot>
  </div>
</div>

```

####   `should render with image attributes`

```
<div class="bx--callout__column">
  <div class="bx--callout__content">
    <slot name="heading">
    </slot>
    <div class="bx--content-block__children">
      <div class="bx--content-block-simple__content">
        <div class="bx--content-item">
          <slot>
          </slot>
        </div>
        <div>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      class="bx--content-block__cta-row"
      hidden=""
    >
      <div class="bx--content-block__cta bx--content-block__cta-col">
        <slot name="cta">
        </slot>
      </div>
    </div>
    <slot name="complementary">
    </slot>
  </div>
</div>

```

####   `should render with video attributes`

```
<div class="bx--callout__column">
  <div class="bx--callout__content">
    <slot name="heading">
    </slot>
    <div class="bx--content-block__children">
      <div class="bx--content-block-simple__content">
        <div class="bx--content-item">
          <slot>
          </slot>
        </div>
        <div>
          <slot name="media">
          </slot>
        </div>
      </div>
    </div>
    <div
      class="bx--content-block__cta-row"
      hidden=""
    >
      <div class="bx--content-block__cta bx--content-block__cta-col">
        <slot name="cta">
        </slot>
      </div>
    </div>
    <slot name="complementary">
    </slot>
  </div>
</div>

```

