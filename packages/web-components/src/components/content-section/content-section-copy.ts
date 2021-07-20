/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './content-section.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Copy content in content section.
 *
 * @element dds-content-section-copy
 */
@customElement(`${ddsPrefix}-content-section-copy`)
class DDSContentSectionCopy extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  slot = 'copy';

  render() {
    return html`
      <slot></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-section-copy`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentSectionCopy;
