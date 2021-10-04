/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Constructor } from '../defs';

/**
 * @param Base The base class.
 * @returns A mix-in that sets its defined stable selector.
 */
const StableSelectorMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  class StableSelectorMixinImpl extends Base {
    connectedCallback() {
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.connectedCallback();
      const { stableSelector } = this.constructor as typeof StableSelectorMixinImpl;
      if (stableSelector) {
        this.dataset.autoid = stableSelector;
      }

      window.requestAnimationFrame(() => {
        this.transposeAttributes();
      });
    }

    /**
     * Function to transpose any data-* attributes to the anchor tag in the shadow dom.
     *
     * @param linkNodeArg optional argument to pass in custom element to target instead of an anchor link
     */
    transposeAttributes(linkNodeArg?) {
      let linkNode = linkNodeArg;
      if (!linkNode) {
        this.querySelectorAll('*').forEach(e => {
          const anchor = e.shadowRoot?.querySelector('a');
          if (anchor) {
            linkNode = anchor;
          }
        });
      }
      linkNode = linkNode || this.shadowRoot?.querySelector('a');
      const dataAttributes = [].filter.call(
        this.attributes,
        at => /^data-/.test((at as any).name) && (at as any).name !== 'data-autoid'
      );
      dataAttributes.forEach(e => {
        if (linkNode) {
          linkNode?.setAttribute((e as any).name, (e as any).value);
        }
      });
    }

    /**
     * The stable selector for this component.
     */
    static stableSelector: string;
  }
  return StableSelectorMixinImpl;
};

export default StableSelectorMixin;
