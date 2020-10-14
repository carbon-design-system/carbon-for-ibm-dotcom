<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Feature Flags](#feature-flags)
- [Overview](#overview)
- [Creating a Feature Flag](#creating-a-feature-flag)
- [Using Feature Flags](#using-feature-flags)
- [Turning On/Off Feature Flags Locally](#turning-onoff-feature-flags-locally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Feature Flags

> Guidelines for how to create and use feature flags in the React package

# Overview

Feature flags should be used when a particular feature is not ready for public
comsumption. This can pertain to proof of concepts, works in progress that will
not be ready for the next release, etc.

# Creating a Feature Flag

Within the file `FeatureFlags.js`, add a line with the following structure:

```javascript
export const aFeatureFlag = process.env.FEATURE_NAME === 'true' || false;
```

Then, add `FEATURE_NAME` to `.env.example` in the root of the package:

```text
# Feature Flags
FEATURE_NAME=<boolean flag to turn on or off feature xyz>
```

# Using Feature Flags

Once a flag is created, it can then be imported for use within a component.

For example:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { aFeatureFlag } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';

/**
 * EXPERIMENTAL: Renders Lorem ipsum component
 *
 * @returns {*} The rendered component
 * @private
 * @class
 */
const FeatureName = () => featureFlag(aFeatureFlag, <div>Lorem Ipsum</div>);

export default FeatureName;
```

The feature can also be selectively injected into another component using the
feature flag:

```javascript
import React from 'react';
import { aFeatureFlag } from '../../internal/FeatureFlags.js';
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
        {featureFlag(aFeatureFlag, <FeatureName />)}
      </div>
    );
  }
}

export default MyComponent;
```

# Turning On/Off Feature Flags Locally

To enable a feature locally, follow the instructions on [environment variables](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/react/docs/environment-variables.md).

Replace the helper text with the value `true`. For example:

`.env`

```text
# Feature Flags
FEATURE_NAME=true
```

Once the flag is in place, storybook can be deployed and will honor the flag.
