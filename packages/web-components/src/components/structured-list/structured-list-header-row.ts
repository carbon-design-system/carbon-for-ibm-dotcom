/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSStructuredListHeaderRow from '@carbon/web-components/es/components/structured-list/structured-list-header-row.js';
import {} from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * StructuredListHeaderRow
 *
 * @element c4d-structured-list-header-row
 */
@customElement(`${c4dPrefix}-structured-list-header-row`)
class C4DStructuredListHeaderRow extends CDSStructuredListHeaderRow {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DStructuredListHeaderRow;
