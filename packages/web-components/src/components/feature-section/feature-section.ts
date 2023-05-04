/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSFeatureCard from '../feature-card/feature-card';
import '../image/image';
import styles from './feature-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { MEDIA_ALIGNMENT } from './defs';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Section.
 *
 * @element dds-feature-section
 */
@customElement(`${ddsPrefix}-feature-section`)
class DDSFeatureSection extends StableSelectorMixin(DDSFeatureCard) {
  /**
   * Media Alignment (right (default) | left)
   */
  @property({ attribute: 'media-alignment', reflect: true })
  mediaAlignment = MEDIA_ALIGNMENT.RIGHT;

  render() {
    return html`
      ${this.mediaAlignment === MEDIA_ALIGNMENT.LEFT
        ? html`
            <div class="${prefix}--grid ${prefix}--feature-section">
              <div class="${prefix}--row ${prefix}--feature-section__container">
                <div
                  class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__image">
                  <slot name="image"></slot>
                </div>
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
                  <slot name="footer"></slot>
                </div>
              </div>
            </div>
          `
        : html`
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
          `}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-section`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFeatureSection;
