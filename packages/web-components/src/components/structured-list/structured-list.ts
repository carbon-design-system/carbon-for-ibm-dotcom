/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * StructuredList
 *
 * @element c4d-structured-list
 * @csspart overflow-indicator left - Overflow indicator left. Usage `c4d-structured-list::part(overflow-indicator left)`
 * @csspart overflow-indicator right - Overflow indicator left. Usage `c4d-structured-list::part(overflow-indicator right)`
 * @csspart section - List section. Usage `c4d-structured-list::part(section)`
 */
@customElement(`${c4dPrefix}-structured-list`)
class C4DStructuredList extends StableSelectorMixin(LitElement) {
  private _listMutationObserver = new MutationObserver(
    this._setColumnSpans.bind(this)
  );

  protected _newChildObserver = new MutationObserver(
    this._resetIntersectionObserver.bind(this)
  );

  protected _scrollObserver = new IntersectionObserver(
    this._handleScroll.bind(this),
    {
      root: this,
      rootMargin: '0px',
      threshold: [0, 0.01, 0.02, 0.98, 0.99, 1],
    }
  );

  protected _resetIntersectionObserver() {
    this._scrollObserver.disconnect();
    const { cellSelector } = this.constructor as typeof C4DStructuredList;
    this.querySelectorAll(cellSelector).forEach((cell) => {
      this._scrollObserver.observe(cell);
    });
  }

  private _handleScroll() {
    const maxScroll = this.scrollWidth - this.offsetWidth;
    const scrollLeft = this.scrollLeft;
    const scrollRight = maxScroll - scrollLeft;

    this.classList.toggle('overflowing-left', scrollLeft > 10);
    this.classList.toggle('overflowing-right', scrollRight > 10);
  }

  /**
   * Handles attribute changes to attributes starting with `col-span`.
   */
  private _setColumnSpans(entries) {
    entries.forEach((entry) => {
      const attr = entry.attributeName;

      if (attr?.startsWith('col-span')) {
        if (this.hasAttribute(attr) && parseInt(this.getAttribute(attr)!, 10)) {
          this.style.setProperty(
            `--${attr}`,
            parseInt(this.getAttribute(attr)!, 10).toString()
          );
        } else {
          this.style.removeProperty(`--${attr}`);
        }
      }
    });
  }

  connectedCallback() {
    this._newChildObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    this._resetIntersectionObserver();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
    this._listMutationObserver.observe(this, {
      attributes: true,
      attributeOldValue: true,
    });

    const colSpanAttributes = Object.values(this.attributes).filter((attr) =>
      attr.name.startsWith('col-span')
    );

    colSpanAttributes.forEach((attr) => {
      this.style.setProperty(`--${attr.name}`, attr.value);
    });
  }

  render() {
    return html`
      <div class="overflow-indicator left" part="overflow-indicator left"></div>
      ${this.renderInner()}
      <div
        class="overflow-indicator right"
        part="overflow-indicator right"></div>
    `;
  }

  protected renderInner() {
    const { wrapperId } = this.constructor as typeof C4DStructuredList;
    return html`
      <section
        id="${wrapperId}"
        class="${prefix}--structured-list"
        part="section">
        <slot></slot>
      </section>
    `;
  }

  static get wrapperId() {
    return 'section';
  }

  static get cellSelector() {
    return `${c4dPrefix}-structured-list-cell, ${c4dPrefix}-structured-list-header-cell`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DStructuredList;
