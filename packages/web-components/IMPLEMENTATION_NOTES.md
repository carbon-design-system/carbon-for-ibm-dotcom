# `@carbon/ibmdotcom-web-components`

The `@carbon/ibmdotcom-web-components` package consists of components based on
[Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom)
and
[Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements)
specs that are under the
[Web Components](https://developers.google.com/web/fundamentals/web-components)
umbrella.

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
- [Video player](#video-player)
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

| State                                         | Description                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI components                                 | Components that define the user interface. Most components are in this category.                                                                                                                                                                            |
| Composite components                          | Components that render UI components from object structures via property. An example is `<dds-masthead-composite>` that renders top/left navs from the `navLinks` property as an object. Components in this category should have `<*-composite>` tag names. |
| [Container components](#container-components) | Inheritances of composite components that connects to `@carbon/ibmdotcom-service`.                                                                                                                                                                          |

## Carbon core library

Some UI components in the above categories extend the
[web components](https://github.com/carbon-design-system/carbon-web-components)
versions of the Carbon core library. Here are some examples:

| Component                                                                                                                                                                               | Extends from                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [`<dds-card>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/src/components/card/card.ts)                                             | [`<bx-link>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/link/link.ts)                 |
| [`<dds-link-with-icon>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/src/components/link-with-icon/link-with-icon.ts)               | [`<bx-link>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/link/link.ts)                 |
| [`<dds-top-nav>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/src/components/masthead/top-nav.ts)                                   | [`<bx-header-nav>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/ui-shell/header-nav.ts) |
| [`<dds-left-nav>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/src/components/masthead/left-nav.ts)                                 | [`<bx-side-nav>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/ui-shell/side-nav.ts)     |
| [`<dds-language-selector-desktop>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/src/components/footer/language-selector-desktop.ts) | [`<bx-combo-box>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/combo-box/combo-box.ts)  |
| [`<dds-language-selector-mobile>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/src/components/footer/language-selector-mobile.ts)   | [`<bx-select>`](https://github.com/carbon-design-system/carbon-web-components/blob/master/src/components/select/select.ts)           |

## Component CSS

### Usage of Sass

Most components use the following to define CSS:

```typescript
import styles from './some-component.scss';

@customElement('dds-some-component')
class DDSSomeComponent extends LitElement {
  ...

  static styles = styles;
}
```

There are several things going on behind the scenes:

- In Storybook environments, in addition to
  `sass-loader`/`postcss-loader`/`style-loader` chains, we use a
  [custom WebPack loader](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/tools/css-result-loader.js)
  that generates `lit-html`'s
  [CSS tagged template](https://lit-element.polymer-project.org/guide/styles#add-styles)
  from the generated CSS.
- For production builds, we generate a
  [`.css.js`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/gulp-tasks/build.js#L79-L88)
  file that exports `lit-html`'s
  [CSS tagged template](https://lit-element.polymer-project.org/guide/styles#add-styles)
  with the CSS compiled from the Sass code. The
  [`import` path](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/tools/babel-plugin-resource-js-paths.js#L24-L26)
  is changed to reference this file.

The above custom toolchain allows us to use Sass for our components, as well as
to put Sass/CSS code in a separate location from the component code.

### Styles in Shadow DOM

One of the greatest features of web components is that CSS is isolated thanks
the shadow DOM. Component CSS doesn't affect application CSS, or vice versa.
This allows users to gradually migrate from `v18` design assets to Carbon for
IBM.com design assets, for example.

In some cases, style isolation within components can present challenges in
implementing component styles. One of the biggest challenges is a component that
requires different styles when placed in another component's child.

Style defined in the shadow DOM can define the style of the direct child with
[`::slotted()` pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted),
but
[cannot define the style of the descendants](https://github.com/WICG/webcomponents/issues/745).

There are several approaches depending on what best suits the use case:

1. Create an inherited class with different styles applied (e.g.
   [`<dds-callout-quote>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/callout-quote/callout-quote.ts)
   that extends `<dds-quote>`).
2. Use CSS custom properties as they are inherited to descendant DOM elements.
   An example is
   [`<dds-link-list>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/components/link-list/link-list.scss#L34).
   However, it may not be a good idea to use this approach if there are many
   custom properties.

## Rendering target

Most components render their contents in the shadow DOM. However, there are some
exceptions.

### Composite components

[Composite components](#categories-of-components) render their primary content
to the light DOM because the content is a sub-component of the composite
component.

There are two choices when rendering the primary content to the light DOM:

- Return `this` (instead of `this.shadowRoot`) in
  [`createRenderRoot()`](https://lit-element.polymer-project.org/guide/templates#renderroot).
  Here is an
  [example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-composite.ts#L381-L384).
- Use
  [`HybridRenderMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/hybrid-render.ts)
  and render the primary content with `renderLightDOM()` instead of `render()`.
  This is useful if a composite component wants to define styles in the host
  element, e.g. to
  [avoid creating a box of the host element](https://www.w3.org/TR/css-display-3/#valdef-display-contents).
  Here is an
  [example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L114-L126).

### Components rendering modal

Since the modal component contains its own overlay (half-transparent gray
defined as `$overlay-01`), rendering it in the shadow DOM or as a child element
would cause the overlay to be rendered within the component, when instead it
should cover the entire viewport.

The `@carbon/ibmdotcom-web-components` package has
[`ModalRenderMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/modal-render.ts)
to solve this problem. Components that extend `ModalRenderMixin` can use the
`renderModal()` method instead of `render()` to render the modal content under
`<body>`.
[Here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/image-with-caption/image-with-caption.ts#L139-L155)
is an example.

## CTA components

There are some common behaviors in CTA components that are implemented by
[`CTAMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts):

- [Setting different icons](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts#L90-L93)
  for different CTA types.
- [Changing the `target`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts#L123-L132)
  attribute of `<a>` for `external` CTA types.
- [Use a hash link](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/cta.ts#L113-L122)
  for `video` CTA types.

### Video CTA

The `video` CTA type requires more features, implemented by
[`VideoCTAMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.0/packages/web-components/src/component-mixins/cta/video.ts).
With the exception of `<dds-feature-cta-footer>`, every CTA component supports
the `video` CTA type (as of `v1.15.0`) and thus extend `VideoCTAMixin`.
`VideoCTAMixin` implements the following:

- Send an event (`dds-cta-run-action`) when user clicks on CTA.
- Send an event (`dds-cta-request-video-data`) when the CTA type is `video` and
  video info (caption, duration and thumbmail) hasn't been loaded yet.

Those events are handled by
[`<dds-video-cta-container>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-container.ts):

| Event                        | `<dds-video-cta-container>` logic                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dds-cta-run-action`         | Launches the lightbox, by setting the [`_activeVideoId`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L102) private property and using it to trigger [opening the modal](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L157). `_activeVideoId` should be cleared when the lightbox is closed.                                                                                                                                                |
| `dds-cta-request-video-data` | Loads the [video info](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L84) via [Redux store](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/videoPlayerAPI.ts#L63-L84), and updates `event.target` with the [loaded video info](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/video-cta-composite.ts#L87-L88). `event.target` should be a CTA component as CTA component is the one firing the event. |

Only one instance of `<dds-video-cta-container>` is needed in an application as
long as it contains all CTA components, as can be seen
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/cta/__stories__/cta.stories.ts#L176-L182).
This separation between `<dds-*-cta>` and `<dds-video-cta-container>` keeps
`<dds-*-cta>` lightweight and simple.

- Send an event (`dds-cta-request-video-data`) when a user clicks on the CTA so
  that the lightbox video player can launch the lightbox.
- Returns the video caption, duration, and thumbnail.

## Video player

The video player has two states,
[thumbnail mode](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/defs.ts#L17)
and
[video (playing) mode](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/defs.ts#L22).
When a user clicks on a video thumbmail, the
[`dds-video-player-content-state-changed`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player.ts#L42-L51)
event is fired, allowing `<dds-video-player-composite>` to
[embed the video](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L80-L86).

Embedding the video involves:

1. [Creating](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-container.ts#L157-L159)
   the DOM element of the video.
2. [Inserting](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-container.ts#L160-L164)
   the DOM element to the correct location. `<dds-video-player-composite>`
   specifies the location for the DOM element of the video via the
   [`selectorVideoPlayer`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L182-L184)
   static property. This can be overridden by using
   [`<dds-lightbox-video-player-composite>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/lightbox-media-viewer/lightbox-video-player-composite.ts#L119-L121).
3. [Calling](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-container.ts#L165)
   the video player API from `@carbon/ibmdotcom-services`.

The video player allows embedded videos to be reused, i.e. for re-opening the
lightbox. Rather than destroying the embedded video, the video is
[stopped](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L59)
and
[hidden](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.16.0/packages/web-components/src/components/video-player/video-player-composite.ts#L62).

## React integration

While frameworks such as Angular and Vue require limited to no changes in the
application when using web components, React has some issues. React heavily
relies on its knowledge with regard to how intrinsic HTML elements work.

For example, `<dds-foo custom-boolean={true}>` renders as
`<dds-foo custom-boolean="true">`. This differs from `<button disabled={true}>`,
which renders as `<button disabled>` (empty string in `disabled` attribute
value).

Another example is `<dds-foo onFoo={handleFoo}>` which doesn't attach an event
handler, whereas `<div onClick={handleClick}>` does.

### React wrapper generator

The Web Components community has made the React core team aware of above
[issue](https://github.com/facebook/react/issues/11347), and created a
[proposal](https://github.com/reactjs/rfcs/pull/15) to address it.

The `carbon-web-components` library implements a variant of the proposal, called
[`createReactCustomElementType()`](https://github.com/carbon-design-system/carbon-web-components/blob/v1.11.0/src/globals/wrappers/createReactCustomElementType.ts).
This example creates a React component, `BXDropdown`, from the `<bx-dropdown>`
custom element:

```javascript
import createCustomElementType, {
  booleanSerializer,
} from 'carbon-web-components/es/globals/wrappers/createCustomElementType.js';

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

We call React components created by `createCustomElementType()` _React
wrappers_. React wrappers provide the following enhancement over using
`<bx-dropdown>` directly in JSX:

- `<BXDropdown disabled={true}>` renders to `<bx-dropdown disabled>` and
  `<BXDropdown disabled={false}>` removes the `disabled` attribute from
  `<bx-dropdown>`.
- `<BXDropdown helperText="The helper text">` renders to
  `<bx-dropdown helper-text="The helper text">`.
- `<BXDropdown onBeforeSelect={handleBeforeSelect}>` attaches the
  `bx-dropdown-beingselected` event to `<bx-dropdown>`.

### Build procedure to generate React wrapper

The `carbon-web-components` and `@carbon/ibmdotcom-web-components` packages have
a build procedure to generate the React wrapper using
`createReactCustomElementType`. It uses a
[Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/tools/babel-plugin-create-react-custom-element-type.js)
that transforms the original custom element type code to a corresponding React
wrapper, by looking at `lit-element`'s `@property` decorator and `eventXXX`
static properties in the custom element class. The build procedure can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L159-L170).

Another
[Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/tools/babel-plugin-create-react-custom-element-type-def.js)
transforms the original custom element type code to a corresponding TypeScript
definition of the React wrapper example above, leveraging the same `@property`
and `eventXXX` in the custom element class. The build procedure can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L385-L397).

#### Limited components to generate React wrapper

As of `v1.15.0`, we decided to generate React wrappers only for components
without a pure React counterpart, for example `<dds-carousel>` and
`<dds-leaving-ibm-modal>`.

These components should have a `/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */`
annotation at the default export. The annotation is read by a
[Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/tools/babel-plugin-scan-create-react-custom-element-type-candidates.js)
so the build procedure can
[harvest](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L126-L148)
the list of files to generate React wrappers.

### Non-React APIs for React integration

Here are some more types of non-React APIs that an application can use with
React integration code:

- Constant/enum definitions, e.g. `PICTOGRAM_PLACEMENT` for `<dds-card>`
- `mapStateToProps()`/`mapDispatchToProps()` for Redux integration

Because of the non-React nature, this implementation is identical to the
original web components code, while also making it available to React users.
Therefore, we create modules in the `es/components-react` directory that proxies
to one in `es/components`, like so:

```javascript
export * from '../../components/card/defs.js';
```

The build procedure can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0-rc.1/packages/web-components/gulp-tasks/build.js#L257-L282).

### React SSR integration

For `12.16.3` or higher versions of Node, the React wrappers can be rendered
server-side.

Running our component code in Node causes JavaScript errors because:

- The Web Components spec is based on HTMLElement, a browser spec.
- `lit-html` and `lit-element` ships only their ESM code.

To avoid these errors, we leverage a
[conditional mapping](https://github.com/jkrems/proposal-pkg-exports#2-conditional-mapping)
feature that was introduced in Node `12.16.3` that allows the following entry in
`package.json`:

```json
"exports": {
  "./es/components-react/": {
    "node": "./lib/components-react-node/",
    "default": "./es/components-react/"
  }
}
```

This changes the behavior of `import` and `require()`:

| `import` or `require()`                                                     | File loaded in browser                      | File loaded in Node                               |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| `@carbon/ibmdotcom-web-components/es/components-react/masthead/masthead.js` | `/es/components-react/masthead/masthead.js` | `/lib/components-react-node/masthead/masthead.js` |

Browser and Node files also have the following differences, preventing Javscript
errors in the Node version when running ESM or browser-specific code:

| Item                                       | Browser version | Node version |
| ------------------------------------------ | --------------- | ------------ |
| Module format                              | ESM             | CommonJS     |
| Loads Web Components implementation module | Yes             | No           |
| Loads `lit-html` and `lit-element`         | Yes             | No           |

### Composite/container components for React

React wrappers for composite components render web components of leaf
components, as opposed to the web components version of the composite component.
Doing so ensures React SSR works for REST API calls, reducing network
round-trips that is the key benefit of React SSR. For example,
[`<dds-leaving-ibm-modal>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components-react/leaving-ibm/leaving-ibm-composite.tsx).

React wrappers for container components use the official Redux integration
library, `react-redux`. Doing so allows applications to be scoped, leveraging
React's [context feature](https://reactjs.org/docs/context.html). For example,
[`<dds-leaving-ibm-modal>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components-react/leaving-ibm/leaving-ibm-container.ts).

## Container components

Container components are inheritances of composite components that connect to
`@carbon/ibmdotcom-service`. Connecting to `@carbon/ibmdotcom-service` is done
via a
[`Redux store`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/v1.13.0/packages/services-store).
Connecting to `@carbon/ibmdotcom-services-store` is done with
[`ConnectMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/connect.ts)
that has a similar feature set to [`react-redux`](https://react-redux.js.org).

> 💡 `import`s of `@carbon/ibmdotcom-services-store` are slightly different from
> other NPM packages. See [vendor directory](#vendor-directory) section for more
> details.

Similar to `react-redux`, `ConnectMixin` uses two callbacks:

| Callback                                                                                                              | Description                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`mapStateToProps()`](https://react-redux.js.org/api/connect#mapstatetoprops-state-ownprops--object)                  | Defines how React state maps to the properties in container components. Updates in those properties will cause re-rendering container component. ([Example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/footer/footer-container.ts#L89-L106)) |
| [`mapDispatchToProps()`](https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object) | Creates Redux action dispatchers from action creators, and maps them to properties in container components. ([Example](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/footer/footer-container.ts#L108-L126))                                     |

And container components are created by `ConnectMixin`:

```typescript
@customElement(`${ddsPrefix}-footer-container`)
class DDSFooterContainer extends ConnectMixin(
  store,
  mapStateToProps,
  mapDispatchToProps
)(DDSFooterComposite) {}
```

As seen in the example above, one notable difference of `ConnectMixin` from
`react-redux` is that the created class (container component) is tied to `store`
at the time of creating the class, whereas `react-redux` lets the application
specify what `store` to use via
[`<Provider>`](https://react-redux.js.org/api/provider). This is because
`<Provider>` relies on [React context](https://reactjs.org/docs/context.html), a
React-specific paradigm.

### Triggering action dispatcher

Many container components in `@carbon/ibmdotcom-web-components` load data from
`@carbon/ibmdotcom-services` at the time of creation. `lit-element`'s
[`firstUpdated()`](https://lit-element.polymer-project.org/guide/lifecycle#firstupdated)
lifecycle method is used for this purpose:

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

`_setLanguage()`, `_loadLangDisplay()` and `_loadTranslation()` are Redux action
dispatchers defined at
[`mapDispatchToProps()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/footer/footer-container.ts#L108-L126),
which map to
[`setLanguage()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/localeAPI.ts#L38-L47),
[`loadLangDisplay()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/localeAPI.ts#L166-L194),
and
[`loadTranslation()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/translateAPI.ts#L64-L92)
Redux actions, respectively.

`setLanguage()` sets the current language to use as the display language and the
translation data. `loadLangDisplay()` loads the display language.
`loadTranslation()` loads the translation data.

See the [implementation notes](../services-store/IMPLEMENTATION_NOTES.md) for
more details on what happens behind the scenes of the Redux store.

## Masthead search

The search box feature in masthead consists of two things:

| Component                                                                                                                                                                                    | Description                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`<dds-masthead-search>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search.ts)                     | The search box UI.                               |
| [`<dds-masthead-search-container>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-container.ts) | The component to load and render search results. |

`<dds-masthead-search>` triggers the `dds-masthead-search-input` event when
users type in the input field. `<dds-masthead-search-composite>`, the underlying
component behind `<dds-masthead-search-container>`,
[runs](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L43-L46)
the
[`loadSearchResults()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/services-store/src/actions/searchAPI.ts#L93-L120)
Redux action during the
[`dds-masthead-search-input`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L139)
event.

`<dds-masthead-search-composite>` uses
[`ThrottledInputMixin`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/globals/mixins/throttled-input.ts)
to throttle the `dds-masthead-search-input` event. `ThrottledInputMixin` calls
`_handleThrottledInput()` as the `eventInput` static method is fired.

`<dds-masthead-search-container>`
[intersects the search query](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-container.ts#L64-L70)
with the table of loaded search results and sets the
[`currentSearchResults`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-container.ts#L72)
property, which is rendered as
[`<dds-masthead-search-item>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.13.0/packages/web-components/src/components/masthead/masthead-search-composite.ts#L118-L123).

## TypeScript type definition

All TypeScript code in our source code is transpiled to pure JavaScript by a
[Babel plugin](https://www.npmjs.com/package/@babel/plugin-transform-typescript).
Applications can still refer to our TypeScript types, via `.d.ts` files.

The `.d.ts` files are generated by standard TypeScript toolchains, via
[`gulp-typescript`](https://www.npmjs.com/package/gulp-typescript). The build
procedure can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L474-L490).

> 💡 The `.d.ts`f iles for React wrappers are generated by our
> [custom Babel plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/babel-plugin-create-react-custom-element-type-def.js).
> An example `.d.ts` file can be found
> [here](https://unpkg.com/@carbon/ibmdotcom-web-components@1.0.0/es/components-react/card/card.d.ts).
> The build procedure can be found
> [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L388-L397).

## Vendor directory

The `@carbon/ibmdotcom-services-store` package is a private package that is not
published to NPM. Adding it to `package.json` will break application because it
won't be found.

To solve this problem, the
[build process](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/vendor.js)
of `@carbon/ibmdotcom-web-components` copies build artifacts of
`@carbon/ibmdotcom-services-store` to
`packages/web-components/src/internal/vendor/@carbon/ibmdotcom-services-store`
as well as to
`packages/web-components/es/internal/vendor/@carbon/ibmdotcom-services-store`.
The former is used for our development, while the latter is for the application,
being part of the
[`@carbon/ibmdotcom-web-components` package](https://unpkg.com/browse/@carbon/ibmdotcom-web-components@1.0.0/es/internal/vendor/@carbon/ibmdotcom-services-store/).

The `import`s of `@carbon/ibmdotcom-services-store` in
`@carbon/ibmdotcom-web-components` refer to those copies, rather than the
`@carbon/ibmdotcom-services-store` package:

```javascript
import {
  loadLanguage,
  setLanguage,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
```

## Rollup bundle for Dotcom shell

For quick setup of a project using minimum feature sets (Dotcom Shell) of
`@carbon/ibmdotcom-web-components`, a
[Rollup bundle](https://unpkg.com/browse/@carbon/ibmdotcom-web-components@1.0.0/dist/ibmdotcom-web-components-dotcom-shell.min.js)
is provided.

The bundle builds the
[entry point](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/globals/ibmdotcom-web-components-dotcom-shell.ts).
Whenever new components are added to the `Dotcom shell`, the entry point file
must be updated.

### Sass optimization

The
[Rollup config](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L80-L89)
replaces `.css.js` files with a `.scss` entry point
[file](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/globals/scss/ibmdotcom-web-components-dotcom-shell.scss),
so that CSS included in multiple `.css.js` files (e.g. Carbon reset styles) are
not duplicated in the Rollup bundle.

### HTML optimization

The Rollup bundle
[minifies](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L116-L131)
HTML content in `lit-html` templates to reduce file size.

### Custom element definition for `carbon-web-components`

The Rollup bundle
[does _not_ define custom elements](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L135-L140)
from `carbon-web-components`, as the bundle is not meant for the
`carbon-web-components`.

### Building icons

There are some icons from `@carbon/ibmdotcom-styles` included in the Rollup
bundle. We use a
[Rollup plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/rollup-plugin-ibmdotcom-icon.js)
that converts those icons to `lit-html` versions.

### Building styles

To build `.scss` files into the Rollup bundle, we use a
[plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/rollup-plugin-lit-scss.js)
to build the Sass and convert it to a `lit-html` template.

### License header

Given the Rollup bundle includes third-party dependencies, we use a
[Rollup plugin](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/rollup-plugin-license.js)
to aggregate the license headers of those third-party dependencies and to place
it at the top, along with our own license header.

## Unit tests

Unit tests for `@carbon/ibmdotcom-web-components` utilize
[Karma](http://karma-runner.github.io/latest/index.html), so that we can inspect
the DOM to debug unit tests. `@carbon/ibmdotcom-web-components` utilizes
[Jasmine](https://jasmine.github.io) for test definition and assertion, with a
custom matcher for
[snapshots](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tests/utils/snapshot.js).

Please refer to our developer
[documentation](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/docs/contributing-to-web-components.md#unit-test-coverage)
to see how to run the tests.

### Test setup

The Karma configuration can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tests/karma.conf.js).

`@carbon/ibmdotcom-web-components` uses
[`karma-webpack`](https://www.npmjs.com/package/karma-webpack) to resolve
ECMAScript modules in tests, as well as
[`karma-snapshot`](https://www.npmjs.com/package/karma-snapshot) to save and
load the snapshots.

### Writing tests

Most unit tests consist of the following parts:

1. Render a template
1. Wait for the template to be rendered
1. Do either of (optional):

   1. Change a public property or a private property
   1. Simulate a user action

1. Wait for the template to be updated from above changes (optional)
1. Do one of the following to see if steps above yield the desired result:

   1. Inspect the DOM content
   2. Inspect a component property
   3. See if a particular method has been called or a particular event has been
      fired

#### Rendering a template

We use [`lit-html`](https://lit-html.polymer-project.org), the underlying
template library of `lit-element`. In some cases, we reuse templates from
[Storybook CSF](https://storybook.js.org/docs/react/api/csf), The test for
[`<dds-leadspace-block>`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/leadspace-block/__tests__/leadspace-block.test.ts#L12-L30)
is an example.

#### Waiting for a template to be updated

`lit-html` renders templates asynchronously, using
[microtask](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model).
This allows batch rendering templates for multiple changes in template
variables. This also means that changes to the template are not reflected to the
DOM right away.

Waiting for promises to resolve ensures that the subsequent code, i.e.
assertions, run after pre-scheduled microtasks are done:

```javascript
await Promise.resolve();
```

If multiple `lit-html` templates are being tested, multiple template update
cycles (microtasks) may be in play. For example, rendering `<dds-carousel>` in a
test template involves three update cycles. One for test template, another for
`<dds-carousel>` that registers its `slotchange` event handler, and lastly
`<dds-carousel>`,which again updates the template upon the `slotchange` event.
In such cases we need to wait for microtasks to be done multiple times.

#### Changing a public property

Changing a public property in a test allows us to see if the template is
rendered correctly and the DOM is updated correctly. To do this, we can simply
target the DOM node of the component and change its public propery. An example
can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L73).

#### Changing a private property

Changing a private property in a test allows us to quickly set up the test
environment for a particular case in an isolated manner. For example,
`<dds-carousel>` has a
[private property](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/carousel.ts#L46)
that reflects the space between cards. This property is updated by the
`slotchange` event handler as well as by a `ResizeObserver` callback. Directly
updating these private properties allows us to quickly
[test](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L63-L65)
our code to see if the component behaves correctly.

#### Simulating a user action

There are several common ways to simulate a user action. The easiest is using
[`HTMLElement.click()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).
Another is creating a custom event and running
[`.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent).
An example of the latter can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/footer/__tests__/footer-nav-group.test.ts#L102-L103).

#### Inspecting a DOM element or a component property

We can simply target a component DOM to see whether its property or shadow DOM
content is correct. An example of the former can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L204-L206),
and an example of the latter can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L127-L129).

#### Seeing if a particular method has been called or a particular event has been fired

To see if a particular method has been called or a particular event has been
fired, we use [spies](https://jasmine.github.io/2.0/introduction#section-Spies).
An example can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/__tests__/expressive-modal.test.ts#L121-L127).

### Defining mocks

The core notion of unit tests is running tests in an isolated environment, so
that minimal factors affect whether the tests pass or fail.
[Mocks](https://en.wikipedia.org/wiki/Mock_object) are very useful for this
purpose.

An example of setting mocks via the Jasmine API can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/lightbox-media-viewer/__tests__/lightbox-media-viewer-container.test.ts#L25-L39).
An example of manually setting mocks can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L35-L44).

### Restoring state

It's important that the test resets the test environment to its original state
after running, no matter whether the test passes or fails. Failing to do this
often leads to flaky test results.

A common way to do this is
[`beforeAll()`](https://jasmine.github.io/api/3.5/global.html#beforeAll)/[`beforeEach()`](https://jasmine.github.io/api/3.5/global.html#beforeEach)/[`afterEach()`](https://jasmine.github.io/api/3.5/global.html#afterEach)/[`afterAll()`](https://jasmine.github.io/api/3.5/global.html#afterAll).
For example, most tests
[render an empty template](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L318)
after test is finished. Tests using mocks (except one set by Jasmine API) must
[reset them](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/carousel/__tests__/carousel.test.ts#L324-L325)
after test is finished.

We have our own
[utility](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tests/utils/event-manager.ts)
to clean up event handlers after tests. This way, we can attach events with
([`events.on(element, eventName, eventHandler)`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/__tests__/expressive-modal.test.ts#L232))
and clean them up with
([`events.reset()`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/__tests__/expressive-modal.test.ts#L264)).

## RTL support

While CSS
[logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
allow us to support LTR and RTL in one codebase, there are several key
properties that are not yet supported by some browsers, for example
[`inset-inline-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start).

We could use the `dir` attribute selector, but it causes problems with selector
specificity between direction-specific CSS rulesets vs. non-direction-specific
CSS rulesets.

To deal with this problem, `@carbon/ibmdotcom-web-components` generates seprate
CSS for LTR and RTL in its build process.

The build process for the NPM package generates an
[RTL version](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L80)
of CSS files as
[`*.rtl.css.js`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L90),
in addition to the LTR version. It also generates RTL version of
[pre-built bundle](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/tools/get-rollup-config.js#L65-L67)
as
[`ibmdotcom-web-components-dotcom-shell.rtl.min.js`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/gulp-tasks/build.js#L120).

The development environment looks at the `STORYBOOK_USE_RTL` environment
variable to determine the
[`dir`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/.storybook/config.ts#L24-L26)
attribute of `<html>`, while also choosing either the LTR or RTL version of the
[CSS build](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/.storybook/webpack.config.js#L136)
to use.

Both of the above use [RTLCSS](https://rtlcss.com) to generate the RTL version.
RTLCSS has [control](https://rtlcss.com/learn/usage-guide/control-directives/)
and [value](https://rtlcss.com/learn/usage-guide/value-directives/) directives
that `@carbon/ibmdotcom-web-components`
[utilizes](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/masthead/masthead.scss#L347-L356).

See the usage
[documentation](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/docs/enable-rtl.md)
for more information about the RTL version of the CSS.

## Storybook CSF integration

Storybook introduced a new story format in version `5`, called Component Story
Format (CSF). It makes stories an ECMAScript import, which is great for reusing
stories.

Unfortunately, knobs still require imperative API embedded in stories, which
mean as soon as we define knobs in stories any code calling stories depend on
such knobs.

To make sure that we can reuse stories for unit tests without depending on
knobs, we define knobs outside stories in story
[parameters](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/card/__stories__/card.stories.ts#L116-L146).
These knobs are evaluated in a global story
[decorator](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/.storybook/decorator-knobs.ts)
and put into `parameters.props`, so that stories can refer to like
[this](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/card/__stories__/card.stories.ts#L26).

In this way, a test can specify its own `parameters.props` without interference
from knobs. An example can be found
[here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/card/__tests__/card.test.ts#L14-L21).

## License header

We ensure that our source code has the appropriate licence header, with two
mechanisms:

1. The CI
   [task](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/package.json#L25)
   that
   [checks](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/gulp-tasks/lint.js#L25-L50)
   if all source files have license headers.
2. The
   [pre-commit hook](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/.lintstagedrc#L4)
   that
   [checks](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/package.json#L27)
   if all staged source files have license headers. If the license year is
   incorrect, we update it
   [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/tasks/check-license.js#L46-L54).

## Focus wrapping

Components like `modal` and `left-nav` require the keyboard focus to be kept
within the component while it's open. There is a spec
[discussion](https://github.com/whatwg/html/issues/897) for defining stack of
elements where keyboard focus is kept within, but nothing has been implemented
yet.

To achieve a similar behavior, `<dds-expressive-modal>` defines its own "focus
wrap" behavior. The code
[detects](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/expressive-modal.ts#L146-L155)
if the keyboard focus leaves `<dds-expressive-modal>`, and returns focus within
the component if so.

Making sure focus wrapping works even when `<dds-expressive-modal>` is the last
element in `<body>` requires extra mechanism. In such cases the entire viewport
loses focus and the `blur` event cannot detect the newly focused element. To
prevent this, we use
["focus sentinel"](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps),
that is a non-visible, focusable
[element](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/expressive-modal/expressive-modal.ts#L306)
that gets focused before the viewport loses focus.

`<dds-left-nav>` uses a
[utility function](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/utilities/src/utilities/focuswrap/focuswrap.js)
for the same purpose, which supports two regions for focus wrapping. When the
focus leaves `<dds-masthead-menu-button>` (the trigger button for
`<dds-left-nav>`), focus should return to `<dds-left-nav>`. When the focus
leaves `<dds-left-nav>`, focus should then go to `<dds-masthead-menu-button>`.
The utility function fires
[`dds-request-focus-wrap`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/utilities/src/utilities/focuswrap/focuswrap.js#L23)
in such conditions, and `<dds-left-nav>` handles the [`dds-request-focus-wrap`]
event(https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/masthead/left-nav.ts#L61-L93)
to decide whether `<dds-masthead-menu-button>` or `<dds-left-nav>` should get
focus.
