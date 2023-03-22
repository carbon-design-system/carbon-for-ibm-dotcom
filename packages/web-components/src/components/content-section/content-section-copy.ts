/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './content-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSMarkdown from '../markdown/markdown';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Copy content in content section.
 *
 * @element dds-content-section-copy
 */
@carbonElement(`${ddsPrefix}-content-section-copy`)
class DDSContentSectionCopy extends StableSelectorMixin(DDSMarkdown) {
  @property({ reflect: true })
  slot = 'copy';

  render() {
    return html` <slot></slot> `;
  }

  firstUpdated() {
    this.querySelector('p')?.setAttribute('style', 'all:unset;');
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-section-copy`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentSectionCopy;
