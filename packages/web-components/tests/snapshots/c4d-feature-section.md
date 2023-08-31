# `c4d-feature-section`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--card cds--feature-card__card cds--feature-section cds--grid cds--tile">
  <div class="cds--feature-section__container cds--row">
    <div class="cds--col-lg-8 cds--col-md-8 cds--col-sm-4 cds--feature-section__body">
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--col-md-6 cds--col-sm-4">
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
    <div class="cds--col-lg-8 cds--col-md-8 cds--col-sm-4 cds--feature-section__image">
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
<div class="cds--card cds--feature-card__card cds--feature-section cds--grid cds--tile">
  <div class="cds--feature-section__container cds--row">
    <div class="cds--col-lg-8 cds--col-md-8 cds--col-sm-4 cds--feature-section__body">
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--col-md-6 cds--col-sm-4">
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
    <div class="cds--col-lg-8 cds--col-md-8 cds--col-sm-4 cds--feature-section__image">
      <slot name="image">
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </div>
</div>

```

