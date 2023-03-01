/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import shouldIssueBeIgnoredGlobal from './global-ignore-achecker-issues';

const currentSpec = [];

jasmine.getEnv().addReporter({
  suiteStarted({ description }) {
    currentSpec.push(description);
  },
  specStarted({ description }) {
    currentSpec.push(description);
  },
  specDone() {
    currentSpec.pop();
  },
  suiteDone() {
    currentSpec.pop();
  },
});

/**
 * @callback shouldIssueBeIgnoredCallback
 * @param {object} issue An issue report from aChecker.
 * @param {Node} elem The DOM node the aChecker issue report is reported on.
 * @returns {boolean} `true` if the aChecker issue report should be ignored.
 */

beforeEach(function () {
  jasmine.addAsyncMatchers({
    toBeACheckerCompliant() {
      return {
        /**
         * @param {HTMLElement} actualElem The DOM element to test the a11y compliance with.
         * @param {object} [options={}] The options.
         * @param {shouldIssueBeIgnoredCallback} [options.shouldIssueBeIgnored]
         *   A function that checks if an aChecker issue report should be ignored.
         * @returns {object}
         *   `{ pass: true }` if the given DOM element's content passes a11y compliance tests.
         *   `{ pass: false, message: 'The message' }` otherwise.
         */
        async compare(actualElem, options = {}) {
          const doc = actualElem.ownerDocument;
          const filterFuncs = [];
          const { shouldIssueBeIgnored } = options;
          if (typeof shouldIssueBeIgnored === 'function') {
            filterFuncs.push(shouldIssueBeIgnored);
          }
          filterFuncs.push(shouldIssueBeIgnoredGlobal);
          const results = await aChecker.getComplianceHelper(
            actualElem,
            currentSpec.join(' - ')
          );
          if (!results?.report?.results) {
            throw (
              results?.details ||
              new Error('a11y test result is not available for unknown reason.')
            );
          }
          const code = aChecker.assertCompliance(results.report);
          if (code !== 0) {
            const issues = results.report.results.filter(
              filterFuncs.length === 0
                ? () => true
                : (issue) => {
                    const elem =
                      doc &&
                      doc
                        .evaluate(
                          // TODO: See why there seem to be two `<html>`s
                          issue.path.dom.replace('/html[2]', '/html[1]'),
                          doc,
                          null,
                          XPathResult.ANY_TYPE,
                          null
                        )
                        .iterateNext();
                    return !filterFuncs.some((filterFunc) =>
                      filterFunc(issue, elem)
                    );
                  }
            );
            if (issues.length > 0) {
              if (process.env.AAT_VERBOSE) {
                console.error(
                  'a11y compliance issues:',
                  issues.map((issue) => {
                    const elem =
                      doc &&
                      doc
                        .evaluate(
                          // TODO: See why there seem to be two `<html>`s
                          issue.path.dom.replace('/html[2]', '/html[1]'),
                          doc,
                          null,
                          XPathResult.ANY_TYPE,
                          null
                        )
                        .iterateNext();
                    return {
                      ...issue,
                      elem,
                    };
                  })
                );
              }
              const messages = issues.map(
                ({ ruleId, reasonId, message, path, snippet }) =>
                  [
                    message,
                    `  Rule ID: ${ruleId}`,
                    `  Failure reason ID: ${reasonId}`,
                    `  XPath: ${path.dom}`,
                    `  Markup snippet: ${snippet}`,
                  ].join('\n')
              );
              return {
                pass: false,
                message: `\n${messages.join('\n')}`,
              };
            }
          }
          return {
            pass: true,
          };
        },
      };
    },
  });
});
