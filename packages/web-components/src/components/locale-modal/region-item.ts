/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import ArrowRight20 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import CDSLink from '../../internal/vendor/@carbon/web-components/components/link/link.js';
import Error20 from '../../internal/vendor/@carbon/web-components/icons/error/20.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './locale-modal.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Region item.
 *
 * @element c4d-region-item
 */
@customElement(`${c4dPrefix}-region-item`)
class C4DRegionItem extends CDSLink {
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
      this.dataset.autoId = `${c4dPrefix}--locale-modal__geo-btn-${name}`;
    }
  }

  static styles = styles;
}

export default C4DRegionItem;
