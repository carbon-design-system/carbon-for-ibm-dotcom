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
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Left nav overlay.
 *
 * @element dds-left-nav-overlay
 */
@customElement(`${ddsPrefix}-left-nav-overlay`)
class DDSLeftNavOverlay extends LitElement {
  /**
   * `true` if this overlay should represent its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default DDSLeftNavOverlay;
