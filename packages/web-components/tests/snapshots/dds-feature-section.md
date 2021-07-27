# `dds-feature-section`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--card bx--feature-card__card bx--feature-section bx--grid bx--tile">
  <div class="bx--feature-section__container bx--row">
    <div class="bx--col-lg-8 bx--col-md-8 bx--col-sm-4 bx--feature-section__body">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--col-md-6 bx--col-sm-4">
            <slot name="eyebrow">
            </slot>
            <slot name="heading">
            </slot>
            <slot name="copy">
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="bx--col-lg-8 bx--col-md-8 bx--col-sm-4 bx--feature-section__image">
      <slot name="image">
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--card bx--feature-card__card bx--feature-section bx--grid bx--tile">
  <div class="bx--feature-section__container bx--row">
    <div class="bx--col-lg-8 bx--col-md-8 bx--col-sm-4 bx--feature-section__body">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--col-md-6 bx--col-sm-4">
            <slot name="eyebrow">
            </slot>
            <slot name="heading">
            </slot>
            <slot name="copy">
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="bx--col-lg-8 bx--col-md-8 bx--col-sm-4 bx--feature-section__image">
      <slot name="image">
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

