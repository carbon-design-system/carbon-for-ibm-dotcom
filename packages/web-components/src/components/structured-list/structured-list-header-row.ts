/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXStructuredListHeaderRow from '@carbon/web-components/es/components/structured-list/structured-list-header-row.js';
import { customElement } from 'lit/decorators.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListHeaderRow
 *
 * @element dds-structured-list-header-row
 */
@customElement(`${ddsPrefix}-structured-list-header-row`)
class DDSStructuredListHeaderRow extends BXStructuredListHeaderRow {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListHeaderRow;
