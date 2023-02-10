/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXStructuredListHeaderCell from '../../internal/vendor/@carbon/web-components/components/structured-list/structured-list-header-cell.js';
import { customElement } from 'lit/decorators.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListHeaderCell
 *
 * @element dds-structured-list-header-cell
 */
@customElement(`${ddsPrefix}-structured-list-header-cell`)
class DDSStructuredListHeaderCell extends BXStructuredListHeaderCell {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListHeaderCell;
