# Breaking changes

## v1.13.0

### Dependency updates

- Starting in `v1.13.0`, `Carbon for IBM.com Web Components` will include 
  `lit-html` and `lit-element` as `dependencies` rather than 
  `peerDependencies`. This means that installing on applications will no longer 
  be required and can be safely removed from the project setup for using 
  `Carbon for IBM.com`. 

## v1.11.0

### Deprecation warning

- Due to low usage, and the availability of more rapid full releases, we are
  discontinuing bi-weekly beta releases of Carbon for IBM.com.

## v1.10.0

### Design adjustment

- All content block and content group components should now
  use `<dds-card-link-cta>`
  instead of `<dds-card-cta>` for the footer CTA component per design
  specifications. Example markup:

```html

<dds-content-block-simple>
  ...
  <dds-card-link-cta slot="footer" cta-type="local" href="https://www.ibm.com/">
    <dds-card-link-heading>Lorem ipsum dolor sit amet</dds-card-link-heading>
    <dds-card-cta-footer>
      ...
    </dds-card-cta-footer>
  </dds-card-link-cta>
</dds-content-block-simple>
```

## v1.9.0

### Deprecation warning

#### Styles

- The `Expressive Theme` has been integrated into Carbon Design System’s core
  library. This means that expressive continues to be available to IBM.com, but
  now all Carbon adopters can get both productive and expressive experiences
  from the same library source. This change will be seamless for current
  adopters of Carbon for IBM.com. In the next few sprints, we will be shifting
  to use expressive styling and elements from core, then the Expressive Theme
  within Carbon for IBM.com will no longer be maintained.

## v1.8.0

- Some breaking changes were introduced in the `card` component. For the
  following components, `card-footer` must be changed to `card-cta-footer`,
  `card-section-simple`, `card-section-offset`, `card-section-images`,
  `card-group-item`

### Deprecation warning

#### Services

- `AnalyticsAPI.initScrollTracker` has been deprecated as GESTURES v1.x should
  no longer be used. GESTURES v2.x is owned by IBM DBDM team and is managed
  within their platform.

## v1.7.0

### Services

#### Deprecation warning

- `VideoPlayerAPI` has been deprecated in favor of `KalturaPlayerAPI`

## v1.3.0

- **card-in-card**: `<dds-card-in-card-footer>` is replaced with
  `<dds-card-cta-footer>`
- **cta-section**: `<dds-cta-section>` has various API updates per updated
  designs
- **callout-with-media**: `<dds-content-block-copy>` is replaced with
  `<dds-callout-with-media-copy>`

## v1.0.0

* The slot names for multiple components have changes, namely the reconciliation
  of the naming of the `footer` slots, as well as `action` slots. Be sure to
  check updated documentation when updating to this version release of web
  components. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4635
* The `mark-type` attribute of `<dds-quote>` now takes dash-cased values
  (e.g. `double-curved`) instead of camel-cased values (`doubleCurved`). PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4658
* The shadow slot names of `<dds-quote>` are now dash-cased
  (e.g. `source-heading`) instead of camel-cased (e.g. `sourceHeading`). PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4756
* Card slots `eyebrow` and `heading` are now custom elements `dds-card-eyebrow`
  and `dds-card-heading` respectively. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4783
* `copy` slot in `<dds-quote>` now is the default slot. Also other slots in
  `<dds-quote>` no longer has styling elements around it for better flexibility.
  The default styles are implemented by `<dds-quote-source-copy>`
  /`<dds-quote-source-heading>`/`<dds-quote-source-bottom-heading>`. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4840
* `copy` slot in `<dds-leadspace>` now is the default slot. Also `title` slot in
  `<dds-leadspace>`/`<dds-leadspace-block>` no longer has styling elements
  around it for better flexibility. The default styles are implemented by
  `<dds-leadspace-heading>`. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4841
* `eyebrow` slot in `<dds-content-item-horizontal>` no longer has styling
  elements around it for better flexibility. The default styles are implemented
  by `<dds-content-item-horizontal-eyebrow>`. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4842
* `<slot name="heading">` in `<dds-feature-card-block-medium>` is renamed to
  `<slot="block-heading">`. Also `<slot name="copy">` in the same component is
  renamed to `<slot name="heading">`. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4850
* `<dds-content-block-simple>` and `<dds-callout-with-media>` use
  `<dds-content-block-copy size="sm">` instead of `<dds-content-item-copy>` for
  the copy content. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4869
* `<dds-content-group>` descendants use `<dds-content-group-copy>` instead of
  `<dds-content-item-copy>` (or plane `<p>`) for the copy content. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4869
* `<slot name="content">` in `<dds-content-block>` and `<dds-content-group>`
  descendants has become the default slot. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4869
* `<slot name="buttons">` in `<dds-leadspace>` is changed to
  `<slot name="action">` to align to `<dds-cta-section>`. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4898
* The default `<slot>` for `<dds-cta-section>` is repurposed from one for copy
  content to one for child content items. The slot for copy content is now
  `<slot name="copy">`. PR
  reference: https://github.com/carbon-design-system/carbon-for-ibm-dotcom/pull/4897

### Services

* The `monitorUserStatus` function has been removed from the `ProfileAPI` as it
  is no longer used in the `services-store` package.
