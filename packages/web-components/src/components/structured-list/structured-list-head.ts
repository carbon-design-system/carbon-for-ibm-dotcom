/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSStructuredListHead from '@carbon/web-components/es/components/structured-list/structured-list-head.js';
import {} from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * StructuredListHead
 *
 * @element c4d-structured-list-head
 */
@customElement(`${c4dPrefix}-structured-list-head`)
class C4DStructuredListHead extends CDSStructuredListHead {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DStructuredListHead;
