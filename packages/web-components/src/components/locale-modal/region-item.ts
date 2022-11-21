/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import BXLink from 'carbon-web-components/es/components/link/link.js';
import Error20 from 'carbon-web-components/es/icons/error/20.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './locale-modal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Region item.
 *
 * @element dds-region-item
 */
@customElement(`${ddsPrefix}-region-item`)
class DDSRegionItem extends BXLink {
  /**
   * `true` if this region has no countries.
   */
  @property({ type: Boolean })
  invalid = false;

  /**
   * The region name.
   */
  @property({ reflect: true })
  name = '';

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <button id="link" class="${classes}" disabled type="button">
        ${this._renderInner()}
      </button>
    `;
  }

  /**
   * @returns The link content.
   */
  protected _renderLink() {
    const { _classes: classes } = this;
    return html`
      <button id="link" class="${classes}" type="button">
        ${this._renderInner()}
      </button>
    `;
  }

  /**
   * @returns The inner content.
   */
  _renderInner() {
    const { invalid, name } = this;
    return html`
      <div class="${prefix}--card__wrapper">
        <div class="${prefix}--card__content">
          <h3 class="${prefix}--card__heading">
            <slot>${name}</slot>
          </h3>
          <div class="${prefix}--card__footer">
            ${(invalid ? Error20 : ArrowRight20)({
              class: `${prefix}--card__cta`,
            })}
          </div>
        </div>
      </div>
    `;
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('invalid')) {
      this.disabled = this.invalid;
    }
    return true;
  }

  updated(changedProperties) {
    if (changedProperties.has('name')) {
      const { name } = this;
      this.dataset.autoId = `${ddsPrefix}--locale-modal__geo-btn-${name}`;
    }
  }

  static styles = styles;
}

export default DDSRegionItem;
