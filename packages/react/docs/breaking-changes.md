# Breaking changes

## v1.32.0

### Deprecation warning

#### React

- The React `Masthead` is now in feature freeze, where any new features or enhancements will only be done on the Web Component version. We will continue to support
any bugs or issues for the rest of `Carbon for IBM.com v1`.

## v1.28.0

### Deprecation warning

#### React

- `Layout` has been deprecated to better align with the style mixin and classes used in Web Components. Layout documentation has been updated on how to use the mixin and classes.

## v1.26.0

### Deprecation warning

- Due to low usage, and the availability of more rapid full releases, we are
  discontinuing bi-weekly beta releases of Carbon for IBM.com.

## v1.25.0

### Design adjustment

- All content block and content group components should now pass the Card
  CTA `copy` as `heading`. Example:

```javascript
<ContentBlockSimple
  cta={{
    cta: {
      href: 'https://www.example.com',
    },
    style: 'card',
    type: 'local',
    heading: 'Lorem ipsum dolor sit ametttt',
  }}
  ...
/>
```

## v1.24.0

### Deprecation warning

#### Styles

- The `Expressive Theme` has been integrated into Carbon Design System’s core
  library. This means that expressive continues to be available to IBM.com, but
  now all Carbon adopters can get both productive and expressive experiences
  from the same library source. This change will be seamless for current
  adopters of Carbon for IBM.com. In the next few sprints, we will be shifting
  to use expressive styling and elements from core, then the Expressive Theme
  within Carbon for IBM.com will no longer be maintained.

## v1.23.0

### Deprecation warning

#### Services

- `AnalyticsAPI.initScrollTracker` has been deprecated as GESTURES v1.x should
  no longer be used. GESTURES v2.x is owned by IBM DBDM team and is managed
  within their platform.

## v1.22.0

### Deprecation warning

#### Services

- `VideoPlayerAPI` has been deprecated in favor of `KalturaPlayerAPI`

## v1.20.0

### Deprecation warning

- With the continuing enhancements and changes in the `lead space`, the `react`
  version is now in feature freeze. For any new features and enhancements of the
  `lead space`, the wrapper version of the `web-components` lead space should be
  used.

## v1.11.0

- The `<HorizontalRule />` has a change in prop name, namely the `style` prop is
  now called `type`.

### Services

- The environment variable `SEARCH_TYPEAHEAD_HOST` has been renamed to
  `SEARCH_TYPEAHEAD_API`.

## v1.9.0

### Deprecation warning

#### Patterns are now Components!

Similar to the pivot from `v1.8.0` release for `sub-patterns`, we have now
consolidated all `patterns / blocks` and `patterns / sections` into
`components`, so now all `coded things` are considered as `components`! With
this change, the `scss` imports have now been remapped under `/scss/components`,
however we have kept a deprecation import so that nothing breaks (for now) on
the application side. A deprecation warning will show for imports pointing to
the patterns folder, which we will ultimately remove in a future release.

## v1.8.0

### Deprecation warning

#### Sub-patterns

Sub-patterns have been consolidated into `components`. With this change, the
scss imports now fall under the `components` folder instead of `sub-patterns`. A
deprecation warning will show for imports pointing to the `sub-patterns`
folder, which we will ultimately remove in a future release.

## v1.7.0

- The `DotcomShell` formerly passed in `Footer` and `Masthead` props as flat
  props into the `DotcomShell` for functionality. We are now breaking them out
  into two separate prop objects, `footerProps` and `mastheadProps`. If you are
  upgrading to `v1.7.0` and are using the `DotcomShell`, you will need to make
  this modification to your code for it to continue to render properly.

