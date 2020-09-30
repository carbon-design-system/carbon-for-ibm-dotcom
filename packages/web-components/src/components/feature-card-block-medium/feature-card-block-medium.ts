/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './feature-card-block-medium.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Medium
 *
 * @element dds-feature-card-block-medium
 */
@customElement(`${ddsPrefix}-feature-card-block-medium`)
class DDSFeatureCardBlockMedium extends LitElement {
  static styles = styles;

  protected render() {
    return html`
      <slot name="heading"></slot><slot></slot>
    `;
  }
}

export default DDSFeatureCardBlockMedium;
