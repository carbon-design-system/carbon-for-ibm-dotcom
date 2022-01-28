/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement, property, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import { baseFontSize, breakpoints } from '@carbon/layout';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './content-section.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const breakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * The Content Section component for use with cardSection
 *
 * @element dds-content-section
 * @slot heading - Section heading
 */
@customElement(`${ddsPrefix}-content-section`)
class DDSContentSection extends StableSelectorMixin(LitElement) {
  /**
   * An optional custom class for children.
   */
  @property({ attribute: 'children-custom-class', reflect: true })
  childrenCustomClass = '';

  /**
   * The default slot.
   */
  @query('slot:not([name])')
  private _slotNode?: HTMLSlotElement;

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * Cleans-up and creats the resize observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    if (this._observerResizeRoot) {
      this._observerResizeRoot.disconnect();
      this._observerResizeRoot = null;
    }
    if (create) {
      // TODO: Wait for `.d.ts` update to support `ResizeObserver`
      // @ts-ignore
      this._observerResizeRoot = new ResizeObserver(this._resizeHandler);
      this._observerResizeRoot.observe(this);
    }
  }

  /**
   * Handles `slotchange` event.
   */
  protected _handleChildrenSlotChange() {
    this._resizeHandler();
  }

  /**
   * The observer for the resize of the viewport
   */
  private _resizeHandler = () => {
    window.requestAnimationFrame(() => {
      // gets first child element
      const firstElem = this._slotNode!.assignedNodes().filter(
        node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      )[0];
      const contentSection = this.shadowRoot!.querySelector('.bx--content-section') as HTMLElement;
      const contentSectionLeading = this.shadowRoot!.querySelector('.bx--content-section__leading') as HTMLElement;

      const topPadding = firstElem
        ? parseInt(window.getComputedStyle(firstElem as HTMLElement, null).getPropertyValue('padding-top'), 10)
        : 0;
      const topMargin = firstElem
        ? parseInt(window.getComputedStyle(firstElem as HTMLElement, null).getPropertyValue('margin-top'), 10)
        : 0;

      // keeps styles for card-section-images, card-section-simple, and link-list-section
      if (contentSection && contentSectionLeading) {
        if (firstElem && topPadding === 0 && topMargin === 0) {
          contentSection.style.paddingTop = '3rem';
          contentSection.style.paddingBottom = '4rem';
          contentSectionLeading.style.marginTop = '';
          contentSectionLeading.style.marginBottom = '';
        } else if (window.innerWidth > breakpoint) {
          if (!firstElem) {
            contentSection.style.paddingTop = '1rem';
            contentSectionLeading.style.marginTop = '';
            contentSectionLeading.style.marginBottom = '';
          } else {
            contentSectionLeading.style.marginTop = `${topPadding || topMargin}px`;
            contentSectionLeading.style.marginBottom = '';
            contentSection.style.paddingTop = '';
          }
        } else if (!firstElem) {
          contentSection.style.paddingTop = '1rem';
          contentSectionLeading.style.marginBottom = '';
          contentSectionLeading.style.marginTop = '';
        } else {
          contentSectionLeading.style.marginBottom = `-${topPadding || topMargin}px`;
          contentSectionLeading.style.marginTop = '1rem';
          contentSection.style.marginTop = '';
        }
      }
    });
  };

  /**
   * Applies section attribute
   */
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
    }
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverResize();
    super.disconnectedCallback();
  }

  firstUpdated() {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
  }

  updated() {
    this._resizeHandler();
  }

  render() {
    return html`
      <div class="${prefix}--content-section ${prefix}--content-section-layout">
        <div class="${prefix}--content-section__leading">
          <slot name="heading"></slot>
          <slot name="copy"></slot>
          <slot name="footer"></slot>
        </div>
        <div class="${prefix}--content-section__body ${this.childrenCustomClass}">
          <slot @slotchange="${this._handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-section`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentSection;
