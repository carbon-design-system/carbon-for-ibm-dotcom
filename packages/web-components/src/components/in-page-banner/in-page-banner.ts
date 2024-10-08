/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DContentGroup from '../content-group/content-group';
import styles from './in-page-banner.scss';
import { COLOR_SCHEME } from './defs';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * In Page Banner.
 *
 * @element c4d-in-page-banner
 */
@customElement(`${c4dPrefix}-in-page-banner`)
class C4DInPageBanner extends StableSelectorMixin(C4DContentGroup) {
  /**
   * Color scheme type (regular (default) | layer | cyan | purple )
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = COLOR_SCHEME.REGULAR;

  static get stableSelector() {
    return `${c4dPrefix}--in-page-banner`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DInPageBanner;
