/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property, html, css } from 'lit-element';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './pagination-nav.scss';
import { classMap } from 'lit-html/directives/class-map';

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
 * @element bx-pagination
 */
@customElement(`${prefix}-pagination-nav`)
class BXPaginationNav extends LitElement {

  /**
   * The maxiumum number of items to show in pager nav.
   *   - includes overflow items
   *   - excludes prev/next buttons
   *   - minumum value of 5
   */
  @property({ attribute: 'visible', reflect: true, type: Number})
  visible = 1;

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
  @property({ attribute: 'count', reflect: true, type: Number})
  count = 1;

  /**
   * Array allowing us to map out the items
   *   - Prefer showing this.count
   *   - Maximum of this.visible
   *   - Minumum of 1
   */
  private _iterator: any[] = [];

  shouldUpdate(changedProperties) {
    // Prevent setting "visible" to less than 5.
     if (changedProperties.has('visible') && this.visible < 5) {
      this.visible = 5;
    }

    // Prevent setting "page" outside bounds of available pages.
    if (changedProperties.has('count') || changedProperties.has('page')) {
      if (this.page > this.count) {
        this.page = this.count - 1;
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
    if (changedProperties.has('count') || changedProperties.has('visible') || changedProperties.has('page')) {
      const { count, visible: visibleLimit, page } = this;
      const allItems = [...new Array(Math.max(count, 1))].map((_u, i) => i);
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
  }

  /**
   * Reduce current page by one, but no lower than 0.
   */
  decrementIndex() {
    const { loop: canLoop, page, count } = this;
    const wouldLoop = page - 1 < 0;

    if (canLoop) {
      this.page = wouldLoop ? count - 1 : page - 1;
    } else {
      this.page = Math.max(this.page - 1, 0);
    }
  }

  /**
   * Increase current page by one, but no higher than (this.count - 1).
   */
  incrementIndex() {
    const { loop: canLoop, page, count } = this;
    const wouldLoop = page + 1 >= count;

    if (canLoop) {
      this.page = wouldLoop ? 0 : page + 1;
    } else {
      this.page = Math.min(this.page + 1, this.count - 1);
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
      [`is-active`]: i === page
    };
    return html`
      <li>
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
    return html`
      <li>
        <select @change=${setIndex} aria-label="Select Page Number">
          <option>...</option>
          ${group.map((i) => html`
            <option value="${i}">${i + 1}</option>
          `)}
        </select>
      </li>
    `
  }

  render() {
    const {
      loop: canLoop,
      page,
      count,
      _iterator: iterator,
      incrementIndex,
      decrementIndex,
    } = this;

    const decrementDisabled = !canLoop && page <= 0;
    const incrementDisabled = !canLoop && page >= count - 1;

    return html`
      <nav>
        <ul>
          <li><button type="button" @click=${decrementIndex} ?disabled=${decrementDisabled}>prev</button></li>
            ${iterator.map((i) => {
              if (typeof i === 'number') {
                return this.renderIndividualItem(i);
              }
              if (Array.isArray(i)) {
                return this.renderGroupedItems(i);
              }
            })}
          <li><button type="button" @click=${incrementIndex} ?disabled=${incrementDisabled}>next</button></li>
        </ul>
      </nav>
    `
  }

  static get pageChangedEvent() {
    return `${prefix}-page-changed`;
  }

  static styles = [styles, css`
    ul {
      display: flex;
      list-style-type: none;
      gap: 0.5rem;
    }

    button, select {
      all: unset;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #ddd;
      padding: 0.25rem;
      width: 1rem;
      height: 1rem;
      border-bottom: 2px solid transparent;
    }

    button.is-active {
      border-bottom-color: blue;
    }
  `]; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXPaginationNav;
