/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSStructuredListCell from '@carbon/web-components/es/components/structured-list/structured-list-cell.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import Info16 from '@carbon/web-components/es/icons/information/16.js';
import Checkmark20 from '@carbon/web-components/es/icons/checkmark/20.js';
import Error20 from '@carbon/web-components/es/icons/error/20.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DStructuredListGroup from './structured-list-group';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * StructuredListCell
 *
 * @element c4d-structured-list-cell
 * @csspart icon-text - Descriptive text of the cell. Usage `c4d-structured-list-cell::part(icon-text)`
 * @csspart tag - Tags of the cell. Usage `c4d-structured-list-cell::part(tag)`
 * @csspart icon - An icon. Usage `c4d-structured-list-cell::part(icon)`
 */
@customElement(`${c4dPrefix}-structured-list-cell`)
class C4DStructuredListCell extends CDSStructuredListCell {
  parentGroup: C4DStructuredListGroup | null = this.closest(
    `${c4dPrefix}-structured-list-group`
  );

  @property({ attribute: 'aria-label', reflect: true })
  groupLabel?: string;

  @property({ attribute: 'tooltip', reflect: true })
  tooltipText?: string;

  @property({ attribute: 'icon', reflect: true })
  icon?: string;

  private _iconsAllowed = {
    checkmark: Checkmark20,
    error: Error20,
  };

  @property({ attribute: 'tags', reflect: true })
  tags?: string;

  connectedCallback() {
    super.connectedCallback();
    this.groupLabel = this.parentGroup?.groupTitle;
  }

  private _renderIcon() {
    const { icon, _iconsAllowed: iconMap } = this;

    return html`${iconMap[icon!.toLowerCase()].call()}
      <span class="${prefix}--structured-list-cell-icon-text" part="icon-text">
        <slot></slot>
      </span>`;
  }

  private _renderTags() {
    const { tags } = this;

    return html`
      ${tags!
        .split(',')
        .map(
          (tag) =>
            html`
              <cds-tag part="tag" size="sm" type="green">${tag.trim()}</cds-tag>
            `
        )}
    `;
  }

  private _renderTooltip() {
    const { tooltipText: tooltip } = this;

    return html`
      <cds-tooltip-icon
        part="icon"
        alignment="start"
        body-text="${tooltip}"
        direction="right">
        ${Info16()}
      </cds-tooltip-icon>
    `;
  }

  render() {
    const {
      tooltipText: tooltip,
      icon,
      _iconsAllowed: iconsAllowed,
      tags,
    } = this;

    if (icon && Object.keys(iconsAllowed).includes(icon.toLowerCase())) {
      return html` ${this._renderIcon()} `;
    }

    return html`
      ${super.render()} ${tags ? this._renderTags() : ''}
      ${tooltip ? this._renderTooltip() : ''}
    `;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DStructuredListCell;
