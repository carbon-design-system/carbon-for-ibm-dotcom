/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, query, state, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { Constructor } from '../defs';

/**
 * Used to create, render, and manage dynamic, CSP-safe stylesheets.
 *
 * @param Base The base class.
 * @returns A mix-in that sets its defined stable selector.
 */
const CspComplianceMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class CspComplianceMixinImpl extends Base {
    /**
     * Reference to the dynamic <style> node
     */
    @query('style.dynamic-styles')
    _dynamicStylesNode;

    /**
     * Reference to the nonce key for this HTTP request
     */
    @state()
    _nonce?;

    connectedCallback() {
      // TS seems to miss Element function definitions
      // @ts-ignore
      super.connectedCallback();

      // TS doesn't like custom window properties.
      // @ts-ignore
      const globalNonce = window.nonce;

      if (globalNonce) {
        this._nonce = globalNonce;
      }
    }

    /**
     * @returns {TemplateResult} rendered markup of dynamic <style> node
     */
    _renderDynamicStyles() {
      const { _nonce: nonce } = this;

      return html`
        <style class="dynamic-styles" nonce="${ifDefined(nonce)}"></style>
      `;
    }

    /**
     * Components using this mixin should place their shadowRoot HTML in this function.
     */
    abstract renderContents(): TemplateResult | void;

    /**
     * @returns {TemplateResult} rendered component markup with dynamic stylesheet
     */
    render() {
      return html`
        ${this._renderDynamicStyles()}${this.renderContents()}
      `;
    }

    /**
     * Get values of the dynamic style sheet for a given selector/property combination.
     *
     * @param {string} selectorString The selector we want the property for
     * @param {string} styleProperty The property we want the style value for
     * @returns {string} the style value requested
     */
    getStyleBySelector(selectorString, styleProperty) {
      const styleSheet = this._dynamicStylesNode?.sheet;

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

    /**
     * Sets a CSS property/value pair for the given selector.
     *
     * @param selectorString The selector to style
     * @param styleProperty The property to style (camelCased CSSOM keys)
     * @param styleValue The value of the style
     */
    setStyleBySelector(selectorString, styleProperty, styleValue) {
      const styleSheet = this._dynamicStylesNode?.sheet;

      if (!styleSheet) {
        throw new ReferenceError(`Editable stylesheet not found for "${this.constructor.name}"`);
      } else {
        const ruleset = (Array.from(styleSheet.cssRules) as CSSStyleRule[])
          .filter(rules => rules.selectorText === selectorString)
          .at(0);

        if (!ruleset) {
          styleSheet.insertRule(`${selectorString}{${styleProperty}:${styleValue}}`);
        } else {
          ruleset.style.setProperty(styleProperty, styleValue);
        }
      }
    }
  }
  return CspComplianceMixinImpl;
};

export default CspComplianceMixin;
