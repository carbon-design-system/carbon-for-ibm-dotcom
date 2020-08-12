# Coding conventions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Linters/formatters](#lintersformatters)
- [TSDoc comments](#tsdoc-comments)
- [No kitchen-sink "base" class and using mix-in](#no-kitchen-sink-base-class-and-using-mix-in)
- [Minimize dependencies](#minimize-dependencies)
- [Lifecycle management](#lifecycle-management)
- [Component styles for different component states/variants](#component-styles-for-different-component-statesvariants)
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
- [Custom element registration](#custom-element-registration)
- [Propagating misc attributes from shadow host to an element in shadow DOM](#propagating-misc-attributes-from-shadow-host-to-an-element-in-shadow-dom)
- [Private properties](#private-properties)
- [Limiting components that works with complex data](#limiting-components-that-works-with-complex-data)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linters/formatters

`@carbon/ibmdotcom-web-components` uses ESLint with `typescript-eslint` for linting, and Prettier for code formatting.
Most of ESLint configurations are same as [ones in `carbon-components`](https://www.npmjs.com/package/eslint-config-carbon-base).

## TSDoc comments

In addition to using TypeScript, we try to leverage editors' code assistance feature as much as possible.

For that purpose, we add TSDoc comments to the following:

- All classes
- All properties/methods (including private properties), only exception here is one being overriden
- All type definitions (e.g. `interface`, `enum`)

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

For that purpose, similar to `carbon-web-components`, `@carbon/ibmdotcom-web-components` uses `@HostListener(type, options)` decorator. `@HostListener(type, options)` decorator works with a custom element class inheriting `HostListenerMixin()` and attaches an event listener using the target method as the listener. The `type` argument can be something like `document:click` so the `click` event listener is attached to `document`.

Here's an example seen in `<bx-modal>` code:

```typescript
...
import HostListener from 'carbon-web-components/es/globals/decorators/HostListener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/HostListener';
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

## Component styles for different component states/variants

Carbon core CSS uses BEM modifier like `bx--btn--danger` to style different states/variants of a component.

OTOH, similar to `carbonm-custom-elements`, `@carbon/ibmdotcom-web-components` uses attributes to represent different states/variants (e.g. `<bx-btn type="danger">`), in a similar manner as how attributes influence states/variants of native elements (e.g. `<input type="hidden">`).

If such states/variants should affect the style of custom element (shadow host), we define attribute styles from the following reasons:

- Taking a cue from native elements with user agent shadow DOM (e.g. UA stylesheet for `<input type="hidden">`)
- [Adding CSS classes on our custom elements by ourselves may conflict with CSS classes set by consumers](https://developers.google.com/web/fundamentals/web-components/best-practices#do-not-self-apply-classes)

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
connectedCallback() {
  super.connectedCallback();
  this._hAfterButtonToggle = on(
    // If `<dds-left-nav>` is placed in a shadow DOM, `.getRootNode()` finds such shadow DOM.
    // Otherwise it finds the owning `document.
    this.getRootNode() as Document,
    (this.constructor as typeof DDSLeftNav).eventButtonToggle,
    (event: CustomEvent) => {
      this.active = event.detail.active;
    }
  );
}

static get eventButtonToggle() {
  return `${ddsPrefix}-header-menu-button-toggled`;
}
```

> 💡 Some components fire another event, which is [cancelable](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable), right before it changes the state. For example, [`<bx-modal>` fires `bx-modal-beingclosed` custom event before it updates its state from `open` to `closed`](https://github.com/carbon-design-system/carbon-web-components/blob/v1.0.0/src/components/modal/modal.ts#L166). If `.preventDefault()` is called on such event, the modal won't be closed.

> 💡 We define custom event names as static properties so derived classes can customize them.

> 💡 [`on()` API](https://github.com/carbon-design-system/carbon/blob/v10.16.0/packages/components/src/globals/js/misc/on.js) is used for a component lifecycle management, so `this._hAfterButtonToggle.release()` will clean-up the event listener. For native DOM events like `click`, we have better API called [`@HostListener`](<(#lifecycle-management)>).

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

`lit-element` observes for changes in declared properties for updating the view. `@carbon/ibmdotcom-web-components` codebase doesn't use this feature simply to get properties observed. Specifically, `@carbon/ibmdotcom-web-components` doesn't set `private`/`protected` properties as declared. Whenever change in `private`/`protected` should cause update in the view, we take manual approach (`.requestUpdate()`).

## Custom element registration

This library registers custom elements to global `window` automatically upon importing the corresponding modules.
It may not be desirable in two scenarios:

- One is when consumer wants to customize our custom element's behavior before it's registered. In such case, consumer can create a derived class and register it with a different custom element name.
- Another, though the use case is rare, is using our custom element in a different realm. In such case, consumer can re-register the custom element in the realm.

## Propagating misc attributes from shadow host to an element in shadow DOM

Similar to `carbon-web-components`, some components, e.g. `<bx-btn>`, simply represent the content in shadow DOM, e.g. `<button>` in it. It's sometimes desiable for applications to have control of attributes in `<button>`, for example, adding `data-` attributes there.

In such case, we let consumer create a derived class. For example, its `.attributeChangedCallback()` can propagate `<bx-btn>`'s attribute to `<button>` in it.

## Private properties

This codebase tends to make all component class/instance properties `private` unless they serve API purpose. This codebase makes some of them `protected` to support inherited components.

## Limiting components that works with complex data

This repository limits the number of components that works with component data, from the following reasons:

1. It's hard for users to figure out what the correct data structure to set to our components, even if we document it well. For example, an effort to test components with different data can easily cause data scheme validation errors, or (even worse) internal errors, if the component requires complex data structure to use.
2. Native HTML elements, including custom elements, can handle only primitive data effectively via attributes. For example, `<dds-some-element complex-data="{ foo: { subFoo: 'sub-foo' } }">` is hard to read and has `JSON.parse()`/`JSON.stringify()` overhead. We can use an element property instead of an attribute in this particular case, but properties won't be shown explicitly in e.g. DOM inspectors.
3. Modern templating engines do some sort of data comparisons to determine what portion of UI has to be re-rendered. If many components have to work with complex data, such comparison will be very costful.

But there are certain kind of components that have to work with complex data, which is, ones that manage application-level states. This repository clearly separates such kind of components vs. one that purely represents user interface/interaction, using the following categorization:

- **Container components**: Ones that manage application-level states and/or do data fetching/storing. The elements has `<dds-*-container>` naming rule. Container components may work with dedicated state manager like Redux (often recommended).
- **Leaf components**: Ones that represents user interface/interaction. Most of our components are in this category.
