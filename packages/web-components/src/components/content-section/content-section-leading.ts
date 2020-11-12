/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './content-section.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Leading content in content section.
 *
 * @element dds-content-section-leading
 */
@customElement(`${ddsPrefix}-content-section-leading`)
class DDSContentSectionLeading extends LitElement {
  @property({ reflect: true })
  slot = 'leading';

  render() {
    return html`
      <slot name="heading"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }

  static styles = styles;
}

export default DDSContentSectionLeading;
