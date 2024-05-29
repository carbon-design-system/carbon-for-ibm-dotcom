A `Carbon for IBM.com` variant that is as easy to use as native HTML elements,
with no framework tax, no framework silo.

# `@carbon/ibmdotcom-web-components`

`@carbon/ibmdotcom-web-components` is a variant of `Carbon for IBM.com` with
Custom Elements v1 and Shadow DOM v1 specs.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of contents

- [Getting started](#getting-started)
- [Usage Examples](#usage-examples)
  - [Webpack Application Setup](#webpack-application-setup)
    - [Basic Setup](#basic-setup)
    - [Using Sass](#using-sass)
    - [Process.env Error](#processenv-error)
  - [CDN Bundles](#cdn-bundles)
    - [Versioned Bundles](#versioned-bundles)
  - [Using with other design systems (e.g Northstar v18)](#using-with-other-design-systems-eg-northstar-v18)
- [Browser support](#browser-support)
- [List of available components](#list-of-available-components)
- [Stable selectors (for analytics and integration/E2E testing) in Web Components](#stable-selectors-for-analytics-and-integratione2e-testing-in-web-components)
- [Advanced](#advanced)
  - [Using custom styles in components](#using-custom-styles-in-components)
    - [Creating derived components with different style](#creating-derived-components-with-different-style)
    - [Using CSS Custom Properties](#using-css-custom-properties)
    - [CSS Shadow Parts](#css-shadow-parts)
    - [Advanced usage for IBM.com site owners](#advanced-usage-for-ibmcom-site-owners)
- [Contributing to Carbon for IBM.com Web Components](#contributing-to-carbon-for-ibmcom-web-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

To install `@carbon/ibmdotcom-web-components` in your project, you will need to
run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/ibmdotcom-web-components
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/ibmdotcom-web-components
```

> NOTE: Lit dependencies will be managed by Carbon for IBM.com starting in
> `v1.13.0`. For earlier versions, Lit dependencies will have to be installed
> separately:
>
> npm:
>
> ```bash
> npm install -S lit-html lit-element
> ```
>
> Yarn:
>
> ```bash
> yarn add lit-html lit-element
> ```

`@carbon/ibmdotcom-web-components` uses
[`lit`](https://lit-html.polymer-project.org) for reactive templating on top of
raw Web Components standard and
[`lit/decorators`](https://lit-element.polymer-project.org) for reactive
properties/attributes on top of `lit`.

## Usage Examples

### Webpack Application Setup

#### Basic Setup

For production usage, our recommendation is **setting up a module bundler** to
resolve ECMAScript `import`s.

You can start with a minimum configuration for most module bundlers. For
example, with [WebPack](https://webpack.js.org/), you don't need any
configuration.

Once you set up a module bundler, you can start importing our component modules,
like:

```javascript
import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container';
```

Once you do that, you can use our components as easy as using HTML tags, like:

```html
<c4d-masthead-container></c4d-masthead-container>
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/webpack-basic)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/webpack-basic)

> 💡 Above CodeSandbox example uses
> [`html-webpack-plugin`](https://webpack.js.org/plugins/html-webpack-plugin/)
> to let [WebPack server](https://webpack.js.org/configuration/dev-server/)
> serve the `.html` file, but you can use other means to serve `.html` files,
> for example, using [Express](http://expressjs.com) server.

#### Using Sass

While styles are included as part of the web components, setting up Sass
toolchain is often useful for styling your contents.

To use Sass, you can add a Sass toolchain to your module bundler. A couple of
key settings needed in the Sass toolchain are:

1. [`autoprefixer`](https://github.com/postcss/autoprefixer). This is a
   requirement for using Carbon core Sass code.
2. `enable-css-custom-properties` Carbon Sass feature flag. This is a
   requirement for Carbon for IBM.com styles, especially using the
   [Expressive theme](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/styles/README.md).
3. `grid-column-16` Carbon Sass feature flag. This is a requirement for Carbon
   for IBM.com styles as the design prefers Carbon 16 columns grid over
   [`carbon-components` library's default 12 columns grid](https://github.com/carbon-design-system/carbon/blob/v10.22.0/packages/components/src/globals/grid/_grid.scss#L17-L43).

Here's an example for WebPack:

```javascript
module: {
  rules: [
    {
      test: /\.scss$/,
      sideEffects: true,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              // `autoprefixer` is a requirement for Carbon core Sass code
              plugins: [autoprefixer],
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              includePaths: ['../node_modules', '../../../node_modules'],
              // `enable-css-custom-properties` and `grid-columns-16` feature flags
              // are requirements for Carbon for IBM.com styles
              data: `
                $feature-flags: (
                  enable-css-custom-properties: true,
                  grid-columns-16: true,
                );
              `,
            },
          },
        },
      ],
    },
  ],
},
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/webpack-sass)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/webpack-sass)

To prevent a flash of unstyled content (FOUC) from happening on your page be
sure to to `display: none` if a component has not been defined yet. For example

```css
c4d-button-group:not(:defined) {
  display: none;
}
```

#### Process.env Error

There are references to the `process.env` global variable in the our
web-components package and dependencies. If a build toolchain (e.g. WebPack’s
EnvironmentPlugin) to replace `process.env.*` is not used in your application,
you can place the following code in the `polyfills.ts` file of your application.

```javascript
(window as any).process = {
  env: { DEBUG: undefined },
};
```

### CDN Bundles

To get an application running without the need for front-end bundlers, there are
pre-built CDN bundles available for each individual component.

Here is an example of implementing the `dotcom-shell`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import 'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v2/latest/dotcom-shell.min.js';

      // The minimum prerequisite to use our service for translation data, etc.
      window.digitalData = {
        page: {
          pageInfo: {
            language: 'en-US',
            ibm: {
              country: 'US',
              siteID: 'IBMTESTWWW',
            },
          },
          isDataLayerReady: true,
        },
      };
    </script>
    <style type="text/css">
      body {
        font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
      }
    </style>
    <!-- The minimum prerequisite to use our locale selector -->
    <link rel="alternate" hreflang="en-us" href="https://www.ibm.com/us-en/" />
    <link rel="alternate" hreflang="x-default" href="https://www.ibm.com" />
    ...
  </head>
  <body>
    <c4d-dotcom-shell-container></c4d-dotcom-shell-container>
  </body>
</html>
```

#### Carbon CDN style helpers (optional)

There are optional CDN artifacts available that can assist with global Carbon
styles in lieu of including into your specific application bundle.

For example, the following adds Carbon reset and necessary Plex fonts to the
page:

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v2/latest/plex.css" />
    ...
  </head>
</html>
```

[Learn more about Carbon CDN style helpers here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/docs/carbon-cdn-style-helpers.md)

> 💡 Refer to
> ["Building for IBM.com'](https://www.ibm.com/standards/carbon/web-components/?path=/docs/overview-building-for-ibm-dotcom--page)
> page for `window.digitalData` and `<link rel="alternate" ...>`.

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/dotcom-shell-cdn)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/dotcom-shell-cdn)

#### Versioned Bundles

The CDN packages are available by NPM tags `latest` (full releases), `next`
(latest release candidate), and specific versions. The URL pattern for import
would be:

```html
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[VERSION]/dotcom-shell.min.js"></script>
```

or

```html
<script type="module">
  import 'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[VERSION]/dotcom-shell.min.js';
</script>
```

A tag release would be called as:

```html
<!-- LATEST -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v2/latest/dotcom-shell.min.js"></script>

<!-- NEXT -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v2/next/dotcom-shell.min.js"></script>
```

A specific release would be called as:

```html
<!-- SPECIFIC VERSION (available starting v1.6.0) -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/v2.x.y/dotcom-shell.min.js"></script>
```

> NOTE: The latest/next tags are moving versions. While beneficial to always
> stay on the most recent version, it is recommended to choose a specific
> version and properly test your application when upgrading to a newer version.

### Using with other design systems (e.g Northstar v18)

[Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/), one of the
standards used in Carbon for IBM.com Web Components, isolates the web component
styles from the application styles. This means those two styles won't adversely
affect each other.

For applications that are currently running on other design systems like
[legacy Northstar v18](https://www.ibm.com/standards/web/v18/), such isolation
will assist with gradual migration from legacy IBM.com Northstar v18 styles to
Carbon for IBM.com styles. Both technologies can co-exist safely in the same
application. Here is an example with the Carbon for IBM.com masthead and legacy
IBM.com Northstar footer:

```html
<!-- Loads legacy IBM.com Design System (Northstar) -->
<link rel="stylesheet" href="https://1.www.s81c.com/common/v18/css/www.css" />
<script src="https://1.www.s81c.com/common/v18/js/www.js"></script>
<!-- Loads Carbon for IBM.com Web Components masthead -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/masthead.min.js"></script>

...

<body id="ibm-com" class="ibm-type">
  <div id="ibm-top" class="ibm-landing-page">
    <!-- Uses Carbon for IBM.com Web Components masthead -->
    <c4d-masthead-container></c4d-masthead-container>
    <div id="ibm-content-wrapper">...</div>
    <!-- Uses legacy IBM.com Design System (Northstar) footer -->
    <footer role="contentinfo" aria-label="IBM"></footer>
  </div>
</body>
```

> 💡 Above example requires setting up a module bundler, as discussed in earlier
> section.

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/v18)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components/examples/codesandbox/usage/v18)

## Browser support

Based on
[ibm.com browser support](https://w3.ibm.com/w3publisher/ibm-web-standards-external/standards-mandatory/browser-standards):

- Latest Chrome/Safari/FF ESR
- IE and classic Edge are _not_ supported

## List of available components

View available web components at:
https://www.ibm.com/standards/carbon/web-components/. You can see usage
information in several ways:

1. Going to Docs tab, where it shows the usage and available attributes,
   properties and custom events.
2. Clicking the **KNOBS** tab at the bottom and changing values there. Most
   knobs are shown as something like `Button kind (kind)`, where `kind` is the
   attribute name
3. Clicking the **ACTION LOGGER** tab at the bottom and interacting with the
   selected component. You may see something like `bx-modal-closed` which
   typically indicates that an event with such event type is fired.

## Stable selectors (for analytics and integration/E2E testing) in Web Components

Can be found at [here](./docs/stable-selectors.md).

## Advanced

### Using custom styles in components

As Shadow DOM (one of the Web Components specs that
`@carbon/ibmdotcom-web-components` uses) promises, styles that
`@carbon/ibmdotcom-web-components` defines does not affect styles in your
application, or vice versa.

However, in cases where your application or a Carbon-derived style guide wants
to change the styles of our components, there are a few options.

#### Creating derived components with different style

You can create a derived class of our component and override
[static `styles` property](https://lit-element.polymer-project.org/guide/styles#static-styles),
like:

```javascript
import { css, customElement } from 'lit';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components/link-with-icon/link-with-icon';

@customElement('my-link-with-icon')
class MyLinkWithIcon extends C4DLinkWithIcon {
  // Custom CSS to enforce `g100` color of the link text
  static styles = css`
    ${C4DLinkWithIcon.styles}
    .bx--link-with-icon {
      color: #3d70b2;
    }
  `;
}
```

#### Using CSS Custom Properties

Changes to CSS Custom Properties of the Carbon theme are reflected in the color
scheme of `@carbon/ibmdotcom-web-components` components:

For example, if you add CSS like below:

```css
c4d-link-with-icon {
  --c4d-link-01: #3d70b2; /* `$link-01` token for `g100` theme */
}
```

The color of the link in the code below changes to the one in the `g100` theme:

```html
<c4d-link-with-icon
  href="https://www.ibm.com/standards/carbon"
  cta-type="local">
  Link text
</c4d-link-with-icon>
```

The names of CSS Custom Properties you can use are the Carbon theme tokens
prefixed with `--cds-`. The list of Carbon theme tokens can be found at
[here](https://github.com/carbon-design-system/carbon/blob/v10.7.0/packages/themes/scss/generated/_themes.scss#L14-L454).

With CSS Custom Properties approach, you can switch the entire theme under the
specific element by:

```scss
@use '@carbon/styles/scss/themes' as *;

c4d-link-with-icon {
  // Emits all theme tokens in CSS Custom Properties
  @include theme(g100, true);
}
```

#### CSS Shadow Parts

Some components support
[CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/) too, so you can
use your application's CSS to affect `@carbon/ibmdotcom-web-components` styles
in a more flexible manner.

For example, below style changes back button's text color in
`<cds-locale-modal>` to one of `g100` theme:

```css
cds-locale-modal::part(back-button) {
  color: #152935;
}
```

> **⚠️ Warning**  
> While shadow parts selectors are available as an option, use them at your own risk. Changing component styles may cause components to not behave as expected. You are responsible for ensuring your components remain functional while using shadow parts selectors. We cannot guarantee updates to our library's component styles won't conflict with shadow part modifications.

#### Advanced usage for IBM.com site owners

There are some other key advanced usage patterns that are suitable for IBM.com
site owners. IBM.com site owners can see them at [here](https://ibm.biz/Bdq5q2).

## Contributing to Carbon for IBM.com Web Components

Can be found at [here](./docs/contributing-to-web-components.md).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
