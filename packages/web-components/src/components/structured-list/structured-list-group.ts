/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DStructuredList from './structured-list';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * StructuredListGroup
 *
 * @element c4d-structured-list-group
 * @csspart row - The table group title row. Usage `c4d-structured-list-group::part(row)`
 * @csspart row--group-title - The table group title row. Usage `c4d-structured-list-group::part(row--group-title)`
 * @csspart group-title - The group title. Usage `c4d-structured-list-group::part(group-title)`
 */
@customElement(`${c4dPrefix}-structured-list-group`)
class C4DStructuredListGroup extends StableSelectorMixin(LitElement) {
  _parentTable: C4DStructuredList | null = this.closest(
    `${c4dPrefix}-structured-list`
  );

  @property({ attribute: 'title' })
  groupTitle?: string;

  connectedCallback() {
    super.connectedCallback();
  }

  private _renderTitle() {
    // Set colspan to max value to ensure it spans all columns.
    return html`
      <tr part="row row--group-title">
        <th part="group-title" colspan="999">${this.groupTitle}</th>
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

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DStructuredListGroup;
