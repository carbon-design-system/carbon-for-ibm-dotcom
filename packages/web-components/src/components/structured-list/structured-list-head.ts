/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXStructuredListHead from '../../internal/vendor/@carbon/web-components/components/structured-list/structured-list-head.js';
import {} from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListHead
 *
 * @element dds-structured-list-head
 */
@customElement(`${ddsPrefix}-structured-list-head`)
class DDSStructuredListHead extends BXStructuredListHead {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListHead;
