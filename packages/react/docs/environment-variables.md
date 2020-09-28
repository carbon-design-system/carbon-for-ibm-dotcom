# Environment Variables

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Local Environment Variables](#local-environment-variables)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

Environment variables can be set for the React package in order to set various 
behavior within the application. This includes 
[feature flags](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/feature-flags.md) 
and other settings.

## Local Environment Variables
Environment variables can be set within the local package, which are picked up
by start-storybook. To use environment variables, create a file called `.env` at
the root of the react package folder, then copy and paste the contents of 
`.env.example` into the file.

Within `.env`, the values can then be set for the local environment:

`.env`

```text
REACT_STORYBOOK_SOURCEMAPS=true

# Feature Flags
FEATURE_NAME=true
```
