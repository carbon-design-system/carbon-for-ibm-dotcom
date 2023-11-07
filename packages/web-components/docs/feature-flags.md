<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Feature Flags](#feature-flags)
  - [Overview](#overview)
  - [Creating a Feature Flag](#creating-a-feature-flag)
  - [Activating Feature Flag in Unit Tests](#activating-feature-flag-in-unit-tests)
- [Using Feature Flags](#using-feature-flags)
  - [Wrapping a Component with a Feature Flag](#wrapping-a-component-with-a-feature-flag)
  - [Wrapping Storybook Stories with Feature Flags](#wrapping-storybook-stories-with-feature-flags)
  - [Turning On/Off Feature Flags Locally](#turning-onoff-feature-flags-locally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Feature Flags

> Guidelines for how to create and use feature flags in the Web Components package

## Overview

Feature flags should be used when a particular feature is not ready for public
comsumption. This can pertain to proof of concepts, works in progress that will
not be ready for the next release, etc.

## Creating a Feature Flag

Within the file `/packages/web-components/src/globals/internal/feature-flags.ts`,
add a line with the following structure:

```javascript
export const C4D_FEATURE_NAME: boolean = process.env.C4D_FEATURE_NAME === 'true' || C4D_FLAGS_ALL || false;
```

Then, add `C4D_FEATURE_NAME` to `.env.example` in the root of the package:

```text
# Feature Flags
C4D_FEATURE_NAME=<boolean flag to turn on or off feature xyz>
```

## Activating Feature Flag in Unit Tests

In order for unit tests to pass, the feature flag needs to be activated in
the unit test configuration. To do this, in
`packages/web-components/tests/karma.conf.js`, add the following in
`DefinePlugin`:

```javascript
new webpack.DefinePlugin({
  'process.env.C4D_FEATURE_NAME': JSON.stringify('true'),
})
```

> NOTE: You may need to also add a `@ts-ignore` to your test as typescript
> checks will throw an error if a component may return `undefined`:

```javascript
import { Default } from '../__stories__/feature-name.stories';

const template = (props?) =>
  // @ts-ignore: Behind feature flag
  Default({
    parameters: {
      props: {
        'c4d-feature-name': props,
      },
    },
  });
```

# Using Feature Flags

## Wrapping a Component with a Feature Flag
Once a flag is created, it can then be imported for use within a component.

For example:

```javascript
import { LitElement } from 'lit';
import { C4D_FEATURE_NAME } from '../../globals/internal/feature-flags';
import c4dSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
const { stablePrefix: c4dPrefix } = ddsSettings;

/**
 * EXPERIMENTAL: My Feature
 *
 * @element c4d-my-feature
 */
class C4DMyFeature extends LitElement {
  ...
}
// Define the new element
if (C4D_FEATURE_NAME) {
  customElements.define(`${c4dPrefix}-callout-data`, C4DMyFeature);
}

export default !C4D_FEATURE_NAME ? undefined : C4DMyFeature;
```

## Wrapping Storybook Stories with Feature Flags

When rendering the Storybook instance, experimental features should not appear
unless the flag is enabled. Any storybook stories should be exported with the
feature flag:

```javascript
import { number, select, text } from '@storybook/addon-knobs';
import { html } from 'lit';
import readme from './README.stories.mdx';
import '../my-feature';
import { C4D_MY_FEATURE } from '../../../internal/feature-flags';

export const Default = !C4D_MY_FEATURE
  ? undefined
  : args => {
      ...
    };

export default !C4D_MY_FEATURE
 ? undefined
 : {
     title: 'Components/My feature',
     ...
   };
```

## Turning On/Off Feature Flags Locally

To enable a feature locally, follow the below instructions: 

Replace the helper text with the value `true`. For example:

`.env`

```text
# Feature Flags
C4D_FEATURE_NAME=true
```

Once the flag is in place, storybook can be deployed and will honor the flag.
