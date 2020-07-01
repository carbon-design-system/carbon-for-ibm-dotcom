# Running a11y compliance tests

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Ignoring aChecker results](#ignoring-achecker-results)
- [Debugging aChecker results](#debugging-achecker-results)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

You can test your changes by running our test commands:

```sh
> gulp test:a11y
```

If you are very sure that your change affects a specific set of components, you can use `-s` option with a regular expression of the list of stories that should be tested, like:

```sh
> gulp test:a11y -s 'CTA\.stories\.js$'
```

You can run the test in a real browser with `-b` option along with other options to keep the test session (`-k`), like:

```sh
> gulp test:a11y -b Chrome -k
```

You can enable verbose output with `--verbose` option, like:

```sh
> gulp test:a11y --verbose
```

Above options can be used together, like:

```sh
> gulp test:a11y -s 'CTA\.stories\.js$' -b Chrome -k --verbose
```

## Ignoring aChecker results

The a11y test may report potential issues that should be handled in application-level, not in `ibm-dotcom-library` code. In such case, you can ignore those issues by adding an item to `shouldIssueBeIgnoredForRule` table in [tests/utils/global-ignore-achecker-issues.js](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/tests/utils/global-ignore-achecker-issues.js). The table is keyed by something like `Rpt_Aria_RegionLabel_Implicit ` which helps indentifying what aChecker rule to ignore. You can specify `true` to the value which ignores all violations of the rule, or a function which takes the DOM element violating the rule and returns `true` if such violation should be ignored:

```javascript
const shouldIssueBeIgnoredForRule = {
  // We are ignoring `Rpt_Aria_RegionLabel_Implicit` rule because (the reason).
  'Rpt_Aria_RegionLabel_Implicit': true,
  // We are ignoring `Rpt_Aria_ValidIdRef` rule if the element is `<div>` because (the reason).
  'Rpt_Aria_ValidIdRef': elem => elem.tagName === 'DIV',
};
```

## Debugging aChecker results

You can dig into why aChecker complains against your test case, by:

1. Search for the error message in [aChecker engine codebase](https://github.com/IBMa/equal-access/tree/master/accessibility-checker-engine). For example, if you got an error with `Rpt_Aria_RegionLabel_Implicit` rule ID, you can search for that in [aChecker engine codebase](https://github.com/IBMa/equal-access/tree/master/accessibility-checker-engine), which leads you to [here](https://github.com/IBMa/equal-access/search?q=Rpt_Aria_RegionLabel_Implicit&unscoped_q=Rpt_Aria_RegionLabel_Implicit).
2. One of the search result shows the rule implementation, like https://github.com/IBMa/equal-access/blob/3.0.3/accessibility-checker-engine/src/v2/checker/accessibility/rules/rpt-ariaLabeling-rules.ts#L22-L49. Analyze the code to see why it complains for your case.
3. If the logic shows your particular error is a false positive, report an issue at [aChecker engine codebase](https://github.com/IBMa/equal-access/issues). Otherwise, fix your code.
