/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { state } from 'lit-element';
import { Constructor } from '../defs';

/**
 * @param Base The base class.
 * @returns A mix-in that sets its defined stable selector.
 */
const CspComplianceMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  class CspComplianceMixinImpl extends Base {
    editableStyle?: HTMLStyleElement;

    @state()
    nonce?;

    connectedCallback() {
      // TS seems to miss Element function definitions
      // @ts-ignore
      super.connectedCallback();

      // TS doesn't like custom window properties.
      // @ts-ignore
      const globalNonce = window.nonce;

      if (globalNonce) {
        this.nonce = globalNonce;
      }

      let editableStyle = document.querySelector(`head style.csp-compliance-styles`) as HTMLStyleElement;

      if (!editableStyle) {
        const newStyle = document.createElement('style');
        newStyle.classList.add('csp-compliance-styles');

        if (globalNonce) {
          newStyle.nonce = globalNonce;
        }

        document.head.appendChild(newStyle);
        editableStyle = newStyle;
      }

      this.editableStyle = editableStyle;
    }

    getStyleBySelector(selectorString, styleProperty) {
      const styleSheet = this.editableStyle?.sheet;

      if (!styleSheet) {
        throw new ReferenceError(`Editable stylesheet not found for "${this.constructor.name}"`);
      } else {
        const ruleset = (Array.from(styleSheet.cssRules) as CSSStyleRule[])
          .filter(rules => rules.selectorText === selectorString)
          .at(0);

        if (!ruleset) {
          throw new ReferenceError(`
            Selector text "${selectorString}" not found in stylesheet referenced by "${this.constructor.name}"
          `);
        } else {
          const rule = ruleset.style.getPropertyValue(styleProperty);

          if (!rule) {
            throw new ReferenceError(`
              Style "${styleProperty}" not found for selector "${selectorString}"
              in stylesheet referenced by "${this.constructor.name}"
            `);
          } else {
            return rule.trim();
          }
        }
      }
    }

    setStyleBySelector(selectorString, styleProperty, styleValue) {
      const styleSheet = this.editableStyle?.sheet;

      if (!styleSheet) {
        throw new ReferenceError(`Editable stylesheet not found for "${this.constructor.name}"`);
      } else {
        const ruleset = (Array.from(styleSheet.cssRules) as CSSStyleRule[])
          .filter(rules => rules.selectorText === selectorString)
          .at(0);

        if (!ruleset) {
          styleSheet.insertRule(`${selectorString} {
            ${styleProperty}:${styleValue}
          }`);
        } else {
          ruleset.style.setProperty(styleProperty, styleValue);
        }

        return [styleSheet, ruleset];
      }
    }
  }
  return CspComplianceMixinImpl;
};

export default CspComplianceMixin;
