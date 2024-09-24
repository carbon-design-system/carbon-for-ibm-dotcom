/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import { GRID_MODE } from './defs';
import styles from './card-group.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

export { GRID_MODE };

const { stablePrefix: c4dPrefix } = settings;

// tag constants used for same height calculations
const headingBottomMargin = 64;

/**
 * Card Group.
 *
 * @element c4d-card-group
 */
@customElement(`${c4dPrefix}-card-group`)
class C4DCardGroup extends StableSelectorMixin(LitElement) {
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
      .filter((elem) =>
        (elem as HTMLElement).matches?.(
          (this.constructor as typeof C4DCardGroup).selectorItem
        )
      );

    // retrieve item heading, eyebrows, and footers to set same height
    if (this._childItems) {
      this._childItems.forEach((e) => {
        if (!e.hasAttribute('href') && this.gridMode === GRID_MODE.CONDENSED) {
          this.gridMode = GRID_MODE.DEFAULT;
        }
        this._childItemEyebrows.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof C4DCardGroup).selectorItemEyebrow
          )
        );
        this._childItemParagraphs.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof C4DCardGroup).selectorItemParagraph
          )
        );
        this._childItemTagGroup.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof C4DCardGroup).selectorItemTagGroup
          )
        );
        this._childItemHeadings.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof C4DCardGroup).selectorItemHeading
          )
        );
        this._childItemFooters.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof C4DCardGroup).selectorItemFooter
          )
        );
      });

      const { customPropertyCardsPerRow } = this
        .constructor as typeof C4DCardGroup;
      this.style.setProperty(
        customPropertyCardsPerRow,
        String(this.cardsPerRow)
      );

      if (this.gridMode !== GRID_MODE.NARROW) {
        this._resizeHandler();
      }
    }
  }

  /**
   * The observer for the resize of the viewport, calls sameHeight utility function
   */
  private _resizeHandler = () => {
    if (!this.pictograms) {
      window.requestAnimationFrame(() => {
        this._setSameHeight();
      });
    }
  };

  private _setSameHeight = () => {
    // check if items are not null before using sameHeight

    sameHeight(
      this._childItemEyebrows.filter((item) => item !== null),
      'md'
    );
    sameHeight(
      this._childItemHeadings.filter((item) => item !== null),
      'md'
    );
    sameHeight(
      this._childItemParagraphs.filter((item) => item !== null),
      'md'
    );
    sameHeight(
      this._childItemFooters.filter((item) => item !== null),
      'md'
    );

    let tagGroupHeight = 0;

    // get tallest height of tag groups
    this._childItemTagGroup.forEach((item) => {
      if (item) {
        const groupHeight = (item as HTMLElement).offsetHeight;
        if (groupHeight > tagGroupHeight) {
          tagGroupHeight = groupHeight;
        }
      }
    });

    this._childItemHeadings.forEach((e) => {
      // add tag group height to heading to the cards lacking tag group
      if (
        e &&
        !e.parentElement.hasAttribute('link') &&
        !e.nextElementSibling?.matches(
          (this.constructor as typeof C4DCardGroup).selectorItemTagGroup
        )
      ) {
        e.style.marginBottom = `${tagGroupHeight + headingBottomMargin}px`;
      }
    });
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
   * If `--c4d--card-group--cards-in-row` CSS custom property is set to `<c4d-card-group>`.
   */
  @property({ type: Number, attribute: 'cards-per-row' })
  get cardsPerRow() {
    const { _cardsPerRow: cardsPerRow, _cardsPerRowAuto: cardsPerRowAuto } =
      this;
    return cardsPerRow ?? cardsPerRowAuto;
  }

  set cardsPerRow(value: number) {
    this._cardsPerRow = value;
    // Don't call `.requestUpdate()` here given we track updates via `_cardsPerRow` and `_cardsPerRowAuto`
  }

  /**
   * The Grid Mode for the component layout.
   * Condensed (1px) | Narrow (16px) | Default(32px).
   */
  @property({ attribute: 'grid-mode', reflect: true })
  gridMode = GRID_MODE.DEFAULT;

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

    if (
      this.previousElementSibling?.matches?.(
        (this.constructor as typeof C4DCardGroup).selectorCardInCard
      )
    ) {
      this.setAttribute('with-card-in-card', '');
    }
    this._cleanAndCreateObserverResize({ create: true });
  }

  updated() {
    this._resizeHandler();
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  /**
   * The CSS custom property name for the live button group item cout.
   */
  static get customPropertyCardsPerRow() {
    return `--${c4dPrefix}--card-group--cards-in-row`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--card-group`;
  }

  /**
   * A selector that will return the card-in-card selector
   */
  static get selectorCardInCard() {
    return `${c4dPrefix}-card-in-card`;
  }

  /**
   * A selector that will return the card item.
   */
  static get selectorItem() {
    return `${c4dPrefix}-card-group-item`;
  }

  /**
   * A selector that will return the card item's eyebrow
   */
  static get selectorItemEyebrow() {
    return `${c4dPrefix}-card-eyebrow`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemTagGroup() {
    return `div`;
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
    return `${c4dPrefix}-card-heading`;
  }

  /**
   * A selector that will return the card item's footer
   */
  static get selectorItemFooter() {
    return `${c4dPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardGroup;
