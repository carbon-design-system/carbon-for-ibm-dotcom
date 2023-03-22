/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Left nav overlay.
 *
 * @element dds-left-nav-overlay
 */
@carbonElement(`${ddsPrefix}-left-nav-overlay`)
class DDSLeftNavOverlay extends LitElement {
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

export default DDSLeftNavOverlay;
