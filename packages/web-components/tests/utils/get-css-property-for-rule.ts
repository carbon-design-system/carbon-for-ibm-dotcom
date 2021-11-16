/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param rule Which elements to target.
 * @param prop Which properties to target.
 * @param sheets The CSS style sheets.
 * @returns the value of the css property from the rule.
 */
function getCssPropertyForRule(rule, prop, sheets) {
  const slen = sheets.length;
  for (let i = 0; i < slen; i++) {
    let rules;
    if (sheets[i].cssRules !== undefined) {
      rules = sheets[i].cssRules;
      const rlen = rules.length;
      for (let j = 0; j < rlen; j++) {
        if (rules[j].selectorText === rule) {
          return rules[j].style[prop];
        }
      }
    }
  }
  return false;
}

export default getCssPropertyForRule;
