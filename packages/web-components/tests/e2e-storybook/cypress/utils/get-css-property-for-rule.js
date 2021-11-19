/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function getCssPropertyForRule(rule, prop, sheets) {
  const slen = sheets.length;
  for (let i = 0; i < slen; i++) {
    let rules;
    try {
      rules = sheets[i].cssRules;
    } catch (e) {
      continue;
    }
    const rlen = rules.length;
    for (let j = 0; j < rlen; j++) {
      if (rules[j].selectorText === rule) {
        return rules[j].style[prop];
      }
    }
  }
}
