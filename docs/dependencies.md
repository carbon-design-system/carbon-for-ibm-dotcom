# Installing dependencies

> Guidelines for how to install dependencies in this project

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Continuous Integration](#continuous-integration)
- [FAQ](#faq)
  - [How do I install a dependency?](#how-do-i-install-a-dependency)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

# Overview

This project uses Yarn to resolve and install dependencies from the package
registry. The exact version of every dependency, including transitive
dependencies, is recorded in the `yarn.lock` file, which is checked in to the
repository. Because the lockfile pins resolved versions, installs are
reproducible across local development and Continuous Integration.

# Continuous Integration

Our Continuous Integration environment runs `yarn install --immutable`. This
installs dependencies exactly as recorded in `yarn.lock` and fails if the
lockfile would need to be modified, which ensures that `package.json` and
`yarn.lock` stay in sync and that builds do not silently pick up unexpected
dependency changes.

# FAQ

## How do I install a dependency?

When installing a dependency, you can just do `yarn add <dependency-name>` as
normal. Make sure to commit the resulting changes to `package.json` and
`yarn.lock` so that Continuous Integration, which runs
`yarn install --immutable`, resolves the same dependency versions.
