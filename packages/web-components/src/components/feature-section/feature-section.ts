/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DFeatureCard from '../feature-card/feature-card';
import '../image/image';
import styles from './feature-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { COLOR_SCHEME } from './defs';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Feature Section.
 *
 * @element c4d-feature-section
 */
@customElement(`${c4dPrefix}-feature-section`)
class C4DFeatureSection extends StableSelectorMixin(C4DFeatureCard) {
  /**
   * Color scheme type (regular (default) | inverse | cyan | purple )
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = COLOR_SCHEME.REGULAR;

  render() {
    return html`
      <div class="${prefix}--grid ${prefix}--feature-section">
        <div class="${prefix}--row ${prefix}--feature-section__container">
          <div
            class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__body">
            <div class="${prefix}--grid">
              <div class="${prefix}--row">
                <div
                  class="${prefix}--col-sm-4 ${prefix}--col-md-6 ${prefix}--col-lg-12">
                  <slot name="eyebrow"></slot>
                  <slot name="heading"></slot>
                  <slot name="copy"></slot>
                </div>
              </div>
            </div>
          </div>
          <div
            class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__image">
            <slot name="image"></slot>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--feature-section`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFeatureSection;
