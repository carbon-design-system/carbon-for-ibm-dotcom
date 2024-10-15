/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './masthead.scss?lit';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Megamenu overlay.
 *
 * @element c4d-megamenu-overlay
 */
@customElement(`${c4dPrefix}-megamenu-overlay`)
class C4DMegaMenuOverlay extends LitElement {
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

export default C4DMegaMenuOverlay;
