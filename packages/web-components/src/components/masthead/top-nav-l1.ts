/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import C4DTopNav from './top-nav';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Masthead top nav for L1.
 *
 * @element c4d-top-nav-l1
 */
@customElement(`${c4dPrefix}-top-nav-l1`)
class C4DTopNavL1 extends C4DTopNav {
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
    return `${c4dPrefix}--masthead__l1-nav`;
  }
}

export default C4DTopNavL1;
