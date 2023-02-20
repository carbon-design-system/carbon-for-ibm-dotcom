/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property, html } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './universal-banner.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSMarkdown from '../markdown/markdown';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The paragraph content in the universal banner
 *
 * @element dds-universal-banner-copy
 */
@customElement(`${ddsPrefix}-universal-banner-copy`)
class DDSUniversalBannerCopy extends StableSelectorMixin(DDSMarkdown) {
  @property({ reflect: true })
  slot = 'copy';

  render() {
    return html` <slot></slot> `;
  }

  firstUpdated() {
    this.querySelector('p')?.setAttribute('style', 'all:unset;');
  }

  static get stableSelector() {
    return `${ddsPrefix}-universal-banner-copy`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSUniversalBannerCopy;
