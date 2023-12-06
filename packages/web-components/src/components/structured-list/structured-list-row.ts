/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSStructuredListRow from '../../internal/vendor/@carbon/web-components/components/structured-list/structured-list-row.js';
import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * StructuredListRow
 *
 * @element c4d-structured-list-row
 */
@customElement(`${c4dPrefix}-structured-list-row`)
class C4DStructuredListRow extends CDSStructuredListRow {
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
export default C4DStructuredListRow;
