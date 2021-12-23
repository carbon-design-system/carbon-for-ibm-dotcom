<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Contributing to Carbon for IBM.com Web Components package](#contributing-to-carbon-for-ibmcom-web-components-package)
  - [Overview](#overview)
  - [Get Started](#get-started)
  - [Packages](#packages)
  - [JSDoc](#jsdoc)
  - [Stable Selectors](#stable-selectors)
  - [Feature Flag](#feature-flag)
  - [Environment Variables](#environment-variables)
  - [Storybook](#storybook)
  - [Unit Test Coverage](#unit-test-coverage)
  - [Further Reading](#further-reading)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Contributing to Carbon for IBM.com Web Components package

> Guidelines for how to make a code contribution to the Web Components package

## Overview

Thank you for your contribution to Carbon for IBM.com! Below are guidelines on
what some of the things we would be looking for as part of your contribution.

## Get Started

1. Fork this repository and clone it
2. `yarn install`
3. `yarn build`
4. `cd packages/web-components`
5. `yarn storybook`

## Packages

We try to have any contributions to the library to live in their corresponding
package(s). The main packages to look out for when contributing a Web Component:

- **Styles**: ([@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/styles)) 
All styles should live in the styles package in the monorepo. This way, the
styles can be shared with any other framework package (e.g. web components). 
In addition, the way that web components utilize styles requires that there 
isn't a heavy amount of nesting happening in the `SCSS` code. 
- **Services**: ([@carbon/ibmdotcom-services](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/services))
If your component makes any API requests to a service that does not currently
exist yet in our Services package, you can add in a new ES6 service class in
this package. If you need to test across multiple packages, you can make use of
[yarn link](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/docs/developing.md#developing-locally).
Be sure to properly export the class from the main `index.js`.
- **Utilities**: ([@carbon/ibmdotcom-utilities](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/utilities))
Similar to ([Services](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/services)),
any abstract utilities can be added to the Utilities package as an ES6 class or
function. Be sure to properly export the class or function from the main 
`index.js`.

## JSDoc

It is important that the component includes full documentation using `JSDoc`
standards. Our codebase uses `web-component-analyzer` to output the 
`custom-elements.json` for rendering the prop tables in our Storybook Docs for
each component. When documenting, be sure to capture:

- Element name and description
- Documenting slots and attributes
- Default values and allowed values

## Stable Selectors

Every component must include [stable selectors](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/docs/stable-selectors.md) 
as part of the overall markup, identifying any key elements that would be useful
to have the ability to identify in a DOM search. At minimum, there should be at
least a container level stable selector defined, and all should use the `dds--`
prefix identified from the utilities package. 

Our codebase provides a `StableSelectorMixin`, which is used for automatically
setting the `data-autoid` based on the custom element name for the wrapper 
element:

```javascript
@customElement(`${ddsPrefix}-my-component`)
class DDSMyComponent extends StableSelectorMixin(LitElement) {
  ...
  render() {
    return html`
      <div></div>
    `;
  }

  static styles = styles;
} // => <dds-my-component data-autoid="dds--my-component"></dds-my-component>
```

## Feature Flag

If this is a new component or enhancement, we would require that it is 
introduced into Carbon for IBM.com behind a feature flag. 

[You can read full details on how to create and implement a feature flag here](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/docs/feature-flags.md).

## Environment Variables

If introducing any new environment variables (e.g. feature flags), be sure to 
also update the `.env.example` file at the root of the Web Components package 
folder. The example should include a good description of what the environment 
variable does.

## Storybook

In storybook, we are looking for the following criteria:

- Blend of configurable knobs to multiple sub-stories that capture full
functionality and features. When it makes sense, break down to multiple stories
so that our automated visual regression tool ([Percy](https://percy.io)) can 
automatically capture in its snapshot suite rather than creating multiple 
knobs.
- Knob labels include the actual prop name in parenthesis
- README (`README.stories.mdx`) with clear instructions for any Carbon for 
IBM.com user to get started right away. This would include:
  * Which import(s) to include
  * How to implement in a sample application (multiple examples if 
    necessary)
  * Environment variable description and implementation details (if introducing 
    a new component)
  * Prop table
  * Stable Selectors table
  * Contributing snippet (imported from root docs)

## Unit Test Coverage

Our team looks to include a minimum of 80% unit test coverage. One of the 
features that we have included is automated snapshot testing, which will 
auto-generate snapshot tests based on existing storybook stories. 
While this gives automatic coverage right off the bat, additional unit tests
may be required to get over the 80% goal. All component level tests must live
in the component folder under a sub-folder `__tests__`. The file name structure
should be `my-component.test.js`. Be sure to include any mock data (if necessary)
in a `data` subfolder under `__tests__`. 

All commands below should be run at `packages/web-components` directory.

To view a coverage report (and run the test suite), you can run:

```bash
yarn test:unit
``` 

This will generate a `coverage` folder under the package level `tests` folder 
which includes what the current coverage amount is, and which line(s) are 
missing any coverage.

To update the snapshot file, run the following:

```bash
yarn test:unit:updateSnapshot
```

or the more directed command:

```bash
gulp test:unit --update-snapshot
```

To run a specific test spec:

```
> gulp test:unit -s src/components/link-with-icon/__tests__/link-with-icon.test.ts
```

To choose a specific browser (instead of Headless Chrome):

```
> gulp test:unit -b Firefox
```

You can keep the browser after the test (and re-run the test when files change) by:

```
> gulp test:unit -b Chrome -k
```

To disable the coverage instrumentation code from being generated:

```
> gulp test:unit -d
```

Above options can be used together. This is useful to debug your code as you test:

```
> gulp test:unit -s src/components/link-with-icon/__tests__/link-with-icon.test.ts -b Chrome -d -k
```

## Further Reading

- [Coding Conventions](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/docs/coding-conventions.md)
- [Submission Guidelines](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/docs/submission-guidelines.md)
