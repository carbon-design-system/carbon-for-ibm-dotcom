/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, TemplateResult } from 'lit-html';

/**
 * @param Base The base class.
 * @returns A mix-in that allows rendering both Shadow DOM and light DOM.
 */
const HybridRenderMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class HybridRenderMixinImpl extends Base {
    /**
     * @returns The template to be render into the light DOM.
     */
    abstract renderLightDOM(): TemplateResult | void;

    /**
     * The render target in the light DOM.
     */
    lightRenderRoot: Element | null | void = null;

    /**
     * @returns The render root of the light DOM.
     */
    createLightRenderRoot(): Element | null | void {
      return this;
    }

    update(changedProperties) {
      // TODO: Figure out how to inherit `LitElement` for this mix-in class
      // @ts-ignore
      super.update(changedProperties);
      if (!this.lightRenderRoot) {
        this.lightRenderRoot = this.createLightRenderRoot();
      }
      const { lightRenderRoot } = this;
      if (lightRenderRoot) {
        render(this.renderLightDOM(), lightRenderRoot);
      }
    }
  }
  return HybridRenderMixinImpl;
};

export default HybridRenderMixin;
