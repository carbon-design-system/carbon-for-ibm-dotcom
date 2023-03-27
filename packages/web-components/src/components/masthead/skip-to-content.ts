/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit-element';
import BXSkipToContent from '../../internal/vendor/@carbon/web-components/components/skip-to-content/skip-to-content.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Skip to content button in masthead.
 *
 * @element dds-masthead-skip-to-content
 */
@customElement(`${ddsPrefix}-skip-to-content`)
class DDSSkipToContent extends BXSkipToContent {
  /**
   * The shadow slot this logo UI should be in.
   */
  @property({ reflect: true })
  slot = 'brand';

  static styles = styles;
}

export default DDSSkipToContent;
