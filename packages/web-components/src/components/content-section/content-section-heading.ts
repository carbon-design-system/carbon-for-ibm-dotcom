/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './content-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Heading in content section.
 *
 * @element c4d-content-section-heading
 */
@customElement(`${c4dPrefix}-content-section-heading`)
class C4DContentSectionHeading extends StableSelectorMixin(LitElement) {
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
    return `${c4dPrefix}--content-section-heading`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentSectionHeading;
