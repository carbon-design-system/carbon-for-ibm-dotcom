/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const shouldIssueBeIgnoredForRule = {};

export default function shouldIssueBeIgnored(issue, elem) {
  return (
    issue.value.every(item => item !== 'FAIL') ||
    [shouldIssueBeIgnoredForRule[issue.ruleId]].some(test =>
      typeof test === 'function' ? test(elem) : test
    )
  );
}
