<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Contributing to the IBM.com Library React package](#contributing-to-the-ibmcom-library-react-package)
  - [Overview](#overview)
  - [Packages](#packages)
  - [React DocGen](#react-docgen)
  - [Stable Selectors](#stable-selectors)
  - [Feature Flag](#feature-flag)
  - [Environment Variables](#environment-variables)
  - [Storybook](#storybook)
  - [Don't Forget To...](#dont-forget-to)
  - [Pull Requests](#pull-requests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Contributing to the IBM.com Library React package

> Guidelines for how to make a code contribution to the React package

## Overview

Thank you for your contribution to the IBM.com Library! Below are guidelines on
what some of the things we would be looking for as part of your contribution.

## Packages

We try to have any contributions to the library to live in their corresponding
package(s). The main packages to look out for when contributing a React 
component:

- **Styles**: ([@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/styles)) 
All styles should live in the styles package in the monorepo. This way, the
styles can be shared with any other framework package (e.g. web components). 
In addition, the way that web components utilize styles requires that there 
isn't a heavy amount of nesting happening in the `SCSS` code. 
- **Services**: ([@carbon/ibmdotcom-services](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/services))
If your component makes any API requests to a service that does not currently
exist yet in our Services package, you can add in a new ES6 service class in
this package. If you need to test across multiple packages, you can make use of
[yarn link](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/developing.md#developing-locally).
Be sure to properly export the class from the main `index.js`.
- **Utilities**: ([@carbon/ibmdotcom-utilities](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities))
Similar to ([Services](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/services)),
any abstract utilities can be added to the Utilities package as an ES6 class or
function. Be sure to properly export the class or function from the main 
`index.js`.

## React DocGen

It is important that the component includes full documentation using [React DocGen](https://github.com/reactjs/react-docgen)
standards. Be sure to fully define the `propTypes`, and provide any default 
values (under `defaultProps`) as well as all possible values for any props that
are looking for one of many values values (e.g. `PropTypes.oneOf`)

## Stable Selectors

Every component must include [stable selectors](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/stable-selectors.md) 
as part of the overall markup, identifying any key elements that would be useful
to have the ability to identify in a DOM search. At minimum, there should be at
least a container level stable selector defined, and all should use the `dds--`
prefix identified from the utilities package. For example:

```javascript
const { stablePrefix } = ddsSettings;

const MyComponent = () => {
  
  return (
    <div
      data-autoid={`${stablePrefix}--my-components`}
    >
    </div>
  );
};
```

## Feature Flag

If this is a new component or enhancement, we would require that it is 
introduced into the IBM.com Library behind a feature flag. 

[You can read full details on how to create and implement a feature flag here](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/feature-flags.md).

An example of creating a Storybook story that will be ignored if the feature
flag is disabled:

```javascript
import MyComponent from '../MyComponent';
import { DDS_MY_COMPONENT } from '../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.stories.mdx';

export default !DDS_MY_COMPONENT
  ? undefined
  : {
      title: 'Components|MyComponent',
      parameters: {
        ...readme.parameters,
        knobs: {
          MyComponent: ({ groupId }) => ({
            props: {
              prop1: text('Prop 1 (prop1):', 'Lorem Ipsum', groupId),
              prop2: text('Prop 2 (prop2):', 'Lorem Ipsum', groupId),
            },
          }),
        },
      },
    };
```

## Environment Variables

If introducing any new environment variables (e.g. feature flags), be sure to 
also update the `.env.example` file at the root of the React package folder. 
The example should include a good description of what the environment variable 
does.

## Storybook

In storybook, we are looking for the following criteria:

- Blend of configurable knobs to multiple sub-stories that capture full
functionality and features. When it makes sense, break down to multiple stories
so that our automated visual regression tool ([Percy](https://percy.io)) can 
automatically capture in its snapshot suite rather than creating multiple 
knobs.
- Knob labels include the actual prop name in parenthesis
- README (`README.stories.mdx`) with clear instructions for any IBM.com 
Library user to get started right away. This would include:
  * Which import(s) to include
  * How to implement in a sample React application (multiple examples if 
    necessary)
  * Environment variable description and implementation details (if introducing 
    a new component)
  * Prop table
  * Stable Selectors table
  * Contributing snippet (imported from root docs)

## Unit Test Coverage

Our team looks to include a minimum of 80% unit test coverage. One of the 
features that we have included in Storybook is [Storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots),
which will auto-generate snapshot tests based on existing storybook stories. 
While this gives automatic coverage right off the bat, additional unit tests
may be required to get over the 80% goal. All component level tests must live
in the component folder under a sub-folder `__tests__`. The file name structure
should be `MyComponent.test.js`. Be sure to include any mock data (if necessary)
in a `data` subfolder under `__tests__`. 

To view a coverage report (and run the test suite), you can run:

```bash
yarn test:unit
``` 

This will generage a `coverage` folder which includes what the current coverage
amount is, and which line(s) are missing any coverage.

To update the snapshot file, run the following:

```bash
yarn test:unit:updateSnapshot
```

## Don't Forget To...

<ul>
<li>Export any new components from the main `index.js`</li>
</ul>

Read more about our [submission guidelines](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/submission-guidelines.md).
