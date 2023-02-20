/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, state, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import ParentVisibilityMixin from '../../component-mixins/parent-visibility/parent-visibility';

import styles from './cta-block.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The CTA BLOCK ITEM ROW component
 *
 * @element dds-cta-block-item-row
 * @slot .
 */
@customElement(`${ddsPrefix}-cta-block-item-row`)
class DDSCTABlockItemRow extends ParentVisibilityMixin(
  StableSelectorMixin(LitElement)
) {
  /** Defines if the bottom border is rendered */
  @property({ type: Boolean, reflect: true, attribute: 'no-border' })
  _noBorder = false;

  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItemHeadings: any[] = [];

  /**
   * Array to hold the text copy elements within child items.
   */
  private _childItemCopies: any[] = [];

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  public _onParentVisible() {
    this._setSameHeight();
  }

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
      this._observerResizeRoot = new ResizeObserver(this._setSameHeight);
      this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
    }
  }

  /**
   * The observer for the resize of the viewport, calls sameHeight utility function
   */
  private _setSameHeight = () => {
    window.requestAnimationFrame(() => {
      sameHeight(
        this._childItemHeadings.filter((e) => {
          return e;
        }),
        'md'
      );

      sameHeight(
        this._childItemCopies.filter((e) => {
          return e;
        }),
        'md'
      );
    });
  };

  /**
   * `true` if there are CTA action in the content item area.
   */
  @state()
  protected _hasAction = false;

  /**
   * Handles `slotchange` event, also sets height to all headings to the tallest one.
   *
   * @param event The event.
   */
  protected _handleSlotChange(event: Event) {
    const { target } = event;
    const { selectorItem, selectorItemHeading, selectorItemCopy } = this
      .constructor as typeof DDSCTABlockItemRow;

    const childItems = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) => (elem as HTMLElement).matches?.(selectorItem));

    if (childItems) {
      childItems.forEach((e) => {
        this._childItemHeadings.push(
          (e as HTMLElement).querySelector(selectorItemHeading)
        );
        this._childItemCopies.push(
          (e as HTMLElement).querySelector(selectorItemCopy)
        );
      });
    }

    this._setSameHeight();
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  connectedCallback() {
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

  /**
   * Checks if the no-border attribute has changed and applies the border class accordingly
   */
  updated(changedProperties) {
    if (changedProperties.has('_noBorder')) {
      this.classList.toggle(
        `${prefix}--cta-block-item-row__border`,
        !this._noBorder
      );
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-block-item-row`;
  }

  /**
   * A selector that will return the CTA Section item
   */
  static get selectorItem() {
    return `${ddsPrefix}-cta-block-item`;
  }

  /**
   * A selector that will return the CTA Section item's heading
   */
  static get selectorItemHeading() {
    return `${ddsPrefix}-content-item-heading`;
  }

  /**
   * A selector that will return the CTA Section item's copy
   */
  static get selectorItemCopy() {
    return `${ddsPrefix}-content-item-copy`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCTABlockItemRow;
