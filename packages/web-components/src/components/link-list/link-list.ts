/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { LINK_LIST_TYPE, LINK_LIST_ITEM_TYPE } from './defs';
import styles from './link-list.scss?lit';
import C4DLinkListItem from './link-list-item';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

export enum END_TYPE_LAYOUT {
  /**
   * Default layout | 1 - 3 items
   */
  DEFAULT = 'default',

  /**
   * Two Columns - Split layout | 4 - 6 items
   */
  TWO_COLUMNS = 'two-columns',

  /**
   * Tree Columns Layout | 7 + items
   */
  THREE_COLUMNS = 'three-columns',
}

/**
 * Link list.
 *
 * @element c4d-link-list
 * @slot heading - The heading content.
 * @csspart heading - The heading wrapper. Usage `c4d-link-list::part(heading)`
 * @csspart list - The list wrapper. Usage `c4d-link-list::part(list)`
 */
@customElement(`${c4dPrefix}-link-list`)
class C4DLinkList extends StableSelectorMixin(LitElement) {
  /**
   * Defines the layout for the end layout - based on END_TYPE_LAYOUT
   */
  @state()
  private _endTypeLayout = END_TYPE_LAYOUT.DEFAULT;

  /**
   * Child items
   */
  @state()
  private _childItems: Element[] = [];

  /**
   * Handler for @slotChange, toggles the split layout class and set the children link-list-item to the same height
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const { selectorItem } = this.constructor as typeof C4DLinkList;
    this._childItems = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element)?.matches(selectorItem)
      ) as Element[];

    if (this._childItems.length > 3) {
      if (this._childItems.length < 7) {
        this._endTypeLayout = END_TYPE_LAYOUT.TWO_COLUMNS;
      } else {
        this._endTypeLayout = END_TYPE_LAYOUT.THREE_COLUMNS;
      }
    } else {
      this._endTypeLayout = END_TYPE_LAYOUT.DEFAULT;
    }
    if (this.type === LINK_LIST_TYPE.END) {
      this._childItems.forEach((elem) => {
        (elem as C4DLinkListItem).type = LINK_LIST_ITEM_TYPE.END;
      });
    }
  }

  /**
   * The link list type.
   * possible values are:
   * default - Vertically stacked card-like links;
   * vertical - Vertically stacked inline links;
   * horizontal - Horizontaly stacked inline links;
   * end - End of section variant - Inline links stacked up to three columns based on the quantity of links;
   */
  @property({ reflect: true })
  type = LINK_LIST_TYPE.DEFAULT;

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    const { type, _endTypeLayout: endTypeLayout } = this;
    const headingClasses = classMap({
      [`${c4dPrefix}-ce--link-list__heading__wrapper`]: true,
      [`${c4dPrefix}-ce--link-list__heading--split`]:
        type === LINK_LIST_TYPE.END &&
        endTypeLayout === END_TYPE_LAYOUT.TWO_COLUMNS,
    });
    const listTypeClasses = {
      [LINK_LIST_TYPE.HORIZONTAL]: `${c4dPrefix}--link-list__list--horizontal`,
      [LINK_LIST_TYPE.VERTICAL]: `${c4dPrefix}--link-list__list--vertical`,
      [LINK_LIST_TYPE.END]: `${c4dPrefix}-ce--link-list__list--end`,
      [LINK_LIST_TYPE.DEFAULT]: `${c4dPrefix}--link-list__list`,
    }[type];
    const listClasses = classMap({
      // [`${c4dPrefix}--link-list__list`]: LINK_LIST_TYPE.DEFAULT,
      [listTypeClasses]: true,
      [`${c4dPrefix}-ce--link-list__list--split`]:
        type === LINK_LIST_TYPE.END &&
        endTypeLayout === END_TYPE_LAYOUT.TWO_COLUMNS,
      [`${c4dPrefix}-ce--link-list__list--three-columns`]:
        type === LINK_LIST_TYPE.END &&
        endTypeLayout === END_TYPE_LAYOUT.THREE_COLUMNS,
    });
    return html`
      <div class="${headingClasses}" part="heading">
        <slot name="heading"></slot>
      </div>
      <ul part="list" name="list" class="${listClasses}">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </ul>
    `;
  }

  updated() {
    if (
      this.type === LINK_LIST_TYPE.HORIZONTAL ||
      this.type === LINK_LIST_TYPE.VERTICAL
    ) {
      this._childItems.forEach((elem) => {
        (elem as C4DLinkListItem).iconInline = true;
      });
    }
  }

  /**
   * A selector selecting the child items.
   */
  static get selectorItem() {
    return `${c4dPrefix}-link-list-item, ${c4dPrefix}-link-list-item-cta`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--link-list`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLinkList;
