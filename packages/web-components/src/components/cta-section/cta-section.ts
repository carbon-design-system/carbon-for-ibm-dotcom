/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, internalProperty, query, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { baseFontSize, breakpoints } from '@carbon/layout';

import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './cta-section.scss';
import DDSContentItem from '../content-item/content-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  contentItems: '_hasContentItems',
  linkList: '_hasLinkList',
};

/**
 * The CTA Section pattern
 *
 * @element dds-cta-section
 * @slot heading - The text heading.
 * @slot buttons - The CTA Buttons.
 */
@customElement(`${ddsPrefix}-cta-section`)
class DDSCTASection extends StableSelectorMixin(DDSContentItem) {
  /**
   * Content Item slot node
   */
  @query(`.${prefix}--content-item-wrapper`)
  private _contentsNode?: HTMLElement;

  /**
   * Content Item slot node
   */
  @query(`slot[name='content-item']`)
  private _slotNode?: HTMLSlotElement;

  /**
   * `true` if there is CTA content.
   */
  @internalProperty()
  protected _hasFooter = false;

  /**
   * The observer for the resize of the content item slot
   */
  private _observerResizeContainer: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * Cleans-up and creats the resize observer for cta-section
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    const { _slotNode: slotNode } = this;

    if (slotNode?.assignedNodes().length) {
      if (this._observerResizeContainer) {
        this._observerResizeContainer.disconnect();
        this._observerResizeContainer = null;
      }

      if (create) {
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeContainer = new ResizeObserver(this._observeResizeContainer);
        this._observerResizeContainer.observe(this._contentsNode);
      }
    }
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasFooter'] = hasContent;

    this._cleanAndCreateObserverResize({ create: true });
  }

  /**
   * The observer for the resize of the content item slot
   */
  private _observeResizeContainer = () => {
    const { _slotNode: slotNode } = this;

    const { selectorCopy } = this.constructor as typeof DDSCTASection;
    const copyNodes = slotNode?.assignedNodes().reduce((acc, node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        acc.push(...(node as Element).querySelectorAll(selectorCopy));
      }
      return acc;
    }, [] as any);

    copyNodes?.forEach(entry => {
      entry.style.height = 'auto';
    });

    const maxHeight = Math.max(
      ...copyNodes!.map(o => {
        return o.clientHeight;
      })
    );

    if (window.innerWidth >= parseFloat(breakpoints.md.width) * baseFontSize) {
      copyNodes?.forEach(entry => {
        entry.style.height = `${maxHeight}px`;
      });
    }
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
    this._cleanAndCreateObserverResize({ create: true });
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter } = this;
    return html`
      <slot name="link-list"></slot>
      <div ?hidden="${!hasFooter}" class="${prefix}--helper-wrapper">
        <div class="${prefix}--content-item-wrapper">
          <slot name="content-item" @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      ${super.render()} ${this._renderFooter()}
    `;
  }

  /**
   * The selector that determines where to harvest the content items from.
   */
  static selectorCopy = 'dds-cta-section-item-copy';

  static get stableSelector() {
    return `${ddsPrefix}--cta-section`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCTASection;
