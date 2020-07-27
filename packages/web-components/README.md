A Carbon Design System variant that's as easy to use as native HTML elements, with no framework tax, no framework silo.

# `@carbon/ibmdotcom-web-components`

`@carbon/ibmdotcom-web-components` is a variant of ibm.com Design System with Custom Elements v1 and Shadow DOM v1 specs.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [Basic usage](#basic-usage)
- [Browser support](#browser-support)
- [List of available components](#list-of-available-components)
- [Stable selectors (for analytics and integration/E2E testing) in Web Components](#stable-selectors-for-analytics-and-integratione2e-testing-in-web-components)
  - [`data-autoid` support for partial backward compatibility](#data-autoid-support-for-partial-backward-compatibility)
- [Developer documentations](#developer-documentations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

To install `@carbon/ibmdotcom-web-components` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/ibmdotcom-web-components lit-html lit-element
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/ibmdotcom-web-components lit-html lit-element
```

`@carbon/ibmdotcom-web-components` uses [`lit-html`](https://lit-html.polymer-project.org) for reacting templating on top of raw Web Components standard and [`lit-element`](https://lit-element.polymer-project.org) for reactive properties/attributes on top of `lit-html`. `@carbon/ibmdotcom-web-components` makes them `peerDependencies` to provide a better flexibility in version choices of those libraries.

### Basic usage

For quick start, you can use CDNs that support module mapping (e.g. [JSPM](https://jspm.org)). With it, you can use our components as easy as using HTML tags, just by importing our modules in `<script type="module">` like:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@canary/es/components/button/button.js';
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@canary/es/components/modal/modal.js';
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@canary/es/components/modal/modal-header.js';
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@canary/es/components/modal/modal-heading.js';
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@canary/es/components/modal/modal-close-button.js';
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@canary/es/components/modal/modal-body.js';
    </script>
    <style type="text/css">
      body {
        font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
      }

      dds-btn:not(:defined),
      dds-modal:not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <dds-btn id="launch-modal" kind="primary">Open modal</dds-btn>
    <dds-modal>
      <dds-modal-header>
        <dds-modal-close-button></dds-modal-close-button>
        <dds-modal-heading>Modal Title</dds-modal-heading>
      </dds-modal-header>
      <dds-modal-body>
        Modal content
      </dds-modal-body>
    </dds-modal>
    <script type="text/javascript">
      document.addEventListener('click', event => {
        if (event.target.matches('dds-btn#launch-modal')) {
          document.querySelector('dds-modal').open = true;
        }
      });
    </script>
  </body>
</html>
```

For production usage, our recommendation is **setting up a module bundler** to resolve ECMAScript `import`s. Once you set up a module bundler, you can start importing our component modules, like:

```javascript
import '@carbon/ibmdotcom-web-components/es/components/button/button';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal-header';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal-heading';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal-close-button';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal-body';
```

Once you do that, you can use our components as easy as using HTML tags, like:

```html
<dds-btn id="launch-modal" kind="primary">Open modal</dds-btn>
<dds-modal>
  <dds-modal-header>
    <dds-modal-close-button></dds-modal-close-button>
    <dds-modal-heading>Modal Title</dds-modal-heading>
  </dds-modal-header>
  <dds-modal-body>
    Modal content
  </dds-modal-body>
</dds-modal>
<script type="text/javascript">
  document.addEventListener('click', event => {
    if (event.target.matches('dds-btn#launch-modal')) {
      document.querySelector('dds-modal').open = true;
    }
  });
</script>
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/web-components/examples/codesandbox/components/modal)
> example implementation.

## Browser support

Based on [ibm.com browser support](https://www.ibm.com/standards/web/browser-support/):

- Latest Chrome/Safari/FF ESR
- IE and classic Edge are _not_ supported

## List of available components

View available web components at: http://ibmdotcom-web-components-canary.mybluemix.net/. You can see usage information in several ways:

1. Going to Docs tab, where it shows the usage and available attributes, properties and custom events.
2. Clicking the **KNOBS** tab at the bottom and changing values there. Most knobs are shown as something like `Button kind (kind)`, where `kind` is the attribute name
3. Clicking the **ACTION LOGGER** tab at the bottom and interacting with the selected component. You may see something like `bx-modal-closed` which typically indicates that an event with such event type is fired.

## Stable selectors (for analytics and integration/E2E testing) in Web Components

`@carbon/ibmdotcom-react`, etc. libraries have `data-autoid` attributes in several places, to convey better context for e.g. analytics libraries, when they capture bubbling events e.g. `click` on `<body>` and inspects `event.target`. `data-autoid` is more useful than having to inspect contents in raw HTML `<div>` tags, etc., because `data-autoid` augments raw `<div>` tags with the context of application structure where raw `<div>` tags themselves tend to only convey how the UI should look like. We call such `data-autoid` attributes "stable selectors".

`@carbon/ibmdotcom-web-components` being based on Web Components abstrats away such raw HTML `<div>`, etc. tags, into e.g. `<dds-header-logo>` (one for the IBM logo in masthead) and `<dds-masthead-search>` (one for the collapsible search box in masthead).

It means that in Web Components world, tag names and their attributes well convey application structure, without having to rely on "stable selectors". For example, analytics code can do something like:

```javascript
document.body.addEventListener('click', event => {
  if (event.target.tagName === 'DDS-MASTHEAD-LOGO') {
    // Code to send header logo click event to analytics...
  }
});
```

`<dds-masthead-search>` has more than one clickable buttons. Therefore, `<dds-masthead-search>` fires custom events e.g. `dds-masthead-search-toggled` to better convey the context wrt what action is take upon clicking. You can use it like:

```javascript
document.body.addEventListener('dds-masthead-search-toggled', event => {
  console.log('Search box new open state:', event.detail.active);
  // Code to send masthead search bar toggle event to analytics...
});
```

See Docs tab in each components in http://ibmdotcom-web-components-canary.mybluemix.net/ to see more details on available custom events are available, available attributes/properties are for more context, etc.

### `data-autoid` support for partial backward compatibility

`@carbon/ibmdotcom-web-components` supports `data-autoid` stable selectors for some elements, to provide compatibility to and easier migration from `@carbon/ibmdotcom-react`. However, `document.querySelector('[data-autoid="stable-selector"]')` and `event.target.autoId` does not work with elements in shadow DOM, due to shadow DOM's nature. Therefore, `data-autoid` is _not_ provided for all elements.

See Stable selectors section in Docs tab in each components in http://ibmdotcom-web-components-canary.mybluemix.net/ to see the list of supported `data-autoid` and their Web Components alternatives.

## Developer documentations

Can be found at [here](./docs/developer.md).
