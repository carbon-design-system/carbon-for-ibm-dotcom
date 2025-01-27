/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import C4DFeatureCard from '../feature-card/feature-card';
import '../image/image';
import styles from './feature-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { COLOR_SCHEME, MEDIA_ALIGNMENT } from './defs';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Feature Section.
 *
 * @element c4d-feature-section
 * @csspart grid - All grid itens. Usage: `c4d-feature-section::part(grid)`
 * @csspart grid--wrapper - The grid Wrapper. Usage: `c4d-feature-section::part(grid--wrapper)`
 * @csspart grid--body - Thw grid body. Usage: `c4d-feature-section::part(grid--body)`
 * @csspart row - All row items. Usage: `c4d-feature-section::part(row)`
 * @csspart row--container -  The row container. Usage: `c4d-feature-section::part(row--container)`
 * @csspart row--body -  The row body. Usage: `c4d-feature-section::part(row--body)`
 * @csspart col -  All column itens. Usage: `c4d-feature-section::part(col)`
 * @csspart col--body-wrapper - The column wrapper. Usage: `c4d-feature-section::part(col--body-wrapper)`
 * @csspart col--body -  The column body. Usage: `c4d-feature-section::part(col--body)`
 * @csspart col--image - The column image. Usage: `c4d-feature-section::part(col--image)`
 */
@customElement(`${c4dPrefix}-feature-section`)
class C4DFeatureSection extends StableSelectorMixin(C4DFeatureCard) {
  /**
   * Color scheme type (regular (default) | inverse | cyan | purple )
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = COLOR_SCHEME.REGULAR;

  @property({ attribute: 'media-alignment', reflect: true })
  mediaAlignment = MEDIA_ALIGNMENT.RIGHT;

  render() {
    return html`
      ${this.mediaAlignment === MEDIA_ALIGNMENT.LEFT
        ? html`
            <div
              class="${prefix}--grid ${prefix}--feature-section"
              part="grid grid--wrapper">
              <div
                class="${prefix}--row ${prefix}--feature-section__container"
                part="row row--container">
                <div
                  class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__image"
                  part="col col--image">
                  <slot name="image"></slot>
                </div>
                <div
                  class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__body"
                  part="col col--body-wrapper">
                  <div class="${prefix}--grid" part="grid grid--body">
                    <div class="${prefix}--row" part="row row--body">
                      <div
                        class="${prefix}--col-sm-4 ${prefix}--col-md-6 ${prefix}--col-lg-12"
                        part="col col--body">
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
            <div
              class="${prefix}--grid ${prefix}--feature-section"
              part="grid grid--wrapper">
              <div
                class="${prefix}--row ${prefix}--feature-section__container"
                part="row row--container">
                <div
                  class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__body"
                  part="col col--body-wrapper">
                  <div class="${prefix}--grid" part="grid grid--body">
                    <div class="${prefix}--row" part="row row--body">
                      <div
                        class="${prefix}--col-sm-4 ${prefix}--col-md-6 ${prefix}--col-lg-12"
                        part="col col--body">
                        <slot name="eyebrow"></slot>
                        <slot name="heading"></slot>
                        <slot name="copy"></slot>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--feature-section__image"
                  part="col col--image">
                  <slot name="image"></slot>
                  <slot name="footer"></slot>
                </div>
              </div>
            </div>
          `}
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
