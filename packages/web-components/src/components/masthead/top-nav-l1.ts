/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSTopNav from './top-nav';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-top-nav-l1`)
class DDSTopNavL1 extends DDSTopNav {
  // eslint-disable-next-line class-methods-use-this
  protected _handleSearchToggle = () => {
    // Do nothing
  };

  /**
   * `true` to hide the divider.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = true;

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l1-nav`;
  }
}

export default DDSTopNavL1;
