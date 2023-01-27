/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BXStructuredListBodyBase } from '@carbon/web-components/es/components/structured-list/structured-list-body.js';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListBody base class.
 */
export class DDSStructuredListBodyBase extends BXStructuredListBodyBase {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/**
 * StructuredListBody
 *
 * @element dds-structured-list-body
 */
@customElement(`${ddsPrefix}-structured-list-body`)
class DDSStructuredListBody extends DDSStructuredListBodyBase {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListBody;
