/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import { property } from 'lit/decorators.js';
import parseAspectRatio from '@carbon/ibmdotcom-utilities/es/utilities/parseAspectRatio/parseAspectRatio.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-section.scss?lit';
import C4DContentSection from '../content-section/content-section';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The CTA SECTION pattern
 *
 * @element c4d-cta-section
 */
@customElement(`${c4dPrefix}-cta-section`)
class C4DCTASection extends StableSelectorMixin(C4DContentSection) {
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
    return `${c4dPrefix}--cta-section`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

console.warn(
  'The cta-section component has been deprecated in favor of the content-section/block and content-item components. ' +
    'See content-section/block amd content-item documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCTASection;
