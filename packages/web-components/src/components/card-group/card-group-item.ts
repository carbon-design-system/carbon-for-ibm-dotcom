/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCardCTA from '../cta/card-cta';
import styles from './card-group.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card Group item.
 *
 * @element dds-card-group-item
 */
@customElement(`${ddsPrefix}-card-group-item`)
class DDSCardGroupItem extends DDSCardCTA {
  static styles = styles;
}

export default DDSCardGroupItem;
