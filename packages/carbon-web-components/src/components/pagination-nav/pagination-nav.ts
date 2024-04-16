/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property, html } from 'lit-element';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './pagination-nav.scss';
import { classMap } from 'lit-html/directives/class-map';
import CaretRight16 from '@carbon/icons/lib/caret--right/16';
import CaretLeft16 from '@carbon/icons/lib/caret--left/16';
import OverflowMenu from "@carbon/icons/lib/overflow-menu--horizontal/16";

const { prefix } = settings;

function calculateCuts(
  page: number,
  totalItems: number,
  itemsDisplayedOnPage: number,
) {
  const split = (itemsDisplayedOnPage - 1) / 2;

  let frontHiddenIndex = page - Math.ceil(split);
  let backHiddenIndex = page + Math.floor(split) - 1;


  if (frontHiddenIndex < 1) {
    backHiddenIndex += Math.abs(frontHiddenIndex - 1);
  }

  if (backHiddenIndex > totalItems - 1) {
    frontHiddenIndex -= (Math.abs(totalItems - backHiddenIndex - 1));
  }

  return {
    front: frontHiddenIndex,
    back: backHiddenIndex
  };
}

/**
 * Pagination Navigation.
 *
 * @element bx-pagination-nav
 * @fires bx-page-changed - The custom event fired when the the page has been changed.
 */
@customElement(`${prefix}-pagination-nav`)
class BXPaginationNav extends LitElement {

  /**
   * The maxiumum number of items to show in pager nav.
   *   - includes overflow items
   *   - excludes prev/next buttons
   *   - minumum value of 5
   */
  @property({ attribute: 'items-shown', reflect: true, type: Number})
  itemsShown = 1;

  /**
   * Whether to allow looping between first/last pages.
   */
  @property({ attribute: "loop", type: Boolean})
  loop = false;

  /**
   * Active page index (0-based).
   */
  @property({ attribute: "page", reflect: true, type: Number })
  page = 0;

  /**
   * Total number of pages
   */
  @property({ attribute: 'total-items', reflect: true, type: Number})
  totalItems = 1;

  /**
   * Array allowing us to map out the items
   *   - Prefer showing this.count
   *   - Maximum of this.visible
   *   - Minumum of 1
   */
  private _iterator: any[] = [];

  shouldUpdate(changedProperties) {
    // Prevent setting "itemsShown" to less than 5.
     if (changedProperties.has('itemsShown') && this.itemsShown < 5) {
      this.itemsShown = 5;
    }

    // Prevent setting "page" outside bounds of available pages.
    if (changedProperties.has('count') || changedProperties.has('page')) {
      if (this.page > this.totalItems) {
        this.page = this.totalItems - 1;
      }
      if (this.page < 0) {
        this.page = 0;
      }
    }

    return true;
  }
  /**
   * After values are updated, but before rendering, update the iterator.
   *
   * @param changedProperties map of previous values of changed properties
   */
  update(changedProperties) {
    if (changedProperties.has('totalItems') || changedProperties.has('itemsShown') || changedProperties.has('page')) {
      const { totalItems, itemsShown: visibleLimit, page } = this;
      const allItems = [...new Array(Math.max(totalItems, 1))].map((_u, i) => i);
      let iterator;

      if (allItems.length > visibleLimit) {
        const first = allItems.shift();
        const last = allItems.pop();
        const {front, back} = calculateCuts(page, allItems.length, visibleLimit - 2);
        const upperGroup = allItems.splice(back);
        const lowerGroup = allItems.splice(0, front);
        const upper = upperGroup.length > 1 ? upperGroup : upperGroup[0];
        const lower = lowerGroup.length > 1 ? lowerGroup : lowerGroup[0]

        iterator = [first, lower, ...allItems, upper, last]
          .filter(item => (typeof item === "number" || (Array.isArray(item) && item.length)));
      } else {
        iterator = allItems;
      }

      this._iterator = iterator;
    }
    super.update(changedProperties);
  }

