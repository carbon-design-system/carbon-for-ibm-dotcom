# Submission Guidelines
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Submission Guidelines](#submission-guidelines)
  - [Submitting an Issue](#submitting-an-issue)
  - [Submitting a Contribution](#submitting-a-contribution)
  - [When a Pull Request is opened](#when-a-pull-request-is-opened)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Submitting an Issue

Before you submit your issue, search the repository. Maybe your question was
already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues.

## Submitting a Contribution

- [Development guide](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/docs/developing.md)
- [Contributing to the React package](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/contributing-to-react.md)
- Details on contributions to the `Web Components` package coming soon!

## When a Pull Request is opened

When the pull request is opened, a number of CI checks, integration build 
checks, deploy previews, and automated visual regression will 
kick in. By default, `React` and `Web Components` will be built as deploy 
previews. If introducing a new component behind a feature flag, the label 
`feature flag` will need to be added to the pull request to also generate the 
`React (experimental)` features that are behind a feature flag.

## Graduating from behind a feature flag

After a pull request is submitted and becomes part of the code base, our team
would like to give the proper amount of time for testing the feature. This
includes user testing in addition to browser/device/functional testing. During
this testing phase, additional modifications or adjustments can be made with
additional pull requests.

Once the team evaluates and wishes to move the feature to the next step, 
additional documentation will be necessary in order to graduate the feature.

This includes the creation of:

- Visual specifications
- Functional specifications
- Finalization of code/documentation per above specifications
- Updates to the [IBM.com Library website](https://www.ibm/com/standards/web/ibm-dotcom-library)

The feature will also go through quality assurance with our design team as well
as functional QA team per [browser support scope](https://www.ibm.com/standards/web/browser-support):

- Visual QA
- Production / a11y QA

Our team will work with you [and your team] on any or all of the above steps in
order to have a successful transition to a production-ready feature. 
