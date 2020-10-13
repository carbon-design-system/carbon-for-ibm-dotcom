<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Feature Flags](#feature-flags)
  - [Overview](#overview)
  - [Creating a Feature Flag](#creating-a-feature-flag)
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
export const DDS_FEATURE_NAME: boolean = process.env.DDS_FLAGS_ALL === 'true' || false;
```

Then, add `DDS_FEATURE_NAME` to `.env.example` in the root of the package:

```text
# Feature Flags
DDS_FEATURE_NAME=<boolean flag to turn on or off feature xyz>
```

# Using Feature Flags

## Wrapping a Component with a Feature Flag
Once a flag is created, it can then be imported for use within a component.

For example:

```javascript
import { customElement, LitElement } from 'lit-element';
import { DDS_FEATURE_NAME } from '../../../internal/feature-flags';

/**
 * EXPERIMENTAL: My Feature
 *
 * @element dds-my-feature
 */
@customElement(`${ddsPrefix}-my-feature`)
class DDSMyFeature extends LitElement {
  ...
}

export default DDS_FEATURE_NAME ? null : DDSMyFeature;
```

## Wrapping Storybook Stories with Feature Flags

When rendering the Storybook instance, experimental features should not appear
unless the flag is enabled. Any storybook stories should be exported with the 
feature flag:

```javascript
import { number, select, text } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import readme from './README.stories.mdx';
import '../my-feature';
import { DDS_MY_FEATURE } from '../../../internal/feature-flags';

export const Default = !DDS_MY_FEATURE
  ? undefined
  : ({ parameters }) => {
      ...
    };

export default !DDS_MY_FEATURE
 ? undefined
 : {
     title: 'Components/My Feature',
     ...
   };
```

## Turning On/Off Feature Flags Locally

To enable a feature locally, follow the instructions on [environment variables](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/react/docs/environment-variables.md).

Replace the helper text with the value `true`. For example:

`.env`

```text
# Feature Flags
DDS_FEATURE_NAME=true
```

Once the flag is in place, storybook can be deployed and will honor the flag.
