/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import { html, state, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import { GRID_MODE } from './defs';
import styles from './card-group.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

export { GRID_MODE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const gridLgBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;
const gridMdBreakpoint = parseFloat(breakpoints.md.width) * baseFontSize;

// tag constants used for same height calculations
const headingBottomMargin = 64;

/**
 * Card Group.
 *
 * @element dds-card-group
 */
@customElement(`${ddsPrefix}-card-group`)
class DDSCardGroup extends StableSelectorMixin(LitElement) {
  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItems: any[] = [];

  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItemHeadings: any[] = [];

  /**
   * Array to hold the card-eyebrow elements within child items.
   */
  private _childItemEyebrows: any[] = [];

  /**
   * Array to hold the tag-group elements within child items.
   */
  private _childItemTagGroup: any[] = [];

  /**
   * Array to hold the paragraph elements within child items.
   */
  private _childItemParagraphs: any[] = [];

  /**
   * Array to hold the card-cta-footer elements within child items.
   */
  private _childItemFooters: any[] = [];

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
      this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
    }
  }

  /**
   * Handler for @slotchange, set the height of all headings to the tallest height.
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    this._childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter(elem => (elem as HTMLElement).matches?.((this.constructor as typeof DDSCardGroup).selectorItem));

    // retrieve item heading, eyebrows, and footers to set same height
    if (this._childItems) {
      this._childItems.forEach(e => {
        this._childItemEyebrows.push(
          (e as HTMLElement).querySelector((this.constructor as typeof DDSCardGroup).selectorItemEyebrow)
        );
        this._childItemParagraphs.push(
          (e as HTMLElement).querySelector((this.constructor as typeof DDSCardGroup).selectorItemParagraph)
        );
        this._childItemTagGroup.push(
          (e as HTMLElement).querySelector((this.constructor as typeof DDSCardGroup).selectorItemTagGroup)
        );
        this._childItemHeadings.push(
          (e as HTMLElement).querySelector((this.constructor as typeof DDSCardGroup).selectorItemHeading)
        );
        this._childItemFooters.push(
          (e as HTMLElement).querySelector((this.constructor as typeof DDSCardGroup).selectorItemFooter)
        );
        e.toggleAttribute('border', this.gridMode === 'border');
      });

      const { customPropertyCardsPerRow } = this.constructor as typeof DDSCardGroup;
      this.style.setProperty(customPropertyCardsPerRow, String(this.cardsPerRow));

      if (this.gridMode !== GRID_MODE.NARROW) {
        this._resizeHandler();
      }
    }
  }

  /**
   * The observer for the resize of the viewport, calls sameHeight utility function
   */
  private _resizeHandler = () => {
    window.requestAnimationFrame(() => {
      const documentWidth = this.ownerDocument!.documentElement.clientWidth;
      let columnCount;
      switch (true) {
        case documentWidth < gridMdBreakpoint:
          columnCount = 1;
          break;
        case documentWidth < gridLgBreakpoint:
          columnCount = 2;
          break;
        default:
          columnCount = this.cardsPerRow;
      }
      if (!this.pictograms) {
        this._setSameHeight();
      }
      if (this.gridMode !== GRID_MODE.NARROW) {
        this._fillLastRowWithEmptyCards(columnCount);
        this._borderAdjustments(columnCount);
      } else {
        this._removeEmptyCards();
        this._resetBorders();
      }
    });
  };

  private _setSameHeight = () => {
    // check if items are not null before using sameHeight

    sameHeight(
      this._childItemEyebrows.filter(item => item !== null),
      'md'
    );
    sameHeight(
      this._childItemHeadings.filter(item => item !== null),
      'md'
    );
    sameHeight(
      this._childItemParagraphs.filter(item => item !== null),
      'md'
    );
    sameHeight(
      this._childItemFooters.filter(item => item !== null),
      'md'
    );

    let tagGroupHeight: number = 0;

    // get tallest height of tag groups
    this._childItemTagGroup.forEach(item => {
      if (item) {
        const groupHeight = (item as HTMLElement).offsetHeight;
        if (groupHeight > tagGroupHeight) {
          tagGroupHeight = groupHeight;
        }
      }
    });

    this._childItemHeadings.forEach(e => {
      // add tag group height to heading to the cards lacking tag group
      if (e && !e.nextElementSibling?.matches((this.constructor as typeof DDSCardGroup).selectorItemTagGroup)) {
        e.style.marginBottom = `${tagGroupHeight + headingBottomMargin}px`;
      }
    });
  };

  private _borderAdjustments = columnCount => {
    const isEmpty = element => element.hasAttribute('empty');
    const inFirstColumn = index => (index + 1) % columnCount === 1;
    const inLastColumn = index => (index + 1) % columnCount === 0;
    const inFirstRow = index => index < columnCount;
    const inLastRow = index => Math.floor(index / columnCount) === Math.floor((this._childItems.length - 1) / columnCount);

    this._childItems.forEach((e, index) => {
      const { gridMode } = this;
      if (gridMode === GRID_MODE.COLLAPSED) {
        e.toggleAttribute('border', false);
        if (isEmpty(e)) {
          e.style.paddingBottom = '0';
          e.style.paddingRight = '0';
        } else {
          if (inFirstColumn(index)) {
            e.style.paddingLeft = '0';
          }
          if (inLastColumn(index)) {
            e.style.paddingRight = '0';
            e.style.borderRight = `1px solid var(--cds-ui-background)`;
          } else {
            e.style.paddingRight = '1px';
            e.style.borderRight = 'none';
          }
          if (inFirstRow(index)) {
            e.style.paddingTop = '0';
          }
          if (inLastRow(index)) {
            e.style.paddingBottom = '0';
          } else {
            e.style.paddingBottom = '1px';
          }
        }
      }
      if (gridMode === GRID_MODE.BORDER) {
        e.toggleAttribute('border', true);
        if (isEmpty(e)) {
          e.style.paddingBottom = '1px';
          e.style.paddingRight = '1px';
        } else {
          e.style.paddingTop = '0';
          if (inFirstRow(index)) {
            e.style.paddingTop = '1px';
          }
          if (inLastRow(index)) {
            e.style.paddingBottom = '1px';
          }
          if (inFirstColumn(index)) {
            e.style.paddingLeft = '1px';
          } else {
            e.style.paddingLeft = '0';
          }
          if (inLastColumn(index)) {
            e.style.paddingRight = '1px';
          }
        }
        // if one column and first item is empty then set top border for second item
        if (columnCount === 1 && isEmpty(this._childItems[0]) && index === 1) {
          e.style.paddingTop = '1px';
        }
      }
    });
  };

  private _resetBorders = () => {
    this._childItems.forEach(elem => {
      elem.toggleAttribute('border', false);
      elem.style.paddingTop = '';
      elem.style.paddingRight = '';
      elem.style.paddingBottom = '';
      elem.style.paddingLeft = '';
    });
  };

  private _fillLastRowWithEmptyCards = columnCount => {
    // remove all empty cards
    this._removeEmptyCards();

    // add empty cards
    const emptyNeeded =
      this.childElementCount % columnCount > 0 && columnCount > 1 ? columnCount - (this.childElementCount % columnCount) : 0;
    for (let i = 0; i < emptyNeeded; i++) {
      const card = document.createElement('dds-card-group-item');
      card.setAttribute('empty', '');
      this.shadowRoot?.appendChild(card);
    }
  };

  private _removeEmptyCards = () => {
    this.shadowRoot?.querySelectorAll('[empty]').forEach(e => e.remove());
  };

  /**
   * The number of columns per row. Min 2, max 4, default 3. Applies to >=`lg` breakpoint only.
   */
  @state()
  private _cardsPerRow?: number;

  /**
   * Default number of cards per row. Applies to >=`lg` breakpoint only.
   */
  @state()
  private _cardsPerRowAuto = 3;

  /**
   * Number of cards per column.
   * If `--dds--card-group--cards-in-row` CSS custom property is set to `<dds-card-group>`.
   */
  @property({ type: Number, attribute: 'cards-per-row' })
  get cardsPerRow() {
    const { _cardsPerRow: cardsPerRow, _cardsPerRowAuto: cardsPerRowAuto } = this;
    return cardsPerRow ?? cardsPerRowAuto;
  }

  set cardsPerRow(value: number) {
    this._cardsPerRow = value;
    // Don't call `.requestUpdate()` here given we track updates via `_cardsPerRow` and `_cardsPerRowAuto`
  }

  /**
   * The Grid Mode for the component layout.
   * Collapsed/1px (default) | Narrow/16px).
   */
  @property({ attribute: 'grid-mode', reflect: true })
  gridMode = GRID_MODE.COLLAPSED;

  /**
   * If using cards with pictogram.
   */
  // necessary to avoid using sameHeight utility
  @property({ type: Boolean, reflect: true })
  pictograms = false;

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

  updated() {
    this._resizeHandler();
  }

  render() {
    const slotClasses = classMap({
      [`${prefix}--card-group--narrow`]: this.gridMode === GRID_MODE.NARROW,
      [`${prefix}--card-group--collapsed`]: this.gridMode === GRID_MODE.COLLAPSED,
      [`${prefix}--card-group--border`]: this.gridMode === GRID_MODE.BORDER,
    });

    return html`
      <slot @slotchange="${this._handleSlotChange}" class="${slotClasses}"></slot>
    `;
  }

  /**
   * The CSS custom property name for the live button group item cout.
   */
  static get customPropertyCardsPerRow() {
    return `--${ddsPrefix}--card-group--cards-in-row`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-group`;
  }

  /**
   * A selector that will return the card item.
   */
  static get selectorItem() {
    return `${ddsPrefix}-card-group-item`;
  }

  /**
   * A selector that will return the card item's eyebrow
   */
  static get selectorItemEyebrow() {
    return `${ddsPrefix}-card-eyebrow`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemTagGroup() {
    return `${ddsPrefix}-tag-group`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemParagraph() {
    return `p`;
  }

  /**
   * A selector that will return the card item's heading
   */
  static get selectorItemHeading() {
    return `${ddsPrefix}-card-heading`;
  }

  /**
   * A selector that will return the card item's footer
   */
  static get selectorItemFooter() {
    return `${ddsPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardGroup;
