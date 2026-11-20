/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit/decorators.js';
import CDSSkipToContent from '@carbon/web-components/es/components/skip-to-content/skip-to-content.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './masthead.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Skip to content button in masthead.
 *
 * @element c4d-masthead-skip-to-content
 */
@customElement(`${c4dPrefix}-skip-to-content`)
class C4DSkipToContent extends CDSSkipToContent {
  /**
   * The shadow slot this logo UI should be in.
   */
  @property({ reflect: true })
  slot = 'brand';

  static styles = styles;
}

export default C4DSkipToContent;
