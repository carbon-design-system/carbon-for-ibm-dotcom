/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import styles from './masthead.scss';

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
