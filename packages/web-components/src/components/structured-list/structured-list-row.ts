/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXStructuredListRow from '../../internal/vendor/@carbon/web-components/components/structured-list/structured-list-row.js';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListRow
 *
 * @element dds-structured-list-row
 */
@customElement(`${ddsPrefix}-structured-list-row`)
class DDSStructuredListRow extends BXStructuredListRow {
  connectedCallback() {
    super.connectedCallback();
  }

  /* eslint-disable */
  // @ts-ignore required to unset inherited functionality
  updated(changedProperties) {}
  /* eslint-enable */

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListRow;
