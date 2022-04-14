/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import settings from 'carbon-components/es/globals/js/settings';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import DDSStructuredListHeaderRow from '../structured-list/structured-list-header-row';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import styles from './pricing-table.scss';
import { setColumnWidth } from './utils';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';
import DDSPricingTable from './pricing-table';
import DDSPricingTableHead from './pricing-table-head';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-row`)
class DDSPricingTableHeaderRow extends HostListenerMixin(DDSStructuredListHeaderRow) {
  /**
   * Array full of tag wrapper elements within header cells.
   */
  private _tagWrappers: any[] = [];

  /**
   * Observer that watches for viewport resizes.
   */
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * Tracks whether the row is set to sticky.
   */
  private _isSticky: boolean = false;

  /**
   * Tracks position of the top edge of the row before it is set to sticky.
   */
  private _positionTop: number | undefined;

  /**
   * Tracks position of the bottom edge of the row before it is set to sticky.
   */
  private _positionEnd: number | undefined;

  /**
   * Tracks height of row before it is set to sticky.
   */
  private _initialHeight: number | undefined;

  /**
   * Tracks height of row once it has been set to sticky.
   */
  private _collapsedHeight: number = 0;

  /**
   * Tracks width of the parent element so we know how wide the fixed header
   * row should be.
   */
  private _maxWidth: number | undefined;

  /**
   * Tracks elements in header cells that should be hidden when set to sticky.
   */
  private _elementsToHide: HTMLElement[] = [];

  /**
   * The table this row exists within.
   */
  private _parentTable: DDSPricingTable | null = null;

  /**
   * The table head this row exists within.
   */
  private _parentHead: DDSPricingTableHead | null = null;

  /**
   * Caches scroll position.
   */
  private _scrollPosition: number = 0;

  /**
   * Tracks scroll direction.
   */
  private _scrollingDown: boolean = true;

  /**
   * Takes actions whenever the viewport is resized.
   */
  private _createResizeObserver() {
    // TODO: Wait for `.d.ts` update to support `ResizeObserver`
    // @ts-ignore
    this._resizeObserver = new ResizeObserver(() => {
      this._setSameHeight();
      this._setMaxWidth();
      this._setInitialHeight();
      this._setPositions();
      this._handleScroll();
    });
    this._resizeObserver.observe(this.ownerDocument!.documentElement);
  }

  /**
   * Safely disconnects and removes the resize observer.
   */
  private _cleanResizeObserver() {
    if (this._resizeObserver instanceof ResizeObserver) {
      this._resizeObserver.disconnect();
    }
    this._resizeObserver = null;
  }

  private _setSameHeight() {
    window.requestAnimationFrame(() => {
      sameHeight(this._tagWrappers);
    });
  }

  private _setMaxWidth() {
    this._maxWidth = this.parentElement?.getBoundingClientRect().width;
    this.style.setProperty('--max-width', `${this._maxWidth}px`);
  }

  private _setInitialHeight() {
    this._initialHeight = this.getBoundingClientRect().height;
  }

  private _setPositions() {
    const { _parentTable } = this;
    let distance = 0;
    distance += _parentTable?.offsetTop || 0;
    distance += _parentTable?.dynamicTopMargin || 0;

    this._positionTop = distance;
    this._positionEnd = distance + (_parentTable?.getBoundingClientRect().height || 0);
  }

  private _setElementsToHide() {
    this._elementsToHide = [];
    const selectors = [`.${prefix}--pricing-table-header-cell-tag-wrapper`, `.${prefix}--pricing-table-cell-inner`];
    const validCells = Array.from(this.children).filter(cell => {
      return cell instanceof DDSPricingTableHeaderCell && cell.getAttribute('type') !== PRICING_TABLE_HEADER_CELL_TYPES.SIMPLE;
    });
    validCells.forEach(cell => {
      selectors.forEach(selector => {
        if (cell.shadowRoot !== null) {
          const element = cell.shadowRoot.querySelector(selector);
          if (element instanceof HTMLElement) {
            this._elementsToHide.push(element);
          }
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private _animateHidden(element: HTMLElement) {
    const height = element.scrollHeight;
    const { transition } = element.style;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = `${height}px`;
      element.style.opacity = '1';
      element.style.transition = transition;

      requestAnimationFrame(() => {
        element.style.height = '0px';
        element.style.opacity = '0';
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private _animateUnhidden(element: HTMLElement) {
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.opacity = '1';

    element.addEventListener(
      'transitionend',
      () => {
        element.style.height = '';
        element.style.opacity = '';
      },
      { once: true }
    );
  }

  private async _animateElementsHidden() {
    const { _isSticky, _elementsToHide } = this;
    _elementsToHide.forEach(element => {
      if (_isSticky) {
        this._animateHidden(element);
      }
    });
  }

  private async _animateElementsUnhidden() {
    const { _isSticky, _elementsToHide } = this;
    _elementsToHide.forEach(element => {
      if (!_isSticky) {
        this._animateUnhidden(element);
      }
    });
  }

  // private _setElementsHidden() {
  //   const { _isSticky, _elementsToHide } = this;
  //   _elementsToHide.forEach(element => {
  //     if (_isSticky) {
  //       element.style.height = '0px';
  //       element.style.opacity = '0';
  //     }
  //   });
  // }

  // private _setElementsUnhidden() {
  //   const { _isSticky, _elementsToHide } = this;
  //   const { transition } = this.style;
  //   _elementsToHide.forEach(element => {
  //     const { transition: elTransition } = element.style;
  //     element.style.transition = '';
  //     if (!_isSticky) {
  //       element.style.height = '';
  //       element.style.opacity = '';
  //     }
  //     element.style.transition = elTransition;
  //   });
  //   this.style.transition = transition;
  // }

  // private _setFixed() {
  //   const { _isSticky, _parentHead, _collapsedHeight } = this;
  //   if (_isSticky) {
  //     this.style.position = 'fixed';
  //     if (_parentHead) {
  //       _parentHead.style.paddingBlockEnd = `${_collapsedHeight}px`;
  //     }
  //   }
  //   else {
  //     this.style.position = '';
  //     if (_parentHead) {
  //       _parentHead.style.paddingBlockEnd = '';
  //     }
  //   }
  // }

  private _setSticky() {
    const { rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTableHeaderRow;

    // Set sticky property
    this._isSticky = true;

    // Set classes for CSS changes
    this.classList.add(rowStickyClass);
    Array.from(this.children).forEach(child => {
      child.classList.add(cellStickyClass);
    });

    // Hide elements
    this._animateElementsHidden();
    // animate ? this._animateElementsHidden() : this._setElementsHidden();

    // Set collapsed height
    this._collapsedHeight = this.getBoundingClientRect().height;
  }

  private _unsetSticky() {
    const { rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTableHeaderRow;

    // Set sticky property
    this._isSticky = false;

    // Remove classes for CSS changes
    this.classList.remove(rowStickyClass);
    Array.from(this.children).forEach(child => {
      child.classList.remove(cellStickyClass);
    });

    // Animate elements unhidden
    this._animateElementsUnhidden();
    // animate ? this._animateElementsUnhidden() : this._setElementsUnhidden();

    // Reset same heights
    this._setSameHeight();
  }

  private _setAbsolute() {
    this.classList.add('bx--pricing-table-header-row--absolute');
    this.style.bottom = `${this._collapsedHeight}px`;
  }

  private _unsetAbsolute() {
    this.classList.remove('bx--pricing-table-header-row--absolute');
    this.style.bottom = '';
  }

  @HostListener('window:scroll')
  protected _handleScroll = () => {
    const { _isSticky, _positionTop, _positionEnd, _initialHeight, _scrollPosition: prevScrollPosition } = this;

    setTimeout(() => {
      const currentScrollPosition = window.pageYOffset;
      this._scrollingDown = prevScrollPosition < currentScrollPosition;

      const pastLeadingEdge = currentScrollPosition > (_positionTop || 0);
      const pastTrailingEdge = currentScrollPosition > (_positionEnd || 0) - (_initialHeight || 0);

      // SCROLLING DOWN
      if (this._scrollingDown) {
        // Scrolling down past leading edge
        if (!_isSticky && pastLeadingEdge && !pastTrailingEdge) {
          this._setSticky();
        }
        // Scrolling down past trailing edge
        else if (_isSticky && pastLeadingEdge && pastTrailingEdge) {
          // this._unsetSticky();
          this._setAbsolute();
        }
      }
      // SCROLLING UP
      if (!this._scrollingDown) {
        // Scrolling up past trailing edge
        if (!_isSticky && pastLeadingEdge && !pastTrailingEdge) {
          // this._setSticky(false);
          this._unsetAbsolute();
        }
        // Scrolling up past leading edge
        else if (_isSticky && !pastLeadingEdge && !pastTrailingEdge) {
          this._unsetSticky();
        }
      }

      this._scrollPosition = currentScrollPosition;
    }, 250);
  };

  protected _handleSlotChange(e) {
    setColumnWidth(this);

    // Find cells that are eligible to have tags within them.
    const validCells = e.target.assignedNodes().filter(node => {
      if (node instanceof DDSPricingTableHeaderCell) {
        return node.type === PRICING_TABLE_HEADER_CELL_TYPES.COMPLEX;
      }
      return false;
    });

    // Get wrapper markup for tag slot, which is always rendered regardless of
    // the presence of a tag.
    this._tagWrappers = validCells.reduce((acc, cell) => {
      if (cell.length !== 0) {
        const tag = cell.shadowRoot.querySelector(`.${DDSPricingTableHeaderCell.tagWrapperSelector}`);
        if (tag) acc.push(tag);
      }
      return acc;
    }, []);

    this._setSameHeight();
    this._setElementsToHide();
    this._setInitialHeight();
    this._setPositions();
  }

  connectedCallback() {
    super.connectedCallback();
    this._createResizeObserver();
    this._parentTable = this.closest(`${ddsPrefix}-pricing-table`);
    this._parentHead = this.closest(`${ddsPrefix}-pricing-table-head`);
  }

  disconnectedCallback() {
    this._cleanResizeObserver();
    super.disconnectedCallback();
  }

  render() {
    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-row`;
  }

  static get rowStickyClass() {
    return `${prefix}--pricing-table-header-row--sticky`;
  }

  static get cellStickyClass() {
    return `${prefix}--pricing-table-header-cell--sticky`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderRow;
