/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, css, property } from 'lit-element';
import parseAspectRatio from '@carbon/ibmdotcom-utilities/es/utilities/parseAspectRatio/parseAspectRatio.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-section.scss';
import { DDSContentSectionBase } from '../content-section/content-section';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The CTA SECTION pattern
 *
 * @element dds-cta-section
 */
@customElement(`${ddsPrefix}-cta-section`)
class DDSCTASection extends StableSelectorMixin(DDSContentSectionBase) {
  @property({ attribute: 'logo-ratio' })
  logoRatio?;

  updated(changedProperties) {
    const { logoRatio } = this;
    if (changedProperties.has('logoRatio')) {
      if (logoRatio) {
        const [w, h] = parseAspectRatio(logoRatio);
        this.style.setProperty('--logo-ratio', `${w}/${h}`);
      } else {
        this.style.removeProperty('--logo-ratio');
      }
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-section`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCTASection;
