/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXStructuredListCell from 'carbon-web-components/es/components/structured-list/structured-list-cell';
import { customElement, property, html } from 'lit-element';
import Info16 from 'carbon-web-components/es/icons/information/16';
import Checkmark20 from 'carbon-web-components/es/icons/checkmark/20';
import Error20 from 'carbon-web-components/es/icons/error/20';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSStructuredListGroup from './structured-list-group';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list-cell`)
class DDSStructuredListCell extends BXStructuredListCell {
  _parentGroup: DDSStructuredListGroup | null = this.closest(`${ddsPrefix}-structured-list-group`);

  @property({ attribute: 'aria-label', reflect: true })
  _groupLabel: string | null = null;

  @property({ attribute: 'tooltip', reflect: true })
  _tooltipText: string | null = null;

  @property({ attribute: 'icon', reflect: true })
  _icon: string | null = null;

  _iconsAllowed = {
    checkmark: Checkmark20,
    error: Error20,
  };

  @property({ attribute: 'tags', reflect: true })
  _tags: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._groupLabel = this._parentGroup?.groupTitle || null;
  }

  _renderIcon() {
    const { _icon: icon, _iconsAllowed: iconMap } = this;

    return html`
      ${iconMap[icon!.toLowerCase()].call()}
    `;
  }

  _renderTags() {
    const { _tags: tags } = this;

    return html`
      ${tags!.split(',').map(
        tag =>
          html`
            <bx-tag size="sm" type="green">${tag.trim()}</bx-tag>
          `
      )}
    `;
  }

  _renderTooltip() {
    const { _tooltipText: tooltip } = this;

    return html`
      <bx-tooltip-icon alignment="start" body-text="${tooltip}" direction="right">
        ${Info16()}
      </bx-tooltip-icon>
    `;
  }

  render() {
    const { _tooltipText: tooltip, _icon: icon, _iconsAllowed: iconsAllowed, _tags: tags } = this;

    if (icon && Object.keys(iconsAllowed).includes(icon.toLowerCase())) {
      return html`
        ${this._renderIcon()}
      `;
    }

    return html`
      ${super.render()} ${tags ? this._renderTags() : ''} ${tooltip ? this._renderTooltip() : ''}
    `;
  }

  static styles = styles;
}

export default DDSStructuredListCell;
