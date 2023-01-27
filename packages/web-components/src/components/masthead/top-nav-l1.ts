/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { DDSTopNavBase } from './top-nav';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead top nav for L1.
 *
 * @element dds-top-nav-l1
 */
@customElement(`${ddsPrefix}-top-nav-l1`)
class DDSTopNavL1 extends DDSTopNavBase {
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
