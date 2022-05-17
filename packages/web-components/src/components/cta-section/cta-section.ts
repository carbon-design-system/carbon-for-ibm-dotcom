/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, css } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './cta-section.scss';
import DDSContentSection from '../content-section/content-section';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The CTA SECTION pattern
 *
 * @element dds-cta-section
 */
@customElement(`${ddsPrefix}-cta-section`)
class DDSCTASection extends StableSelectorMixin(DDSContentSection) {
  static get stableSelector() {
    return `${ddsPrefix}--cta-section`;
  }

  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCTASection;
