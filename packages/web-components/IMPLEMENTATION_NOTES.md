# `@carbon/ibmdotcom-web-components`

`@carbon/ibmdotcom-web-components` package consists of components based on [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom) and [Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements) specs that are under [Web Components](https://developers.google.com/web/fundamentals/web-components) umbrella.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Categories of components](#categories-of-components)
- [Carbon core library](#carbon-core-library)
- [Component CSS](#component-css)
  - [Usage of Sass](#usage-of-sass)
  - [Styles in Shadow DOM](#styles-in-shadow-dom)
- [Rendering target](#rendering-target)
  - [Composite components](#composite-components)
  - [Components rendering modal](#components-rendering-modal)
- [CTA components](#cta-components)
  - [Video CTA](#video-cta)
- [React integration](#react-integration)
  - [React wrapper generator](#react-wrapper-generator)
  - [Build procedure to generate React wrapper](#build-procedure-to-generate-react-wrapper)
    - [Limited components to generate React wrapper](#limited-components-to-generate-react-wrapper)
  - [Non-React APIs for React integration](#non-react-apis-for-react-integration)
- [Container components](#container-components)
  - [Triggering action dispatcher](#triggering-action-dispatcher)
- [Masthead search](#masthead-search)
- [TypeScript type definition](#typescript-type-definition)
- [Vendor directory](#vendor-directory)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Categories of components

There are three categories of components in `@carbon/ibmdotcom-web-components`:

| State                                         | Description                                                                                                                                                                                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UI components                                 | Components that define the user interface. Most components are in this category.                                                                                                                                                                             |
| Composite components                          | Components that render UI components from object structure given via property. An example is `<dds-masthead-composite>` that renders top/left navs from `navLinks` property as an object. Components in this category should have `<*-composite>` tag names. |
| [Container components](#container-components) | Inheritances of composite components that connects to `@carbon/ibmdotcom-service`.                                                                                                                                                                           |

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

The above custom toolchain allows us to use Sass for our components, as well as to put Sass/CSS code in a separate location from the component code.

### Styles in Shadow DOM

One of the greatest features in Web Components is that CSS is isolated within components, thanks to Shadow DOM. Component CSS doesn't affect application CSS, or vice versa. This allows users to gradually migrate from `v18` design assets to Carbon for IBM.com design assets, for example.

Style isolation within component causes challenges in implementing component styles, in some cases. One of the biggest challenge is a component that requires different style if it's put in another component's child.

Style defined in the shadow DOM can define the style of the direct child with [`::slotted()` pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted), but [cannot define the style of the descendants](https://github.com/WICG/webcomponents/issues/745).

There are several approaches `@carbon/ibmdotcom-web-components` to choose from depending on what best suits the use case:

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

### Video CTA

`video` CTA type requires more features, which is implemented by [`VideoCTAMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/video.ts). Every CTA component but `<dds-feature-cta-footer>` supports `video` CTA type (at the point of `v1.15.0`) and thus extend `VideoCTAMixin`. `VideoCTAMixin` implements the following:

- Send an event (`dds-cta-run-action`) when user clicks on CTA
- Send an event (`dds-cta-request-video-data`) when the CTA type is `video` and video info (caption, duration and thumbmail) hasn't been loaded yet

Those events are handled by [`<dds-video-cta-container>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-container.ts):

| Event                        | Behind-the-scene logic of `<dds-video-cta-container>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dds-cta-run-action`         | Launches the light box, by [setttng `_activeVideoId` private property](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L102) and [using it to trigger opening the modal](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L157). `_activeVideoId` should be cleared once user closes the light box.                                                                                                                                                |
| `dds-cta-request-video-data` | [Loads the video info](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L84) via [Redux store](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/videoPlayerAPI.ts#L63-L84), and [updates `event.target` with the loaded video info](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L87-L88). `event.target` should be a CTA component as CTA component is the one firing the event. |

Only one instance of `<dds-video-cta-container>` is needed in an application, as long as it contains all CTA components like [what's seen as the CTA story's Storybook decorator](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/__stories__/cta.stories.ts#L176-L182). Such separation of concern between `<dds-*-cta>` and `<dds-video-cta-container>` keeps `<dds-*-cta>` lightweight and simple.

- Send an event (`dds-cta-request-video-data`) when user clicks on CTA so that the lightbox video player code can launch the light box
- (Video caption/duration/thumbnail)

## React integration

While Angular/Vue require limited/no change in application to use Web Components, React has some problems with Web Components support. React heavily relies on its knowledge with regard to how intrinsic HTML elements work.

For example, if you have `<dds-foo custom-boolean={true}>`, the DOM becomes `<dds-foo custom-boolean="true">` that is different from how `<button disabled={true}>` is rendered to DOM, which is, `<button disabled>` (empty string in `disabled` attribute value).

Another example is `<dds-foo onFoo={handleFoo}>` that doesn't attach an event handler, whereas `<div onClick={handleClick}>` does.

### React wrapper generator

Web Components community [made React core team aware of above issue](https://github.com/facebook/react/issues/11347), and created a [proposal](https://github.com/reactjs/rfcs/pull/15) to address that.

`carbon-web-components` library implements a variant of the proposal, with [`createReactCustomElementType()` function](https://github.com/carbon-design-system/carbon-web-components/blob/v1.11.0/src/globals/wrappers/createReactCustomElementType.ts). Below example create a React component, `BXDropdown`, from `<bx-dropdown>` custom element:

```javascript
import createCustomElementType, { booleanSerializer } from 'carbon-web-components/es/globals/wrappers/createCustomElementType';

const BXDropdown = createCustomElementType('bx-dropdown', {
  disabled: {
    serialize: booleanSerializer,
  },
  helperText: {
    attribute: 'helper-text',
  },
  onBeforeSelect: {
    event: 'bx-dropdown-beingselected',
  },
});
```

We call React components that `createCustomElementType()` creates, e.g. `<BXDropdown>`, _React wrappers_. React wrapper provides the following enhancement over directly using `<bx-dropdown>` in JSX:

- `<BXDropdown disabled={true}>` yeilds to `<bx-dropdown disabled>` and `<BXDropdown disabled={false}>` causes `disabled` attribute removed from `<bx-dropdown>`.
- `<BXDropdown helperText="The helper text">` yields to `<bx-dropdown helper-text="The helper text">`.
- `<BXDropdown onBeforeSelect={handleBeforeSelect}>` attaches `bx-dropdown-beingselected` event to `<bx-dropdown>`.

### Build procedure to generate React wrapper

`carbon-web-components` as well as `@carbon/ibmdotcom-web-components` have a build procedure to generate the React wrapper using `createReactCustomElementType`. It uses a [Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/tools/babel-plugin-create-react-custom-element-type.js) that transforms the original custom element type code to a corresponding React wrapper, by looking at `lit-element`'s `@property` decorator and `eventXXX` static properties in the custom element class. The build procedure can be found at [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L159-L170).

There is [another Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/tools/babel-plugin-create-react-custom-element-type-def.js) that transforms the original custom element type code to a corresponding TypeScript definition to above React wrapper, leveraging the same `@property` and `eventXXX` in the custom element class. The build procedure can be found at [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L385-L397).

#### Limited components to generate React wrapper

At the point of `v1.15.0` release, we decided that we generate React wrappers only for components without pure-React counterpart, for example, `<dds-carousel>` and `<dds-leaving-ibm-modal>`.

Those kind of components should have `/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */` annotation at the default export. Such annotation is read by a [Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/tools/babel-plugin-scan-create-react-custom-element-type-candidates.js) so the build procedure can [harvest the list of files to generate React wrappers for](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L126-L148).

### Non-React APIs for React integration

There are a couple of types of non-React APIs that application can use with React integration code:

- Constant/enum definitions, e.g. `PICTOGRAM_PLACEMENT` for `<dds-card>`
- `mapStateToProps()`/`mapDispatchToProps()` for Redux integration

Because of non-React nature, the implementation is identical to the original Web Components code, while we want to make them available to React users. Therefore, we create modules in `es/components-react` directory that proxies to one in `es/components`, like:

```javascript
export * from '../../components/card/defs.js';
```

The build procedure can be found at [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L257-L282).

## Container components

Container components are inheritances of composite components that connects to `@carbon/ibmdotcom-service`. Connecting to `@carbon/ibmdotcom-service` is done via a Redux store, [`@carbon/ibmdotcom-services-store`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/v1.13.0/packages/services-store). Connecting to `@carbon/ibmdotcom-services-store` is done by [`ConnectMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/connect.ts) that has a similar feature set to [`react-redux`](https://react-redux.js.org).

> 💡 `import`s of `@carbon/ibmdotcom-services-store` is slightly different from one of regular NPM packages.
> See [vendor directory](#vendor-directory) section for more details.

Similar to `react-redux`, `ConnectMixin` uses two callbacks:

| Callback                                                                                                                                                                                                                                                                                  | Description                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`mapStateToProps()`](https://react-redux.js.org/api/connect#mapstatetoprops-state-ownprops--object) ([Example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/footer/footer-container.ts#L89-L106))                   | Defines how React state maps to the properties in container components. Updates in those properties will cause re-rendering container component. |
| [`mapDispatchToProps()`](https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object) ([Example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/footer/footer-container.ts#L108-L126)) | Creates Redux action dispatchers from action creators, and maps them to properties in container components.                                      |

And container components are created by `ConnectMixin` like:

```typescript
@customElement(`${ddsPrefix}-footer-container`)
class DDSFooterContainer extends ConnectMixin(store, mapStateToProps, mapDispatchToProps)(DDSFooterComposite) {}
```

As seen in above example, one notable difference of `ConnectMixin` from `react-redux` is that the created class (container component) is tied to `store` at the time of creating the class, whereas `react-redux` lets application specify what `store` to use via [`<Provider>`](https://react-redux.js.org/api/provider). This is because `<Provider>` relies on [React context](https://reactjs.org/docs/context.html), a React-specific paradigm.

### Triggering action dispatcher

Many container components in `@carbon/ibmdotcom-web-components` loads data from `@carbon/ibmdotcom-services` at the time of creation. `lit-element`'s [`firstUpdated()`](https://lit-element.polymer-project.org/guide/lifecycle#firstupdated) lifecycle method is used for that purpose, like:

```javascript
firstUpdated() {
  const { language } = this;
  if (language) {
    this._setLanguage?.(language);
  }
  this._loadLangDisplay?.(language);
  this._loadTranslation?.(language);
}
```

`_setLanguage()`, `_loadLangDisplay()` and `_loadTranslation()` are Redux action dispatchers defined at [`mapDispatchToProps()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/footer/footer-container.ts#L108-L126), that maps to [`setLanguage()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/localeAPI.ts#L38-L47), [`loadLangDisplay()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/localeAPI.ts#L166-L194) and [`loadTranslation()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/translateAPI.ts#L64-L92) Redux actions, respectively.

`setLanguage()` sets currently used language to use for the display language and the translation data. `loadLangDisplay()` loads the display language. `loadTranslation()` loads the translation data.

See [the implementation notes for the Redux store](../services-store/IMPLEMENTATION_NOTES.md) for more details on what happens behind the scene of Redux store.

## Masthead search

The search box feature in masthead consists of two things:

| Component                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<dds-masthead-search>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search.ts)                     | The search box UI.                                                                                                                                                                                                                                                                                        |
| [`<dds-masthead-search-container>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-container.ts) | The component to load and render search results. Unless masthead search feature is used stand-alone, `<dds-masthead-container>` [plays this role](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-container.ts#L104). |

`<dds-masthead-search>` fires `dds-masthead-search-input` event when user types in the input box. `<dds-masthead-search-composite>`, the underlying component behind `<dds-masthead-search-container>`, [runs](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L43-L46) [`loadSearchResults()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/searchAPI.ts#L93-L120) Redux action upon [`dds-masthead-search-input`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L139) event.

`<dds-masthead-search-composite>` uses [`ThrottledInputMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/throttled-input.ts) to throttle `dds-masthead-search-input` event. `ThrottledInputMixin` calls `_handleThrottledInput()` method, throttled, as the event defined by `eventInput` static method is fired.

`<dds-masthead-search-container>` [intersects the search query with the table of loaded search results](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-container.ts#L64-L70) and [sets `currentSearchResults` property](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-container.ts#L72), which is [rendered as `<dds-masthead-search-item>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L118-L123).

## TypeScript type definition

All TypeScript code in our source code is transpiled to plain JavaScript code, by a [Babel plugin](https://www.npmjs.com/package/@babel/plugin-transform-typescript). Applications can still refer to our TypeScript types, via `.d.ts` files we ship.

The `.d.ts` files are generated by [regular TypeScript toolchain](https://www.npmjs.com/package/typescript), via [`gulp-typescript`](https://www.npmjs.com/package/gulp-typescript). The build procedure can be found at [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L474-L490).

> 💡 The `.d.ts` for React wrappers are generated by our [custom Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/babel-plugin-create-react-custom-element-type-def.js). An example of such `.d.ts` file can be found [here](https://unpkg.com/@carbon/ibmdotcom-web-components@1.0.0/es/components-react/card/card.d.ts). The build procedure can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L388-L397).

## Vendor directory

`@carbon/ibmdotcom-services-store` is a private package that is not published to NPM. Putting it to `package.json` will break application because it won't be found.

To solve the problem, [build process](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/vendor.js) of `@carbon/ibmdotcom-web-components` copies the build artifact of `@carbon/ibmdotcom-services-store` to `packages/web-components/src/internal/vendor/@carbon/ibmdotcom-services-store` as well as to `packages/web-components/es/internal/vendor/@carbon/ibmdotcom-services-store`. The former is used for our development. The latter is for application, being as [part of `@carbon/ibmdotcom-web-components` package](https://unpkg.com/browse/@carbon/ibmdotcom-web-components@1.0.0/es/internal/vendor/@carbon/ibmdotcom-services-store/).

The `import`s of `@carbon/ibmdotcom-services-store` code in `@carbon/ibmdotcom-web-components` codebase refer to those copies, instead of to `@carbon/ibmdotcom-services-store` package, like below:

```javascript
import { loadLanguage, setLanguage } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
```
