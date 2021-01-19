/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './content-section.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Heading in content section.
 *
 * @element dds-content-section-heading
 */
@customElement(`${ddsPrefix}-content-section-heading`)
class DDSContentSectionHeading extends LitElement {
  @property({ reflect: true })
  slot = 'heading';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'heading');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentSectionHeading;
