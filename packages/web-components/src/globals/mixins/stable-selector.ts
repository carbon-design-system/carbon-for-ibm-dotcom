/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
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
    /**
     * The element that will be targeted for transposition
     *
     * @private
     */
    linkNode;

    /**
     * The string array element containing the alternate attributes to target
     *
     * @private
     */
    altAttributes;

    /**
     * Mutation observer to watch for attribute changes
     *
     * @private
     */
    _mutationObserver: MutationObserver | null = null;

    connectedCallback() {
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.connectedCallback();
      const { stableSelector } = this
        .constructor as typeof StableSelectorMixinImpl;
      if (stableSelector) {
        this.dataset.autoid = stableSelector;
      }

      this._cleanAndCreateMutationObserver({ create: true });
      window.requestAnimationFrame(() => {
        if (!this.linkNode) this.transposeAttributes();
      });
    }

    disconnectedCallback() {
      this._cleanAndCreateMutationObserver();
    }

    /**
     * Function to transpose any data-* attributes to the anchor tag in the shadow dom.
     *
     * @param linkNodeArg optional argument to pass in custom element to target instead of an anchor link
     * @param altAttributesArg optional argument to target additional attributes to transpose
     */
    transposeAttributes(linkNodeArg?, altAttributesArg?) {
      this.linkNode = linkNodeArg;
      this.altAttributes = altAttributesArg;
      if (!this.linkNode) {
        this.querySelectorAll('*').forEach((e) => {
          const anchor = e.shadowRoot?.querySelector('a');
          if (anchor) {
            this.linkNode = anchor;
          }
        });
      }
      this.linkNode = this.linkNode || this.shadowRoot?.querySelector('a');
      const scrapedAttributes = [].filter.call(
        this.attributes,
        (at) =>
          (/^data-/.test((at as any).name) &&
            (at as any).name !== 'data-autoid') ||
          (this.altAttributes && this.altAttributes.includes((at as any).name))
      );

      scrapedAttributes.forEach((e) => {
        if (this.linkNode) {
          this.linkNode?.setAttribute((e as any).name, (e as any).value);
        }
      });
    }

    /**
     * Cleans-up and creates the mutation observer.
     *
     * @param [options] The options.
     * @param [options.create] `true` to create the new mutation observer.
     */
    _cleanAndCreateMutationObserver({ create }: { create?: boolean } = {}) {
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
        this._mutationObserver = null;
      }

      if (create) {
        const element = this;
        this._mutationObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
              if (this.linkNode) {
                this.transposeAttributes(this.linkNode);
              }
            }
          });
        });
        this._mutationObserver?.observe(element, { attributes: true });
      }
    }

    /**
     * The stable selector for this component.
     */
    static stableSelector: string;
  }
  return StableSelectorMixinImpl;
};

export default StableSelectorMixin;
