/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings.js';
import { customElement, LitElement, html } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * StructuredList
 *
 * @element dds-structured-list
 */
@customElement(`${ddsPrefix}-structured-list`)
class DDSStructuredList extends StableSelectorMixin(LitElement) {
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
    this.querySelectorAll(
      `${ddsPrefix}-structured-list-cell,
      ${ddsPrefix}-structured-list-header-cell,
      ${ddsPrefix}-pricing-table-header-cell,
      ${ddsPrefix}-pricing-table-cell`
    ).forEach((cell) => {
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
    const { wrapperId } = this.constructor as typeof DDSStructuredList;
    return html`
      <div class="overflow-indicator left"></div>
      <section id="${wrapperId}" class="${prefix}--structured-list">
        <slot></slot>
      </section>
      <div class="overflow-indicator right"></div>
    `;
  }

  static get wrapperId() {
    return 'section';
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredList;
