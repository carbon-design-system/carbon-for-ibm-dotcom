/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import DDSCardHeading from '../card/card-heading';
import styles from './card-link.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card Link Heading.
 *
 * @element dds-card-link-heading
 */
@customElement(`${ddsPrefix}-card-link-heading`)
class DDSCardLinkHeading extends DDSCardHeading {
  static get stableSelector() {
    return `${ddsPrefix}--card-link-heading`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardLinkHeading;
