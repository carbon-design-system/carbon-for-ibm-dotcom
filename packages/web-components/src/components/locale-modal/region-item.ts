/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import C4DCard from '../card/card';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './locale-modal.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Region item.
 *
 * @element c4d-region-item
 * @csspart button - Targets all buttons  - Usage: `c4d-region-item::part(button)`
 * @csspart button--disabled - The disabled button - Usage: `c4d-region-item::part(button--disabled)`
 * @csspart button--enabled - The enabled button - Usage: `:c4d-region-item:part(button--enabled)`
 * @csspart content- Targets all content wrappers - Usage: `c4d-region-item::part(content)`
 * @csspart disabled-content - The disabled content wrapper - Usage: `c4d-region-item::part(disabled-content)`
 * @csspart enabled-content - The enabled content wrapper - Usage: `:c4d-region-item:part(enabled-content)`
 */
@customElement(`${c4dPrefix}-region-item`)
class C4DRegionItem extends C4DCard {
  /**
   * `true` if this region has no countries.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The region name.
   */
  @property({ reflect: true })
  name = '';

  protected _cardClasses = classMap({
    [`${prefix}--tile`]: true,
    [`${prefix}--card`]: true,
    [`${prefix}--tile--clickable`]: true,
    [`${prefix}--card--link`]: true,
  });

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes, _cardClasses: cardClasses } = this;
    return html`
      <button
        id="link"
        class="${classes}"
        disabled
        type="button"
        part="button button--disabled">
        <div class="${cardClasses}" part="content disabled-content">
          ${this._renderInner()}
        </div>
      </button>
    `;
  }

  render() {
    const { _classes: classes, disabled, _cardClasses: cardClasses } = this;
    return disabled
      ? this._renderDisabledLink()
      : html`
          <button
            id="link"
            class="${classes}"
            type="button"
            part="button button--enabled">
            <div class="${cardClasses}" part="content enabled-content">
              ${this._renderInner()}
            </div>
          </button>
        `;
  }

  updated(changedProperties) {
    if (changedProperties.has('name')) {
      const { name } = this;
      this.dataset.autoId = `${c4dPrefix}--locale-modal__geo-btn-${name}`;
    }
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

export default C4DRegionItem;
