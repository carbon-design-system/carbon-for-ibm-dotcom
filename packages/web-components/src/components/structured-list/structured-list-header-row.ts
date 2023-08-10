/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSStructuredListHeaderRow from '../../internal/vendor/@carbon/web-components/components/structured-list/structured-list-header-row.js';
import {} from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = settings;

/**
 * StructuredListHeaderRow
 *
 * @element dds-structured-list-header-row
 */
@customElement(`${ddsPrefix}-structured-list-header-row`)
class DDSStructuredListHeaderRow extends CDSStructuredListHeaderRow {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListHeaderRow;
