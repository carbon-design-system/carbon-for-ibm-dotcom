/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import C4DCardHeading from '../card/card-heading';
import styles from './card-link.scss?lit';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Card Link Heading.
 *
 * @element c4d-card-link-heading
 */
@customElement(`${c4dPrefix}-card-link-heading`)
class C4DCardLinkHeading extends C4DCardHeading {
  static get stableSelector() {
    return `${c4dPrefix}--card-link-heading`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardLinkHeading;
