/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import CaretLeft16 from '@carbon/icons/lib/caret--left/16';
import CaretRight16 from '@carbon/icons/lib/caret--right/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import BXPagesSelect from './pages-select';
import BXPageSizesSelect from './page-sizes-select';
import styles from './pagination.scss';
import CDSSelect from '../select/select';

/**
 * Pagination UI.
 *
 * @element cds-pagination
 * @slot page-sizes-select - Where to put in the `<page-sizes-select>`.
 * @fires cds-pages-select-changed - The custom event fired after the current page is changed from `<cds-pages-select>`.
 * @fires cds-page-sizes-select-changed
 *   The custom event fired after the number of rows per page is changed from `<cds-page-sizes-select>`.
 */
@customElement(`${prefix}-pagination`)
class BXPagination extends FocusMixin(HostListenerMixin(LitElement)) {
  @query(`${prefix}-select`)
  private _pageSizeSelect!: HTMLElement;

  private _handleSlotChange({ target }: Event) {
    const content = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );

    content.forEach((item) => {
      this._pageSizeSelect.appendChild(item);
    });
  }

  /**
   * @returns Page status text.
   */
  private _renderStatusText() {
    const {
      start,
      pageSize,
      total,
      formatStatusWithDeterminateTotal,
      formatStatusWithIndeterminateTotal,
    } = this;
    // * Regular: `1-10 of 100 items`
    // * Indeterminate total: `Item 1-10` (`Item 11-` at the last page)
    const end = Math.min(start + pageSize, total == null ? Infinity : total);
    const format =
      total == null
        ? formatStatusWithIndeterminateTotal
        : formatStatusWithDeterminateTotal;

    // `start`/`end` properties starts with zero, whereas we want to show number starting with 1
    return format({ start: start + 1, end, count: total });
  }

  /**
   * Handles user-initiated change in the row number the current page starts with.
   *
   * @param start The new current row number, index that starts with zero.
   */
  private _handleUserInitiatedChangeStart(start: number) {
    this.start = start;
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof BXPagination).eventChangeCurrent,
        {
          bubbles: true,
          composed: true,
          detail: {
            start,
          },
        }
      )
    );
  }

  /**
   * Handles `click` event on the previous button.
   */
  private _handleClickPrevButton() {
    const { start: oldStart, pageSize } = this;
    const newStart = Math.max(oldStart - pageSize, 0);
    if (newStart !== oldStart) {
      this._handleUserInitiatedChangeStart(newStart);
    }
    this.currentPage--;
  }

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { start: oldStart, pageSize, total } = this;
    const newStart = oldStart + pageSize;
    if (newStart < (total == null ? Infinity : total)) {
      this._handleUserInitiatedChangeStart(newStart);
    }
    this.currentPage++;
  }

  /**
   * Handles user-initiated change in number of rows per page.
   *
   * @param event The event.
   */
  @HostListener('eventChangeSelect')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleChangePageSize(event) {
    const { value } = event.detail;
    const { total, pageSize } = this;

    if (event.composedPath()[0] === this._pageSizeSelect) {
      this.pageSize = parseInt(value);
      this.totalPages = Math.ceil(total / pageSize);
      this.currentPage = 1;
      this.start = 0;
    } else {
      this.currentPage = value;
      this._handleUserInitiatedChangeStart((value - 1) * pageSize);
    }
  }

  /**
   * Number of items per page.
   */
  @property({ type: Number, attribute: 'page-size' })
  currentPage = 1;

  /**
   * The formatter for the assistive text for screen readers to announce.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatLabelText = ({ count }) =>
    `Page number, of ${count} page${count <= 1 ? '' : 's'}`;

  /**
   * The formatter, used with determinate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithDeterminateTotal = ({ start, end, count }) =>
    `${start}–${end} of ${count} item${count <= 1 ? '' : 's'}`;

  /**
   * The formatter, used with indeterminate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithIndeterminateTotal = ({ start, end }) =>
    end == null ? `Item ${start}–` : `Item ${start}–${end}`;

  /**
   * The formatter for the text next to the select box. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatSupplementalText = ({ count }) =>
    `of ${count} page${count <= 1 ? '' : 's'}`;
  /**
   * `true` to explicitly state that user is at the last page.
   */
  @property({ type: Boolean, attribute: 'is-last-page' })
  isLastPage!: boolean;

  /**
   * The translatable text indicating the number of items per page.
   */
  @property({ attribute: 'items-per-page-text' })
  itemsPerPageText = 'Items per page:';

  /**
   * `true` if the pagination UI should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The assistive text for the button to go to next page.
   */
  @property({ attribute: 'next-button-text' })
  nextButtonText = 'Next page';

  /**
   * Number of items per page.
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  /**
   * The label text for the UI to select page size.
   */
  @property({ attribute: 'page-size-label-text' })
  pageSizeLabelText!: string;

  /**
   * The assistive text for the button to go to previous page.
   */
  @property({ attribute: 'prev-button-text' })
  prevButtonText = 'Previous page';

  /**
   * The row number where current page start with, index that starts with zero.
   */
  @property({ type: Number })
  start = 0;

  /**
   * The number of total items.
   */
  @property({ type: Number })
  total!: number;

  /**
   * The number of total pages.
   */
  @property({ type: Number })
  totalPages = 1;

  updated(changedProperties) {
    const { pageSize, total } = this;
    const { selectorPageSizesSelect, selectorPagesSelect } = this
      .constructor as typeof BXPagination;

    if (changedProperties.has('pageSize')) {
      (this.shadowRoot!.querySelector(selectorPageSizesSelect) as any).value =
        pageSize;
    }
    if (changedProperties.has('pageSize') || changedProperties.has('start')) {
      this.totalPages = Math.ceil(total / pageSize);
      (this.shadowRoot!.querySelector(selectorPagesSelect) as CDSSelect).value =
        this.currentPage.toString();
    }
  }

  render() {
    const {
      currentPage,
      disabled,
      nextButtonText,
      prevButtonText,
      itemsPerPageText,
      pageSize,
      start,
      total,
      totalPages,
      _handleClickPrevButton: handleClickPrevButton,
      _handleClickNextButton: handleClickNextButton,
      _handleSlotChange: handleSlotChange,
      formatLabelText,
      formatSupplementalText,
    } = this;

    const { isLastPage = start + pageSize >= total } = this;
    const prevButtonDisabled = disabled || start === 0;
    const nextButtonDisabled = disabled || isLastPage;
    const prevButtonClasses = classMap({
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--backward`]: true,
      [`${prefix}--pagination__button--no-index`]: prevButtonDisabled,
    });
    const nextButtonClasses = classMap({
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--forward`]: true,
      [`${prefix}--pagination__button--no-index`]: nextButtonDisabled,
    });
    return html`
      <div class="${prefix}--pagination__left">
        <label for="select" class="${prefix}--pagination__text"
          ><slot name="label-text">${itemsPerPageText}</slot></label
        >
        <cds-select
          id="page-size-select"
          left-select
          pagination
          inline
          value="${pageSize}">
          <slot @slotchange=${handleSlotChange}></slot>
        </cds-select>
        <span
          class="${prefix}--pagination__text ${prefix}--pagination__items-count"
          >${this._renderStatusText()}</span
        >
      </div>
      <div class="${prefix}--pagination__right">
        <label for="select" class="${prefix}--label ${prefix}--visually-hidden">
          ${formatLabelText({ count: totalPages })}
        </label>
        <cds-select id="pages-select" pagination inline value=${currentPage}>
          ${Array.from(new Array(totalPages)).map(
            (_item, index) =>
              html`
                <cds-select-item value="${index + 1}">
                  ${index + 1}
                </cds-select-item>
              `
          )}
        </cds-select>
        <span class="cds--pagination__text"
          >${formatSupplementalText({ count: totalPages })}</span
        >
        <div class="${prefix}--pagination__control-buttons">
          <cds-button
            ?disabled="${prevButtonDisabled}"
            tooltip-text="${'test'}"
            @click="${handleClickPrevButton}">
            ${CaretLeft16()}
          </cds-button>
          <cds-button
            ?disabled="${nextButtonDisabled}"
            @click="${handleClickNextButton}"
            tooltip-text="${'test'}">
            ${CaretRight16()}
          </cds-button>
        </div>
      </div>
    `;
  }

  /**
   * A selector that will return the select box for the current page.
   */
  static get selectorPagesSelect() {
    return `${prefix}-select#pages-select`;
  }

  /**
   * A selector that will return the select box for page sizes.
   */
  static get selectorPageSizesSelect() {
    return `${prefix}-select`;
  }

  /**
   * The name of the custom event fired after the current row number is changed.
   */
  static get eventChangeCurrent() {
    return `${prefix}-pagination-changed-current`;
  }

  /**
   * The name of the custom event fired after the number of rows per page is changed from `<cds-page-sizes-select>`.
   */
  static get eventChangeSelect() {
    return `${prefix}-select-selected`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXPagination;
