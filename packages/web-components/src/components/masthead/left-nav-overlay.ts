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
import styles from './masthead.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Left nav overlay.
 *
 * @element c4d-left-nav-overlay
 */
@customElement(`${c4dPrefix}-left-nav-overlay`)
class C4DLeftNavOverlay extends LitElement {
  /**
   * `true` if this overlay should represent its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  connectedCallback() {
    super.connectedCallback();
    if (this.closest('[dir]')) {
      this.dir = (this.closest('[dir]') as HTMLElement)!.dir;
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default C4DLeftNavOverlay;
