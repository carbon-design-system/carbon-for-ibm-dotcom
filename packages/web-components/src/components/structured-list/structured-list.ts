/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { customElement, LitElement, html } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

@customElement(`${ddsPrefix}-structured-list`)
class DDSStructuredList extends LitElement {
  private _mutationObserver = new MutationObserver(this._setColumnSpans.bind(this));

  /**
   * Handles attribute changes to attributes starting with `col-span`.
   */
  private _setColumnSpans(entries) {
    entries.forEach(entry => {
      const attr = entry.attributeName;

      if (attr?.startsWith('col-span')) {
        if (this.hasAttribute(attr) && parseInt(this.getAttribute(attr)!, 10)) {
          this.style.setProperty(`--${attr}`, parseInt(this.getAttribute(attr)!, 10).toString());
        } else {
          this.style.removeProperty(`--${attr}`);
        }
      }
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
    this._mutationObserver.observe(this, { attributes: true, attributeOldValue: true });

    const colSpanAttributes = Object.values(this.attributes).filter(attr => attr.name.startsWith('col-span'));

    colSpanAttributes.forEach(attr => {
      this.style.setProperty(`--${attr.name}`, attr.value);
    });
  }

  render() {
    return html`
      <section id="section" class="${prefix}--structured-list">
        <slot></slot>
      </section>
    `;
  }

  static styles = styles;
}

export default DDSStructuredList;
