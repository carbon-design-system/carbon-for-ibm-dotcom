/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './content-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Heading in content section.
 *
 * @element dds-content-section-heading
 */
@customElement(`${ddsPrefix}-content-section-heading`)
class DDSContentSectionHeading extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  slot = 'heading';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'heading');
    }
    if (!this.hasAttribute('aria-level')) {
      this.setAttribute('aria-level', '3');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-section-heading`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentSectionHeading;
