# `@carbon/ibmdotcom-web-components`

`@carbon/ibmdotcom-web-components` package consists of components based on [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom) and [Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements) specs that are under [Web Components](https://developers.google.com/web/fundamentals/web-components) umbrella.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Categories of components](#categories-of-components)
- [Carbon core library](#carbon-core-library)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Categories of components

There are three categories of components in `@carbon/ibmdotcom-web-components`:

| State                | Description                                                                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UI components        | Components that define the user interface. Most components are in this category.                                                                                                                                                                             |
| Composite components | Components that render UI components from object structure given via property. An example is `<dds-masthead-composite>` that renders top/left navs from `navLinks` property as an object. Components in this category should have `<*-composite>` tag names. |
| Container components | Inheritances of composite components that connects to `@carbon/ibmdotcom-service`.                                                                                                                                                                           |

## Carbon core library

Some components in UI components category [above](#categories-of-components) extend Web Components version of Carbon core library, [`carbon-web-components`](https://github.com/carbon-design-system/carbon-web-components). Some major components that extend Web Components version of Carbon core library are below, but there are many others:

| Component                                                                                                                                                                                 | Extends from                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [`<dds-card>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/web-components/src/components/card/card.ts)                                             | [`<bx-link>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/link/link.ts)                 |
| [`<dds-link-with-icon>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/web-components/src/components/link-with-icon/link-with-icon.ts)               | [`<bx-link>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/link/link.ts)                 |
| [`<dds-top-nav>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/web-components/src/components/masthead/top-nav.ts)                                   | [`<bx-header-nav>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/ui-shell/header-nav.ts) |
| [`<dds-left-nav>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/web-components/src/components/masthead/left-nav.ts)                                 | [`<bx-side-nav>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/ui-shell/side-nav.ts)     |
| [`<dds-language-selector-desktop>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/web-components/src/components/footer/language-selector-desktop.ts) | [`<bx-combo-box>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/combo-box/combo-box.ts)  |
| [`<dds-language-selector-mobile>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/web-components/src/components/footer/language-selector-mobile.ts)   | [`<bx-select>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/select/select.ts)           |

## Component CSS

### Usage of Sass

Most components have the following to define CSS:

```typescript
import styles from './some-component.scss';

@customElement('dds-some-component')
class DDSSomeComponent extends LitElement {
  ...

  static styles = styles;
}
```

There are several things behind the scene of that.

- In Storybook environments, in addition to `sass-loader`/`postcss-loader`/`style-loader` chains, we use a [custom WebPack loader](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/tools/css-result-loader.js) that generates `lit-html`'s [CSS tagged template](https://lit-element.polymer-project.org/guide/styles#add-styles) from the generated CSS.
- For production builds, we [generate `.css.js` file](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/gulp-tasks/build.js#L79-L88) that exports `lit-html`'s [CSS tagged template](https://lit-element.polymer-project.org/guide/styles#add-styles) with the CSS compiled from the Sass code. The [`import` path is changed to refer to such generated `.css.js` file](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/tools/babel-plugin-resource-js-paths.js#L24-L26).

Above custom toolchain allows us to use Sass for our components, as well as to put Sass/CSS code in a separate location from the component code.

### Styles in Shadow DOM

One of the greatest features in Web Components is that CSS is isolated within components, thanks to Shadow DOM. Component CSS doesn't affect application CSS, or vice versa. This allows user to do gradual migration from `v18` design assets from Carbon for IBM.com design assets, for example.

Style isolation within component causes challenges in implementing component styles, in some cases. One of the biggest challenge is a component that requires different style if it's put in another component's child.

Style defined in the shadow DOM can define the style of the direct child with [`::slotted()` pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted), but [cannot define the style of the descendants](https://github.com/WICG/webcomponents/issues/745).

There are a couple approaches `@carbon/ibmdotcom-web-components` chooses from depending on what best suits the use case:

1. Create an inherited class with different style applied (e.g. [`<dds-callout-quote>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/callout-quote/callout-quote.ts) that extends `<dds-quote>`)
2. Use CSS custom properties (as they are inherited to descendant DOM elements). An example is [seen in `<dds-link-list>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/components/link-list/link-list.scss#L34). It may not be a good idea to use this approach if we end up with many custom properties, though

## Rendering target

Most components renders its contents in shadow DOM. However, there are some exceptions.

### Composite components

[Composite components](#categories-of-components) render its primary content to light DOM because the content is sub-components the composite component consists of, rather than the implementation details.

There are two choices to rendering the primary content to light DOM:

- Return `this` (instead of `this.shadowRoot`) in [`createRenderRoot()`](https://lit-element.polymer-project.org/guide/templates#renderroot). ([Example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-composite.ts#L381-L384))
- Use [`HybridRenderMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/hybrid-render.ts) and render the primary content with `renderLightDOM()` instead of `render()`. This is useful if a composite component wants to define some style in the host element, e.g. to [avoid creating a box of the host element](https://www.w3.org/TR/css-display-3/#valdef-display-contents). ([Example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L114-L126))

### Components rendering modal

Given modal component contains its overlay (half-transparent gray defined as `$overlay-01`), rendering it in shadow DOM or as child elements causes the overlay to be rendered within the component where the overlay should cover the entire viewport.

`@carbon/ibmdotcom-web-components` has [`ModalRenderMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/modal-render.ts) to solve this problem. Components that extend `ModalRenderMixin` can use `renderModal()` method (instead of `render()`) to render the modal content so the modal content is rendered right under `<body>`. [Here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/image-with-caption/image-with-caption.ts#L139-L155) is an example.

## CTA components

There are some common behaviors in CTA components, that is implemented by [`CTAMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts):

- [Setting different icons for different CTA types](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts#L90-L93)
- [Changing `target` attribute of `<a>` for `external` CTA type](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts#L123-L132)
- [Turn the link to a pseudo one for `video` CTA type](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts#L113-L122)

`video` CTA type requires more features, which is implemented by [`VideoCTAMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/video.ts). Every CTA component but `<dds-feature-cta-footer>` supports `video` CTA type (at the point of `v1.15.0`) and thus extend `VideoCTAMixin`. `VideoCTAMixin` implements the following:

- Send an event (`dds-cta-request-video-data`) when user clicks on CTA so that the lightbox video player code can launch the light box
- (Video caption/duration/thumbnail)
