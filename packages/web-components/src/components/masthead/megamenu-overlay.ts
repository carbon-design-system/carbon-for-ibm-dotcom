/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Megamenu overlay.
 *
 * @element dds-megamenu-overlay
 */
@customElement(`${ddsPrefix}-megamenu-overlay`)
class DDSMegaMenuOverlay extends LitElement {
  /**
   * `true` if this overlay should represent its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default DDSMegaMenuOverlay;
