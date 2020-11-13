/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCard from '../card/card';
import styles from './content-group-cards.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content Group Card item.
 *
 * @element dds-content-group-card-item
 */
@customElement(`${ddsPrefix}-content-group-cards-item`)
class DDSContentGroupCardsItem extends DDSCard {
  /**
   * The shadow slot the Content Group Card Item should be in.
   */
  @property({ reflect: true })
  slot = 'content';

  static styles = styles;
}

export default DDSContentGroupCardsItem;
