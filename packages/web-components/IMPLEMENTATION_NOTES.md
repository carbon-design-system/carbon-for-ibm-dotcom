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
  - [React SSR integration](#react-ssr-integration)
  - [Composite/container components for React](#compositecontainer-components-for-react)
- [Container components](#container-components)
  - [Triggering action dispatcher](#triggering-action-dispatcher)
- [Masthead search](#masthead-search)
- [TypeScript type definition](#typescript-type-definition)
- [Vendor directory](#vendor-directory)
- [Rollup bundle for Dotcom Shell](#rollup-bundle-for-dotcom-shell)
  - [Sass optimization](#sass-optimization)
  - [HTML optimization](#html-optimization)
  - [Custom element definition for `carbon-web-components`](#custom-element-definition-for-carbon-web-components)
  - [Building icons](#building-icons)
  - [Building styles](#building-styles)
  - [License header](#license-header)
- [Unit tests](#unit-tests)
  - [Test setup](#test-setup)
  - [Writing tests](#writing-tests)
    - [Rendering a template](#rendering-a-template)
    - [Waiting for template to be updated](#waiting-for-template-to-be-updated)
    - [Changing a public property](#changing-a-public-property)
    - [Changing a private property](#changing-a-private-property)
    - [Simulating a user action](#simulating-a-user-action)
    - [Inspecting a DOM element or a component property](#inspecting-a-dom-element-or-a-component-property)
    - [Seeing if a particular method has been called or a particular event has been fired](#seeing-if-a-particular-method-has-been-called-or-a-particular-event-has-been-fired)
  - [Defining mocks](#defining-mocks)
  - [Restoring state](#restoring-state)
- [RTL support](#rtl-support)
- [Storybook CSF integration](#storybook-csf-integration)
- [License header](#license-header-1)
- [Focus wrapping](#focus-wrapping)

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

## Video player

Video player has two states, one is [thumbnail mode](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/defs.ts#L17) and one is [video (playing) mode](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/defs.ts#L22). When user clicks on video thumbmail, [`dds-video-player-content-state-changed` event is fired](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player.ts#L42-L51) so `<dds-masthead-composite>` can [start embedding the video](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L80-L86).

Embedding the video involves:

1. [Creating the DOM element of the video](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-container.ts#L157-L159)
2. [Putting above DOM element to the right place](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-container.ts#L160-L164). `<dds-video-player-composite>` specifies the place for the DOM element of the video via [`selectorVideoPlayer` static property](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L182-L184). [`<dds-lightbox-video-player-composite>` overrides it](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/lightbox-media-viewer/lightbox-video-player-composite.ts#L119-L121).
3. [Calling video player API from `@carbon/ibmdotcom-services`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-container.ts#L165)

Video player in Web Components codebase allows embedded videos to be reused, e.g. for re-opening lightbox. To do that, instead of throwing away the DOM of embedded video, the code [stops the video](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L59) and [hides the DOM of the embedded video](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L62) when the embedded video should stop being presented.

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

### React SSR integration

With `12.16.3` or higher version of Node, the React wrappers can be server-side rendered.

Running our component code in Node causes JavaScript error because:

- Web Components spec is based on HTMLElement, a spec on browser
- `lit-html` and `lit-element` ships only their ESM code

To avoid such JavaScript error, we leverage [conditional mapping](https://github.com/jkrems/proposal-pkg-exports#2-conditional-mapping) feature that was introduced in Node `12.16.3`, that allows us to write something like below in `package.json`:

```json
"exports": {
  "./es/components-react/": {
    "node": "./lib/components-react-node/",
    "default": "./es/components-react/"
  }
}
```

It makes `import` or `require()` behave like:

| `import` or `require()`                                                     | File loaded in browser                      | File loaded in Node                               |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| `@carbon/ibmdotcom-web-components/es/components-react/masthead/masthead.js` | `/es/components-react/masthead/masthead.js` | `/lib/components-react-node/masthead/masthead.js` |

And the file loaded in browser (browser version) and the file loaded in Node (Node version) have the following differences, so Node version won't cause JavaScript error by running ESM or browser-specific code:

| Item                                       | Browser version | Node version |
| ------------------------------------------ | --------------- | ------------ |
| Module format                              | ESM             | CommonJS     |
| Loads Web Components implementation module | Yes             | No           |
| Loads `lit-html` and `lit-element`         | Yes             | No           |

### Composite/container components for React

React wrappers for composite components renders Web Components of leaf components, instead of the Web Components version of composite component. Doing so ensures React SSR works for REST API calls, reducing network round-trips that is the key benefit of React SSR. An example is [one for `<dds-leaving-ibm-modal>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components-react/leaving-ibm/leaving-ibm-composite.tsx).

React wrappers for container components uses official Redux integration library, `react-redux`. Doing so allows application of Redux store to be scoped, leveraging [React's context feature](https://reactjs.org/docs/context.html). An example is [one for `<dds-leaving-ibm-modal>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components-react/leaving-ibm/leaving-ibm-container.ts).

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

## Rollup bundle for Dotcom Shell

For quick setup of project using minimum feature set (Dotcom Shell) of `@carbon/ibmdotcom-web-components`, a [Rollup bundle](https://unpkg.com/browse/@carbon/ibmdotcom-web-components@1.0.0/dist/ibmdotcom-web-components-dotcom-shell.min.js) is provided.

The Rollup bundle builds the [entry point (`ibmdotcom-web-components-dotcom-shell.ts`)](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/globals/ibmdotcom-web-components-dotcom-shell.ts). Whenever the Dotcom Shell contains a new components, etc. the entry point file must be updated.

### Sass optimization

The [Rollup config](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L80-L89) replaces `.css.js` files with [`.scss` entry point file (`ibmdotcom-web-components-dotcom-shell.scss`)](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/globals/scss/ibmdotcom-web-components-dotcom-shell.scss), so that CSS code that are included in multiple `.css.js` files (e.g. Carbon reset styles) are not duplicated in the Rollup bundle.

### HTML optimization

The Rollup bundle [minifies HTML content in `lit-html` templates](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L116-L131) to reduce its size.

### Custom element definition for `carbon-web-components`

The Rollup bundle [does _not_ define custom elements from `carbon-web-components`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L135-L140), because the bundle is not meant for `carbon-web-components`' bundle.

### Building icons

There are some icons from `@carbon/ibmdotcom-styles` included in the Rollup bundle. We use a [Rollup plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/rollup-plugin-ibmdotcom-icon.js) that converts those icons to `lit-html` version.

### Building styles

To build `.scss` files into the Rollup bundle, we use a [Rollup plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/rollup-plugin-lit-scss.js) to build the Sass and convert it to a `lit-html` template.

### License header

Given the Rollup bundle includes third-party dependencies, we use a [Rollup plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/rollup-plugin-license.js) to aggregate the license headers of those third-party dependencies and to put it to the top, along with our own license header.

## Unit tests

Unit tests for `@carbon/ibmdotcom-web-components` uses [Karma](http://karma-runner.github.io/latest/index.html), so that we can inspect the DOM to debug unit tests. `@carbon/ibmdotcom-web-components` uses [Jasmine](https://jasmine.github.io) for test definition and assertion, with a [custom matcher for snapshots](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tests/utils/snapshot.js).

Please refer to [our developer documentation](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/docs/contributing-to-web-components.md#unit-test-coverage) to see how to run the tests.

### Test setup

The Karma configuration can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tests/karma.conf.js).

`@carbon/ibmdotcom-web-components` uses [`karma-webpack`](https://www.npmjs.com/package/karma-webpack) to resolve ECMAScript modules in tests, and uses [`karma-snapshot`](https://www.npmjs.com/package/karma-snapshot) to save/load the snapshots.

### Writing tests

Most unit tests consists of the following parts:

1. Render a template
1. Wait for the template to be rendered
1. (Optional) Do either of:

   1. Change a public property or a private property
   1. Simulate a user action

1. (Optional) Wait for the template to be updated upon above change
1. Do one of below to see if above yields to the desired result:

   1. Inspect the DOM content
   2. Inspect a component property
   3. See if a particular method has been called or a particular event has been fired

#### Rendering a template

We use [`lit-html`](https://lit-html.polymer-project.org), the underlying template library of `lit-element`, for that purpose. In some cases, we reuse templates from [Storybook CSF](https://storybook.js.org/docs/react/api/csf), [the test for `<dds-leadspace-block>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/leadspace-block/__tests__/leadspace-block.test.ts#L12-L30) is an example.

#### Waiting for template to be updated

`lit-html` renders template asynchronously, using [microtask](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model), so that rendering template can be done in batch for multiple changes in template variables. That means the change in template is not reflected to the DOM right away.

Creating a promise and waiting for it ensures that the subsequent code, e.g. assertions, run after pre-scheduled microtasks are done. We do it by:

```javascript
await Promise.resolve();
```

If multiple `lit-html` templates are in play for tests, multiple template update cycles (microtasks) may be in play. For example, rendering `<dds-carousel>` in a test template involves three update cycles, one is of test template, one is of `<dds-carousel>` that registers its `slotchange` event handler, one is of `<dds-carousel>` again the updates the template upon `slotchange` event. In such case we need to wait for microtask to be done multiple times.

#### Changing a public property

Changing a public property in test allows us to see if the template is rendered correctly and DOM is updated correctly, upon change in public property. To do that, we can simply grab the DOM node of the component and change public propery of the DOM node. An example can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L73).

#### Changing a private property

Changing a private property in test allows us to quickly set up the test environment for particular case, in an isolated manner. For example, `<dds-carousel>` has a [private property that reflect the space between cards](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/carousel.ts#L46) that is updated by `slotchange` event handler as well as by `ResizeObserver` callback. Directly updating such private property allows us to quickly [test our code to see if the component behaves correctly upon change in such private property](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L63-L65).

#### Simulating a user action

There are a couple of common ways to simulate a user action. The easiest one is using [`HTMLElement.click()` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click). Another one is creating a custom event and running [`.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent). An example of the latter can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/footer/__tests__/footer-nav-group.test.ts#L102-L103).

#### Inspecting a DOM element or a component property

We can simply grab a component DOM to see whether its property or shadow DOM content is correct. An example of the former can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L204-L206). An example of the latter can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L127-L129).

#### Seeing if a particular method has been called or a particular event has been fired

To see if a particular method has been called or a particular event has been fired, we use [spies](https://jasmine.github.io/2.0/introduction#section-Spies). An example can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/__tests__/expressive-modal.test.ts#L121-L127).

### Defining mocks

The core notion of unit tests is running tests in an isolated environment, so that minimal factors affect whether the tests pass or fail. [Mocks](https://en.wikipedia.org/wiki/Mock_object) are very useful to achieve that.

An example of setting mocks via Jasmine API can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/lightbox-media-viewer/__tests__/lightbox-media-viewer-container.test.ts#L25-L39). An example of manually setting mocks can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L35-L44).

### Restoring state

It's important for each tests to ensure the test environment is re-set back to the original state after the test runs, no matter whether the test passes or fails. Lack of such discipline often causes flaky tests.

The common way to ensure that is [`beforeAll()`](https://jasmine.github.io/api/3.5/global.html#beforeAll)/[`beforeEach()`](https://jasmine.github.io/api/3.5/global.html#beforeEach)/[`afterEach()`](https://jasmine.github.io/api/3.5/global.html#afterEach)/[`afterAll()`](https://jasmine.github.io/api/3.5/global.html#afterAll). For example, most tests [render an empty template](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L318) after test is finished. Tests using mocks (except one set by Jasmine API) must [reset them](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L324-L325) after test is finished.

We have [our own utility](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tests/utils/event-manager.ts) to clean-up event handlers after tests. With that utilitity, we can attach events by `events.on(element, eventName, eventHandler)` ([example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/__tests__/expressive-modal.test.ts#L232)) and clean them up by `events.reset()` ([example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/__tests__/expressive-modal.test.ts#L264)).

## RTL support

While [CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) will allow us to support LTR and RTL in one codebase, there are several key properties that are not yet supported by some browsers, for example, [`inset-inline-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start).

We could use `dir` attribute selector, but it causes problems with selector specifity between direction-specific CSS rulesets vs. non-direction-specific CSS rulesets.

To cope with the problem, `@carbon/ibmdotcom-web-components` generates seprate CSS for LTR and RTL with its build process.

The build process for the NPM package [generates RTL version of CSS files](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L80) [as `*.rtl.css.js`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L90), in addition to the LTR version. It also [generates RTL version of pre-built bundle](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L65-L67) [as `ibmdotcom-web-components-dotcom-shell.rtl.min.js`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L120).

The develoment environment looks at `STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_RTL` environment variable to determine the [`dir` attribute of `<html>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/.storybook/config.ts#L24-L26) as well as to [choose LTR/RTL version of CSS build](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/.storybook/webpack.config.js#L136) to use.

Both of above use [RTLCSS](https://rtlcss.com) to generate the RTL version. RTLCSS has feature of [conrtol](https://rtlcss.com/learn/usage-guide/control-directives/)/[value](https://rtlcss.com/learn/usage-guide/value-directives/) directives, that `@carbon/ibmdotcom-web-components` codebase [utilize](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/masthead/masthead.scss#L347-L356).

How to use the RTL version of CSS can be seen at [the usage documentation](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/docs/enable-rtl.md).

## Storybook CSF integration

Storybook introduced a new story format in `5.x` timeframe, called Component Story Format (CSF). It makes stories an ECMAScript import, that is great for reusing stories.

Unfortunately, knobs still require imperative API embedded in stories, which means as soon as we define knobs in stories any code calling stories depends on such knobs.

To make sure that we can reuse stories for unit tests without depending on knobs, we define knobs somewhere outside stories, which is, in story parameters (`parameters.knobs`), like [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/card/__stories__/card.stories.ts#L116-L146). Such `parameters.knobs` is evaluated in a [global story decorator](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/.storybook/decorator-knobs.ts) and put into `parameters.props`, so that stories can refer to like [this](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/card/__stories__/card.stories.ts#L26).

In this way, test can specify its own `parameters.props`, without being interfered by knobs. An example can be found [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/card/__tests__/card.test.ts#L14-L21).

## License header

We ensure that our source code has appropriate licence header, with two mechanisms:

1. The [CI task](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/package.json#L25) that [checks if all source files have license headers](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/gulp-tasks/lint.js#L25-L50).
2. The [pre-commit hook](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/.lintstagedrc#L4) that [checks if all staged source files have license headers](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/package.json#L27). If the license year is found stale in the step, we [update it](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/tasks/check-license.js#L46-L54) here.

## Focus wrapping

Components like modal and left nav requires the keyboard focus to be kept within the component while it's open. There is a [spec discussion](https://github.com/whatwg/html/issues/897) for defining stack of elements where keyboard focus is kept within, but nothing has been implemented yet.

To get a similar behavior, `<dds-expressive-modal>` defines their own "focus wrap" behavior. The code [detects if the keyboard focus gets out of `<dds-expressive-modal>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/expressive-modal.ts#L146-L155), and if it's the case, moves the focus back within `<dds-expressive-modal>`.

Making sure focus wrapping code works even if `<dds-expressive-modal>` is the last element in `<body>` requires extra mechanism, because in such case the entire viewport loses focus and thus `blur` event cannot detect the newly focused element. To make sure the focus wrapping code in such case, we use ["focus sentinel"](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps), that is [a non-visible focusable element](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/expressive-modal.ts#L306) that gets focused before the viewport loses focus.

`<dds-left-nav>` uses a [utility function](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/utilities/src/utilities/focuswrap/focuswrap.js) for that purpose, to support two regions for focus wrapping. When the focus goes out of `<dds-masthead-menu-button>`, which is the trigger button for `<dds-left-nav>`, the focus should go to `<dds-left-nav>`. When the focus goes out of `<dds-left-nav>`, the focus should go to `<dds-masthead-menu-button>`. The utility function fires [`dds-request-focus-wrap` custom event](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/utilities/src/utilities/focuswrap/focuswrap.js#L23) in such condition, and `<dds-left-nav>` [handles `dds-request-focus-wrap` event](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/masthead/left-nav.ts#L61-L93) to decide whether `<dds-masthead-menu-button>` or `<dds-left-nav>` should get focus.
