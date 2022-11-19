/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, TemplateResult } from 'lit-html';
import { Constructor } from '../defs';

/**
 * @param elem The starting element.
 * @param selector The CSS selector.
 * @returns {Element}
 *   The closest ancestor node of the given element that matches the given selector, crossing Shadow DOM boundary.
 */
const closestComposed = (elem: Element, selector: string) => {
  const found = elem.closest(selector);
  if (found) {
    return found;
  }
  const { host } = elem.getRootNode() as ShadowRoot;
  if (host) {
    return closestComposed(host, selector);
  }
  return null;
};

/**
 * @param Base The base class.
 * @returns A mix-in that allows rendering modal, that should typically be rendered to a DOM node outside the component.
 */
const ModalRenderMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class ModalRenderMixinImpl extends Base {
    /**
     * `true` if this component is disconnected from render tree after creation.
     *
     * @private
     */
    _disconnectedAfterCreation = false; // Not using TypeScript `private` due to: microsoft/TypeScript#17744

    /**
     * Creates and renders the modal
     *
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _createAndRenderModal() {
      if (!this.modalRenderRoot) {
        this.modalRenderRoot = this.createModalRenderRoot();
      }
      const { modalRenderRoot } = this;
      if (modalRenderRoot) {
        render(this.renderModal(), modalRenderRoot);
      }
    }

    /**
     * @returns The template of the modal.
     */
    abstract renderModal(): TemplateResult | void;

    /**
     * The render target of the modal.
     */
    modalRenderRoot: Element | null | void = null;

    /**
     * The DOM element to put the modal into.
     */
    get container() {
      const { selectorContainer } = this.constructor as typeof ModalRenderMixinImpl;
      return closestComposed(this, selectorContainer) || this.ownerDocument!.body;
    }

    /**
     * @returns The render root of the modal.
     */
    createModalRenderRoot(): Element | null | void {
      const { container, ownerDocument: doc } = this;
      const div = doc!.createElement('div');
      div.style.display = 'contents'; // Prevents render-root `<div>` from being rendered
      container.appendChild(div);
      return div;
    }

    connectedCallback() {
      // TODO: Figure out how to inherit `LitElement` for this mix-in class
      // @ts-ignore
      super.connectedCallback();
      if (this._disconnectedAfterCreation) {
        this._disconnectedAfterCreation = false;
        this._createAndRenderModal();
      }
    }

    disconnectedCallback() {
      if (this.modalRenderRoot) {
        this.modalRenderRoot.remove();
        this.modalRenderRoot = null;
      }
      // TODO: Figure out how to inherit `LitElement` for this mix-in class
      // @ts-ignore
      super.disconnectedCallback();
      this._disconnectedAfterCreation = true;
    }

    update(changedProperties) {
      // TODO: Figure out how to inherit `LitElement` for this mix-in class
      // @ts-ignore
      super.update(changedProperties);
      if (!this._disconnectedAfterCreation) {
        this._createAndRenderModal();
      }
    }

    /**
     * The CSS selector to find the element to put the modal in.
     */
    static get selectorContainer() {
      return '[data-modal-container]';
    }
  }
  return ModalRenderMixinImpl;
};

export default ModalRenderMixin;