  updated(changedProperties) {
    if (changedProperties.has('page')) {
      const { pageChangedEvent } = (this.constructor as typeof BXPaginationNav);
      const event = new CustomEvent(pageChangedEvent, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          oldValue: changedProperties.get('page'),
          newValue: this.page,
        }
      })
      this.dispatchEvent(event);
      window.requestIdleCallback(()=>{
        const activeItem = (this.shadowRoot!.querySelector('.bx--pagination-nav__page--active') as HTMLElement);
        if (activeItem && !activeItem.matches(':focus')) {
          activeItem.focus();
        }
      })
    }
  }

  /**
   * Sets the current page to a specified index.
   *
   * @param e the click event
   */
  setIndex(e: PointerEvent) {
    const { target } = e;
    const { value } = (target as HTMLButtonElement);
    this.page = parseInt(value);

    if (target instanceof HTMLSelectElement) {
      target.value = '';
    }
  }

  /**
   * Reduce current page by one, but no lower than 0.
   */
  decrementIndex() {
    const { loop: canLoop, page, totalItems } = this;
    const wouldLoop = page - 1 < 0;

    if (canLoop) {
      this.page = wouldLoop ? totalItems - 1 : page - 1;
    } else {
      this.page = Math.max(this.page - 1, 0);
    }
  }

  /**
   * Increase current page by one, but no higher than (this.totalItems - 1).
   */
  incrementIndex() {
    const { loop: canLoop, page, totalItems } = this;
    const wouldLoop = page + 1 >= totalItems;

    if (canLoop) {
      this.page = wouldLoop ? 0 : page + 1;
    } else {
      this.page = Math.min(this.page + 1, this.totalItems - 1);
    }
  }

  /**
   * Renders a single list item & button.
   *
   * @param i the index to render
   * @returns Rendered item
   */
  renderIndividualItem(i: number = 3) {
    const { page, setIndex } = this;
    const classes = {
      [`${prefix}--pagination-nav__page`]: true,
      [`${prefix}--pagination-nav__page--active`]: i === page
    };
    return html`
      <li class="${prefix}--pagination-nav__list-item">
        <button class=${classMap(classes)} type="button" value=${i} @click=${setIndex}>${i + 1}</button>
      </li>
    `
  }

  /**
   * Renders overflow items in a select list.
   *
   * @param group the indecies to render
   * @returns Rendered item
   */
  renderGroupedItems(group: number[]) {
    const { setIndex } = this;
    const classes = {
      [`${prefix}--pagination-nav__page`]: true,
      [`${prefix}--pagination-nav__page--select`]: true
    }
    return html`
      <li>
        <div class="${prefix}--pagination-nav__select">
          <select class="${classMap(classes)}" @change=${setIndex} aria-label="Select Page Number">
            <option value=""></option>
            ${group.map((i) => html`
              <option value="${i}">${i + 1}</option>
            `)}
          </select>
          <div class="${prefix}--pagination-nav__select-icon-wrapper">
            ${OverflowMenu({class: `${prefix}--pagination-nav__select-icon`})}
          </div>
        </div>
      </li>
    `
  }

  render() {
    const {
      loop: canLoop,
      page,
      totalItems,
      _iterator: iterator,
      incrementIndex,
      decrementIndex,
    } = this;

    const decrementDisabled = !canLoop && page <= 0;
    const incrementDisabled = !canLoop && page >= totalItems - 1;

    const navClasses = {
      [`${prefix}--pagination-nav__page`]: true,
      [`${prefix}--btn--icon-only`]: true,
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--ghost`]: true,
    }

    return html`
      <nav class="${prefix}--pagination-nav">
        <ul class="${prefix}--pagination-nav__list">
          <li class="${prefix}--pagination-nav__list-item">
            <button
              type="button"
              @click=${decrementIndex}
              ?disabled=${decrementDisabled}
              class="${classMap(navClasses)}"
            >
              ${CaretLeft16()}
            </button>
          </li>
            ${iterator.map((i) => {
              if (typeof i === 'number') {
                return this.renderIndividualItem(i);
              }
              if (Array.isArray(i)) {
                return this.renderGroupedItems(i);
              }
              return;
            })}
          <li class="${prefix}--pagination-nav__list-item">
            <button
              type="button"
              @click=${incrementIndex}
              ?disabled=${incrementDisabled}
              class="${classMap(navClasses)}"
            >
              ${CaretRight16()}
            </button>
          </li>
        </ul>
      </nav>
    `
  }

  static get pageChangedEvent() {
    return `${prefix}-page-changed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXPaginationNav;
