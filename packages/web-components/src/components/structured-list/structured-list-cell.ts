/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXStructuredListCell from '@carbon/carbon-web-components/es/components/structured-list/structured-list-cell.js';
import { customElement, property, html } from 'lit-element';
import Info16 from '@carbon/carbon-web-components/es/icons/information/16.js';
import Checkmark20 from '@carbon/carbon-web-components/es/icons/checkmark/20.js';
import Error20 from '@carbon/carbon-web-components/es/icons/error/20.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSStructuredListGroup from './structured-list-group';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * StructuredListCell
 *
 * @element dds-structured-list-cell
 */
@customElement(`${ddsPrefix}-structured-list-cell`)
class DDSStructuredListCell extends BXStructuredListCell {
  parentGroup: DDSStructuredListGroup | null = this.closest(
    `${ddsPrefix}-structured-list-group`
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

    return html` ${iconMap[icon!.toLowerCase()].call()} `;
  }

  private _renderTags() {
    const { tags } = this;

    return html`
      ${tags!
        .split(',')
        .map(
          (tag) => html` <bx-tag size="sm" type="green">${tag.trim()}</bx-tag> `
        )}
    `;
  }

  private _renderTooltip() {
    const { tooltipText: tooltip } = this;

    return html`
      <bx-tooltip-icon
        alignment="start"
        body-text="${tooltip}"
        direction="right"
      >
        ${Info16()}
      </bx-tooltip-icon>
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
export default DDSStructuredListCell;
