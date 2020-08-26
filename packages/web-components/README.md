A IBM.com Design System variant that's as easy to use as native HTML elements, with no framework tax, no framework silo.

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

`@carbon/ibmdotcom-web-components` uses [`lit-html`](https://lit-html.polymer-project.org) for reactive templating on top of raw Web Components standard and [`lit-element`](https://lit-element.polymer-project.org) for reactive properties/attributes on top of `lit-html`. `@carbon/ibmdotcom-web-components` makes them `peerDependencies` to provide a better flexibility in version choices of those libraries.

### Basic usage

For quick start, you can use CDNs that support module mapping (e.g. [JSPM](https://jspm.org)). With it, you can use our components as easy as using HTML tags, just by importing our modules in `<script type="module">` like:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import 'https://jspm.dev/@carbon/ibmdotcom-web-components@latest/es/components/masthead/masthead-container.js';
    </script>
    <style type="text/css">
      body {
        font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <dds-masthead-container></dds-masthead-container>
  </body>
</html>
```

For production usage, our recommendation is **setting up a module bundler** to resolve ECMAScript `import`s. Once you set up a module bundler, you can start importing our component modules, like:

```javascript
import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container';
```

Once you do that, you can use our components as easy as using HTML tags, like:

```html
<dds-masthead-container></dds-masthead-container>
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/web-components/examples/codesandbox/components/masthead)
> example implementation.

### Expressive Theme

While styles are included as part of the web components, the expressive theme
for Carbon requires the `CSS Custom Properties` flag in Carbon to be enabled.

[Learn how to activate CSS Custom Properties here](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/styles/README.md).

## Browser support

Based on [ibm.com browser support](https://www.ibm.com/standards/web/browser-support/):

- Latest Chrome/Safari/FF ESR
- IE and classic Edge are _not_ supported

## List of available components

View available web components at: https://ibmdotcom-web-components.mybluemix.net/. You can see usage information in several ways:

1. Going to Docs tab, where it shows the usage and available attributes, properties and custom events.
2. Clicking the **KNOBS** tab at the bottom and changing values there. Most knobs are shown as something like `Button kind (kind)`, where `kind` is the attribute name
3. Clicking the **ACTION LOGGER** tab at the bottom and interacting with the selected component. You may see something like `bx-modal-closed` which typically indicates that an event with such event type is fired.

## Advanced

### Using custom styles in components

As Shadow DOM (one of the Web Components specs that `@carbon/ibmdotcom-web-components` uses) promises, styles that `@carbon/ibmdotcom-web-components` defines does not affect styles in your application, or vice versa.

However, in cases where your application or a Carbon-derived style guide wants to change the styles of our components, there are a few options.

#### Creating derived components with different style

You can create a derived class of our component and override [static `styles` property](https://lit-element.polymer-project.org/guide/styles#static-styles), like:

```javascript
import { css, customElement } from 'lit-element';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components/link-with-icon/link-with-icon';

@customElement('my-link-with-icon')
class MyLinkWithIcon extends DDSLinkWithIcon {
  // Custom CSS to enforce `g100` color of the link text
  static styles = css`
    ${DDSLinkWithIcon.styles}
    .bx--link-with-icon {
      color: #3d70b2;
    }
  `;
}
```

#### Using CSS Custom Properties

Changes to CSS Custom Properties of the Carbon theme are reflected in the color scheme of `@carbon/ibmdotcom-web-components` components:

For example, if you add CSS like below:

```css
dds-link-with-icon {
  --cds-link-01: #3d70b2; /* `$link-01` token for `g100` theme */
}
```

The color of the link in the code below changes to the one in the `g100` theme:

```html
<dds-link-with-icon href="https://www.ibm.com/standards/web/ibm-dotcom-library">
  Link text
  <svg
    slot="icon"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
  </svg>
</dds-link-with-icon>
```

The names of CSS Custom Properties you can use are the Carbon theme tokens prefixed with `--cds-`. The list of Carbon theme tokens can be found at [here](https://github.com/carbon-design-system/carbon/blob/v10.7.0/packages/themes/scss/generated/_themes.scss#L14-L454).

With CSS Custom Properties approach, you can switch the entire theme under the specific element by:

```scss
@import 'carbon-components/scss/globals/scss/css--helpers';
@import 'carbon-components/scss/globals/scss/vendor/@carbon/elements/scss/themes/mixins';

dds-link-with-icon {
  // Emits all theme tokens in CSS Custom Properties
  @include carbon--theme($carbon--theme--g100, true);
}
```

#### CSS Shadow Parts

Some components support [CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/) too, so you can use your application's CSS to affect `@carbon/ibmdotcom-web-components` styles in a more flexible manner.

For example, below style changes back button's text color in `<dds-locale-modal>` to one of `g100` theme:

```css
dds-locale-modal::part(back-button) {
  color: #152935;
}
```

## Stable selectors (for analytics and integration/E2E testing) in Web Components

Can be found at [here](./docs/stable-selectors.md).

## Developer documentations

Can be found at [here](./docs/developer.md).
