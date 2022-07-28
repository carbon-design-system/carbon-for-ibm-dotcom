# Coding conventions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Linters/formatters](#lintersformatters)
- [TSDoc comments](#tsdoc-comments)
- [No kitchen-sink "base" class and using mix-in](#no-kitchen-sink-base-class-and-using-mix-in)
- [Minimize dependencies](#minimize-dependencies)
- [Lifecycle management](#lifecycle-management)
  - [Raw API from `carbon-components` for lifecycle management](#raw-api-from-carbon-components-for-lifecycle-management)
- [Component styles for different component states/variants](#component-styles-for-different-component-statesvariants)
- [Enum component attributes/properties](#enum-component-attributesproperties)
- [Customizing components](#customizing-components)
  - [Defining (default) component options](#defining-default-component-options)
  - [Component variants with different options](#component-variants-with-different-options)
    - [Areas to make them configurable as component options](#areas-to-make-them-configurable-as-component-options)
    - [Areas where component optinos are _not_ applied](#areas-where-component-optinos-are-_not_-applied)
  - [Creating inherited components](#creating-inherited-components)
- [Polymorphism with static properties](#polymorphism-with-static-properties)
- [Encapsulation](#encapsulation)
  - [Strive to avoid accessing shadow DOM nodes of other components](#strive-to-avoid-accessing-shadow-dom-nodes-of-other-components)
  - [Custom events](#custom-events)
  - [Data flow (Summary)](#data-flow-summary)
- [Globalization](#globalization)
  - [Translation](#translation)
  - [Collation](#collation)
- [Null checks](#null-checks)
- [Updating view upon change in `private`/`protected` properties](#updating-view-upon-change-in-privateprotected-properties)
- [Avoiding global `document`/`window` reference](#avoiding-global-documentwindow-reference)
- [Custom element registration](#custom-element-registration)
- [Custom element itself as an eleement](#custom-element-itself-as-an-eleement)
- [Propagating misc attributes from shadow host to an element in shadow DOM](#propagating-misc-attributes-from-shadow-host-to-an-element-in-shadow-dom)
- [Private properties](#private-properties)
- [Preferring class inheritance pattern over React composition pattern](#preferring-class-inheritance-pattern-over-react-composition-pattern)
- [Limiting components that works with complex data](#limiting-components-that-works-with-complex-data)
- [Optimizing layout query](#optimizing-layout-query)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linters/formatters

`@carbon/ibmdotcom-web-components` uses ESLint with `typescript-eslint` for linting, and Prettier for code formatting.
Most of ESLint configurations are same as [ones in `carbon-components`](https://www.npmjs.com/package/eslint-config-carbon-base).

## TSDoc comments

In addition to using TypeScript, we try to leverage editors' code assistance feature as much as possible.

For that purpose, we add TSDoc comments to the following:

- All classes (With their custom events (`@fires`), Shadow DOM slots (`@slot`) and Shadow DOM parts (`@csspart`))
- All properties/methods (including private properties), only exception here is one being overriden
- All type definitions (e.g. `interface`, `enum`)

For `@fires`, `@slot` and `@csspart`, refer to: https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc

## No kitchen-sink "base" class and using mix-in

We strive to avoid kitchen-sink "base" class, for the sake of maintenability and avoiding code bloat.
Toward that goal, we use mix-in classes. Instead of manipulating prototype, we simply use ECMAScript class feature ([Subclass Factory Pattern](https://github.com/justinfagnani/proposal-mixins#subclass-factory-pattern)), which is, something like:

```typescript
const Mixin = <T extends Constructor<SomeClass>>(Base: T) => class extends Base {
  ...

  someProperty = someValue;
  someMethod() { ... }

  ...
};
```

## Minimize dependencies

To keep things lightweight and perform well, this codebase avoids dependencies among components, especially depenendency to heavy components.
For example, `<CTA>` in `@carbon/ibmdotcom-react` is heavy, and thus components doesn't make dependencies to components like `<CTA>`. We try to use leaf components behind `<CTA>` instead as the dependency.

## Lifecycle management

To avoid memory leaks and zombie event listeners, we ensure the event listeners on custom elements themselves (hosts) and ones on `document`, etc. are released when they get out of render tree.

For that purpose, similar to `carbon-web-components`, `@carbon/ibmdotcom-web-components` uses `@HostListener(type, options)` decorator. `@HostListener(type, options)` decorator works with a custom element class inheriting `HostListenerMixin()` and attaches an event listener using the target method as the listener.

Here's an example seen in `<bx-modal>` code:

```typescript
...
import HostListener from 'carbon-web-components/es/globals/decorators/HostListener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/HostListener.js';
...

@customElement(`${prefix}-modal` as any)
class BXModal extends HostListenerMixin(LitElement) {
  ...

  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    ...
  };

  ...
}
```

> 💡 `@HostListener()` supports syntaxes like below to use alternate event target:
>
> | `@HostListener()` syntax            | Target element                                                                                   |
> | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
> | `@HostListener('document:click')`   | The `document` that owns the host element                                                        |
> | `@HostListener('window:click')`     | The `window` that owns the host element                                                          |
> | `@HostListener('parentRoot:click')` | The shadow root of the host element if it's in a shadow DOM. Otherwise, same as `document:click` |
> | `@HostListener('shadowRoot:click')` | The shadow root attached to the host element                                                     |

### Raw API from `carbon-components` for lifecycle management

Sometimes we want to attach an event listener on a target that is not supported by `@HostListener()`. In such case, we can use [`on()` API from `carbon-components`](https://github.com/carbon-design-system/carbon/blob/v10.17.0/packages/components/src/globals/js/misc/on.js), like:

```typescript
import on from 'carbon-components/es/globals/js/misc/on.js';
import Handle from '../../globals/internal/handle';

...

@customElement(`${ddsPrefix}-some-component`)
class SomeComponent extends LitElement {
  ...

  private _hChangeMediaQuery: Handle | null = null;

  ...

  private _handleChangeMediaQuery(event: MediaQueryListEvent) {
    // Do something upon a change in match of media query
  }

  ...


  connectedCallback() {
    super.connectedCallback();
    const { mediaStickExpanded } = this.constructor as typeof DDSFooterNavGroup;
    // `.matchMedia()` returns an event target
    const mediaQueryList = this.ownerDocument!.defaultView!.matchMedia(mediaStickExpanded);
    this._hChangeMediaQuery = on(mediaQueryList, 'change', this._handleChangeMediaQuery);
  }

  disconnectedCallback() {
    if (this._hChangeMediaQuery) {
      // `.release()` here detaches the event listener,
      // in a way where you don't have to keep around the reference to the event listener function
      this._hChangeMediaQuery = this._hChangeMediaQuery.release();
    }
  }

  ...

  static get mediaStickExpanded() {
    return '(min-width: 42rem)';
  }

  ...
}
```

## Component styles for different component states/variants

Carbon core CSS uses BEM modifier like `bx--btn--danger` to style different states/variants of a component.

OTOH, similar to `carbonm-custom-elements`, `@carbon/ibmdotcom-web-components` uses attributes to represent different states/variants (e.g. `<bx-btn type="danger">`), in a similar manner as how attributes influence states/variants of native elements (e.g. `<input type="hidden">`).

If such states/variants should affect the style of custom element (shadow host), we define attribute styles from the following reasons:

- Taking a cue from native elements with user agent shadow DOM (e.g. UA stylesheet for `<input type="hidden">`)
- [Adding CSS classes on our custom elements by ourselves may conflict with CSS classes set by consumers](https://developers.google.com/web/fundamentals/web-components/best-practices#do-not-self-apply-classes)

## Enum component attributes/properties

Sometimes a component attribute/property chooses one in the choices. For example, we pick one from `primary`/`secondary`/`danger`/`ghost` for `type` attribute in `<bx-btn>`.

Instead of using `primary`/`secondary`, etc. directly like this:

```typescript
class BXBtn extends LitElement {
  ...

  /**
   * Button kind.
   */
  @property({ reflect: true })
  kind = 'primary'; // ❗️ Don't do this

  ...
}
```

We define a [TypeScript enum](https://www.typescriptlang.org/docs/handbook/enums.html) for `primary`/`secondary`, etc. and use it, like:

```typescript
/**
 * Button kinds.
 */
export enum BUTTON_KIND {
  /**
   * Primary button.
   */
  PRIMARY = 'primary',

  /**
   * Secondary button.
   */
  SECONDARY = 'secondary',

  /**
   * Danger button.
   */
  DANGER = 'danger',

  /**
   * Ghost button.
   */
  GHOST = 'ghost',
}

...

class BXBtn extends LitElement {
  ...

  /**
   * Button kind.
   */
  @property({ reflect: true })
  kind = BUTTON_KIND.PRIMARY;

  ...
}
```

## Customizing components

Like `carbon-components` library does, `@carbon/ibmdotcom-web-components` ensures components are written in a flexible manner enough to support use cases different applications have.

### Defining (default) component options

Component options are defined as static properties of custom element class, instead of in `options` object seen in `carbon-components`.

The primary reason for the difference is that [there is no support for constructor arguments in Custom Elements](https://github.com/w3c/webcomponents/issues/605) and the use case for using constructor for Custom Elements is rare. It makes instance-level configuration unrealistic.

### Component variants with different options

A component variant with different options can be created by creating a derived class which overrides static properties of component options.

#### Areas to make them configurable as component options

| Area                                                                                                   | Example of component option (static property) name | Remarks                                                                |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------- |
| CSS selectors/classes used in imperative DOM API calls (Doing so allows overriding `.render()` method) | `selectorNonSelectedItem`                          | An exception is where `lit-element`'s `@query` decorator is applicable |
| [Custom event](#custom-events) names                                                                   | `eventBeforeSelect`                                |                                                                        |

#### Areas where component optinos are _not_ applied

- CSS classes used in template (Should be done by overriding `.render()` method)

### Creating inherited components

This codebase intends to support the components being inherited, to some extent. e.g. Compoennts with different options described above. To support that, it's easier for all properties/methods exposed as `protected`, but it exposes a risk of the component internals being poked around. The current guideline for using `protected` is the following:

- Ones where override happens within this component library (e.g. `<bx-multi-select>` inheriting `<bx-dropdown>`)
- Element ID's auto-generation logic
- (Possibly some more, e.g. ones whose API are stable enough)

## Polymorphism with static properties

To support [polymorphism with static properties](https://github.com/Microsoft/TypeScript/issues/3841)...

We do:

```typescript
(this.constructor as typeof CustomElementClass).staticPropName;
```

```typescript
(customElementInstance.constructor as typeof CustomElementClass).staticPropName;
```

We don't:

```typescript
CustomElementClass.staticPropName;
```

## Encapsulation

One of the greatest things about Web Components is that component's implementation details are encapsulated away from applications or other components. Here are some tips to achieve the goal:

### Strive to avoid accessing shadow DOM nodes of other components

Given we are using [`open` mode for Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#Basic_usage), access to shadow DOM content won't be prohibited and it's sometime temptative to access shadow DOM nodes of a component from another component, like in `<dds-masthead-menu-button>`:

`masthead-menu-button.ts`:

```typescript
// ❗️ Don't do this
_handleClick(event: MouseEvent) {
  // Grab `<dds-left-nav>`
  const leftNav = document.querySelector('dds-left-nav');
  // Poke into inner DOM node in shadow DOM
  const leftNavContentInShadowDOM = leftNav.shadowRoot.querySelector('.dds--left-nav__content');
  // Change the CSS class of inner DOM node
  leftNavContentInShadowDOM.classList.togle('.dds--left-nav__content--shown');
}
```

However, it means poking into `<dds-left-nav>`'s implementation details, in a similar manner to accessing `private` properties in a class. And thus when `<dds-left-nav>` removes `dds--left-nav__content` class from the content node (it's an implementation detail) `<dds-masthead-menu-button>` will be broken.

The first step to fix this problem is adding an API to `<dds-left-nav>` for adding/removing `dds--left-nav__content--shown` class. For example, we can introduce `active` property to do so:

`left-nav.ts`:

```typescript
@property({ type: Boolean, reflect: true })
active = false;

render() {
  const { active } = this;
  const classes = classMap({
    [`${ddsPrefix}--left-nav__content`]: true,
    [`${ddsPrefix}--left-nav__content__shown`]: active,
  });
  return html`
    <div class="${classes}">
      <slot></slot>
    </div>
  `;
}
```

### Custom events

Another step is adding an API to `<dds-masthead-menu-button>` that tells the user gesture of clicking and translating it to a meaning context to an application ("toggling" in this case):

`masthead-menu-button.ts`:

```typescript
_handleClick(event: MouseEvent) {
  const active = !this.active;
  this.active = active;
  this.dispatchEvent(
    new CustomEvent((this.constructor as typeof BXHeaderMenuButton).eventToggle, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        active,
      },
    }
  );
}

static get eventToggle() {
  return `${ddsPrefix}-masthead-menu-button-toggled`;
}
```

Above code fires `dds-masthead-menu-button-toggled` custom event so that other components can see when user toggles the state of `<dds-masthead-menu-button>`. For example, `<dds-left-nav>` can listen to `dds-masthead-menu-button-toggled` event and reflect the new state from the event to `<dds-left-nav>`:

`left-nav.ts`:

```typescript
@HostListener('parentRoot:eventButtonToggle')
// @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
private _handleToggleMenuButton(event: CustomEvent) {
  this.active = event.detail.active;
}

static get eventButtonToggle() {
  return `${ddsPrefix}-header-menu-button-toggled`;
}
```

> 💡 Some components fire another event, which is [cancelable](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable), right before it changes the state. For example, [`<bx-modal>` fires `bx-modal-beingclosed` custom event before it updates its state from `open` to `closed`](https://github.com/carbon-design-system/carbon-web-components/blob/v1.0.0/src/components/modal/modal.ts#L166). If `.preventDefault()` is called on such event, the modal won't be closed.

> 💡 We define custom event names as static properties so derived classes can customize them. More information can be found at ["Areas to make them configurable as component options" section](#areas-to-make-them-configurable-as-component-options).

> 💡 See ["Lifecycle management" section](#lifecycle-management) for the details of `@HostListener()`.

### Data flow (Summary)

`@carbon/ibmdotcom-web-components` uses `lit-html` template primary to change the DOM. It means that most of the component DOM works as a projection of public attribute/property and internal state.

Especially, `@carbon/ibmdotcom-web-components` avoids direct mutation of the DOM outside the component. Instead, `@carbon/ibmdotcom-web-components` uses events to communicate user gestures, state changes, etc. to other components.

In general:

- Data flow from parent component to child component is done via attributes and properties.
- Data flow from child component to parent component is done via events, mostly custom events.
- Data flow between sibling components should define parent/child roles between them and apply above rules.

## Globalization

### Translation

Like what most of native elements do, the primary means to handle translatable strings is let user put them in DOM, e.g. in attributes, child (text) nodes.

Some translatable strings are specified as a property, whose value is a function that takes a key-value map (object) as the arguments and returns the translatable string, e.g. `` ({ start, end, total }) => `${start}–${end} of ${total} item${total <= 1 ? '' : 's'}` ``. This is for supporting locale-specific pluralization, etc. that require string interpolation as well as the logic to dictate the locale-specific rule of pluralization.

### Collation

Similar to `carbon-web-components`, to avoid problems with collation, the primary means for user to determine order in list item is ordering them in DOM, for example:

```html
<bx-dropdown>
  <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
  <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
  <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
</bx-dropdown>
```

## Null checks

If you get TypeScript "may be null" errors, think twice to see if there is such edge case:

- If some other portion of your code ensures the `null` condition won't happen and nothing else is likely to break it, use the non-null assertion operator (`!`) - But don't blindly do so.
- Otherwise, add code to perform a `null` check by doing one of the following:
  - Throw an exception that explains why the `null` value won't be acceptable and (if applicable) what mistake may cause that wrong condition
  - Make the code no-op for `null` value, e.g. with optional chaining (`?.`)
  - Provide a fallback value, e.g. with null coalescing (`??`)

## Updating view upon change in `private`/`protected` properties

To cause re-rendering upon change in `private`/`protected` properties, use `state()` decorator (instead of `@property()`). This is [a new feature in `2.3.0` version of `lit-element`](https://github.com/Polymer/lit-element/blob/v2.4.0/CHANGELOG.md#added-1).

## Avoiding global `document`/`window` reference

Global `document`/`window` can be different from the ones associated with custom element instance, when the custom element is transported to a different frame e.g. with `document.importNode()`. Though such cases are rare, the codebase avoids global `document`/`window` reference to keep ourselves in a good DOM citizen. We use [`element.ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)/[`.element.ownerDocument.defaultView`](https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView), respectively, instead.

## Custom element registration

This library registers custom elements to global `window` automatically upon importing the corresponding modules.
It may not be desirable in two scenarios:

- One is when consumer wants to customize our custom element's behavior before it's registered. In such case, consumer can create a derived class and register it with a different custom element name.
- Another, though the use case is rare, is using our custom element in a different realm. In such case, consumer can re-register the custom element in the realm.

## Custom element itself as an eleement

In Custom Elements world, the custom element itself (the host of shadow DOM) itself is an element.

When we create a custom element that represents `<li class="bx--footer-nav-group__item">`, it's tempting to render the following in shadow DOM:

```typescript
@customElement(`${ddsPreifx}-footer-nav-item`)
class DDSFooterNavItem extends LitElement {
  ...

  render() {
    const { href } = this;
    // ❗️ Don't do this
    return html`
      <li class="bx--footer-nav-group__item">
        <a class="bx--footer-nav-group__link bx--footer__link" href="${ifNonNull(href)}">
      </li>
    `;
  }

  ...
}
```

But if we do this, we end up creating a DOM tree like below, which means, creating `<dds-footer-nav-item>` as an element in addition to the `<li>`:

```html
<dds-footer-nav-item>
  #shadow-root
    <li class="bx--footer-nav-group__item">
      <a class="bx--footer-nav-group__link bx--footer__link" href="https://ibm.com/foo">
    </li>
</dds-footer-nav-item>
```

To solve such redundant DOM element, we do the following instead:

```typescript
@customElement(`${ddsPreifx}-footer-nav-item`)
class DDSFooterNavItem extends LitElement {
  ...

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      // Ensure the custom element has the same a11y role as `<li>`
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const { href } = this;
    // Don't render `<li>` here
    return html`
      <a class="bx--footer-nav-group__link bx--footer__link" href="${ifNonNull(href)}">
    `;
  }

  ...
}
```

> 💡 Make sure `:host(#{$ddsPrefix}-footer-nav-item)` the same CSS rules as `#{$prefix}--footer-nav-group__item` in the Sass code.

> 💡 `<button>` and `<a>` are exceptions to this rule because there is no way to implement the same feature of those tags with a custom element.

## Propagating misc attributes from shadow host to an element in shadow DOM

Similar to `carbon-web-components`, some components, e.g. `<bx-btn>`, simply represent the content in shadow DOM, e.g. `<button>` in it. It's sometimes desiable for applications to have control of attributes in `<button>`, for example, adding `data-` attributes there.

In such case, we let consumer create a derived class. For example, its `.attributeChangedCallback()` can propagate `<bx-btn>`'s attribute to `<button>` in it.

## Private properties

This codebase tends to make all component class/instance properties `private` unless they serve API purpose. This codebase makes some of them `protected` to support inherited components.

`private`/`protected` properties should be prefixed with `_`.

## Preferring class inheritance pattern over React composition pattern

As we are converting our React code to Web Components code, it’s tempting to just copy over the markup structure of React to Web Components.
However, our React codebase has lots of occurrences of a pattern where a component extends another component by putting such “ancestor component” in the render logic.
It’s called React [“composition pattern”](https://reactjs.org/docs/composition-vs-inheritance.html), and as the link tells React community recommends it even.
However, it often doesn’t work well with Web Components for several reasons, e.g. the ancestor component loses the style ownership of the inherited component due to Shadow DOM CSS encapsulation boundary.
That said, in `@carbon/ibmdotcom-web-components` codebase prefers class inheritance pattern.

To highlight this, here is an example of what a preferred inheritance pattern would be:

```typescript
class DDSFoo extends DDSBar {
  render() {
    return html`
      ${super.render()}(Some additional content)
    `;
  }
}
```

Whereas this would be a pattern to avoid:

```typescript
class DDSFoo extends LitElement {
  render() {
    return html`
      // ❗️ Consider avoiding this
      <dds-bar>...</dds-bar>
    `;
  }
}
```

## Limiting components that works with complex data

This repository limits the number of components that works with component data, from the following reasons:

1. It's hard for users to figure out what the correct data structure to set to our components, even if we document it well. For example, an effort to test components with different data can easily cause data scheme validation errors, or (even worse) internal errors, if the component requires complex data structure to use.
2. Native HTML elements, including custom elements, can handle only primitive data effectively via attributes. For example, `<dds-some-element complex-data="{ foo: { subFoo: 'sub-foo' } }">` is hard to read and has `JSON.parse()`/`JSON.stringify()` overhead. We can use an element property instead of an attribute in this particular case, but properties won't be shown explicitly in e.g. DOM inspectors.
3. Modern templating engines do some sort of data comparisons to determine what portion of UI has to be re-rendered. If many components have to work with complex data, such comparison will be very costful.

But there are certain kind of components that have to work with complex data, which is, ones that manage application-level states. This repository clearly separates such kind of components vs. one that purely represents user interface/interaction, using the following categorization:

- **Container components**: Ones that manage application-level states and/or do data fetching/storing. The elements has `<dds-*-container>` naming rule. Container components may work with dedicated state manager like Redux (often recommended).
- **Leaf components**: Ones that represents user interface/interaction. Most of our components are in this category.

## Optimizing layout query

`onscroll` and `onresize` event handlers fire as user scrolls and resizes the window, respectively. The event handlers of those event tend to query for layout of DOM elements that is known as [expensive](https://gist.github.com/paulirish/5d52fb081b3570c81e3a). To avoid excessive  number of calls with such heavy thing [debouncing/throttling/caching, etc. are known as old best practices](https://felixgerschau.com/javascript-event-loop-call-stack/#event-loop), but doing the right thing with it, especially determining when is the right timing to query for layout, is very hard.

`@carbon/ibmdotcom-web-components` codebase uses [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) as new best practices. Those APIs leverages browser's layout information it calculates at the right timing so that application doesn't need to run another query that may not be at the right timing.

Be mindful of [lifecycle management](#lifecycle-management). For example, we don't want to keep observing intersection of DOM elements that are no longer there inside `<body>`, like ones that are removed as routing happens. An example of lifecycle management code can be found at [here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/v1.15.0/packages/web-components/src/components/masthead/top-nav.ts#L109-L136), which is called from `connectedCallback()` and `disconnectedCallback()`.

> 💡 Creating `IntersectionObserver`/`ResizeObserver` may require waiting for the target DOM to be created. Leverage `lit-element`'s lifecycle methods, e.g. [`firstUpdated()`](https://lit-element.polymer-project.org/guide/lifecycle#firstupdated)/[`updated()`](https://lit-element.polymer-project.org/guide/lifecycle#updated), for that.
