/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import BXButton from '../../internal/vendor/@carbon/web-components/components/button/button';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { CTA_TYPE } from '../cta/defs';
import styles from './masthead.scss';

export { CTA_TYPE };

const { stablePrefix: c4dPrefix } = settings;

/**
 * Masthead Button CTA.
 *
 * @element c4d--masthead-button-cta
 */
@customElement(`${c4dPrefix}-masthead-button-cta`)
class C4DMastheadButtonCTA extends BXButton {
  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
  }
}

export default C4DMastheadButtonCTA;
