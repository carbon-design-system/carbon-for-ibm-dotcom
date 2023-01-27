/**
 * * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from './structured-list';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListGroup base class.
 */
export class DDSStructuredListGroupBase extends StableSelectorMixin(
  LitElement
) {
  _parentTable: DDSStructuredList | null = this.closest(
    `${ddsPrefix}-structured-list`
  );

  @property({ attribute: 'title' })
  groupTitle?: string;

  connectedCallback() {
    super.connectedCallback();
  }

  private _renderTitle() {
    // set colspan to max value to ensure it spans all columns
    return html`
      <tr>
        <th colspan="999">${this.groupTitle}</th>
      </tr>
    `;
  }

  render() {
    return html`
      ${this.groupTitle ? this._renderTitle() : ''}
      <slot></slot>
    `;
  }

  static styles = styles;
}

/**
 * StructuredListGroup
 *
 * @element dds-structured-list-group
 */
@customElement(`${ddsPrefix}-structured-list-group`)
class DDSStructuredListGroup extends DDSStructuredListGroupBase {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSStructuredListGroup;
