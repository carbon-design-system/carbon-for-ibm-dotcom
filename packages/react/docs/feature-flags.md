<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Feature Flags](#feature-flags)
  - [Overview](#overview)
  - [Creating a Feature Flag](#creating-a-feature-flag)
  - [Wrapping Storybook Stories with Feature Flags](#wrapping-storybook-stories-with-feature-flags)
- [Using Feature Flags](#using-feature-flags)
  - [Turning On/Off Feature Flags Locally](#turning-onoff-feature-flags-locally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Feature Flags

> Guidelines for how to create and use feature flags in the React package

## Overview

Feature flags should be used when a particular feature is not ready for public
comsumption. This can pertain to proof of concepts, works in progress that will
not be ready for the next release, etc.

## Creating a Feature Flag

Within the file `FeatureFlags.js`, add a line with the following structure:

```javascript
export const DDS_FEATURE_NAME = process.env.DDS_FEATURE_NAME === 'true' || DDS_FLAGS_ALL || false;
```

Then, add `DDS_FEATURE_NAME` to `.env.example` in the root of the package:

```text
# Feature Flags
DDS_FEATURE_NAME=<boolean flag to turn on or off feature xyz>
```

## Wrapping Storybook Stories with Feature Flags

When rendering the Storybook instance, experimental features should not appear
unless the flag is enabled. Any storybook stories should be exported with the 
feature flag:

```javascript
import MyFeature from '../MyFeature';
import { DDS_MY_FEATURE } from '../../../internal/FeatureFlags';
import React from 'react';

export default !DDS_MY_FEATURE
  ? undefined
  : {
      title: 'Components|My feature',
      parameters: {
        ...
      },
    };

export const Default = !DDS_MY_FEATURE
  ? undefined
  : ({ parameters }) => {
      ...
    };
```

# Using Feature Flags

Once a flag is created, it can then be imported for use within a component.

For example:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { DDS_FEATURE_NAME } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';

/**
 * EXPERIMENTAL: Renders Lorem ipsum component
 *
 * @returns {*} The rendered component
 * @private
 * @class
 */
const FeatureName = () => featureFlag(DDS_FEATURE_NAME, <div>Lorem Ipsum</div>);

export default FeatureName;
```

The feature can also be selectively injected into another component using the
feature flag:

```javascript
import React from 'react';
import { DDS_FEATURE_NAME } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import FeatureName from './FeatureName';

/** Footer component */
class MyComponent extends React.Component {
  /**
   * Renders my component
   *
   * @returns {object} JSX object
   */
  render() {
    return (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        {featureFlag(DDS_FEATURE_NAME, <FeatureName />)}
      </div>
    );
  }
}

export default MyComponent;
```

## Turning On/Off Feature Flags Locally

To enable a feature locally, follow the instructions on 
[environment variables](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/react/docs/environment-variables.md).

Replace the helper text with the value `true`. For example:

`.env`

```text
# Feature Flags
DDS_FEATURE_NAME=true
```

Once the flag is in place, storybook can be deployed and will honor the flag.
