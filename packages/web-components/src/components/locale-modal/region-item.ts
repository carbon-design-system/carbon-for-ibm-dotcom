/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Error20 from 'carbon-web-components/es/icons/error/20.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSLink from '../../globals/internal/link';
import styles from './locale-modal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Region item.
 *
 * @element dds-region-item
 */
@customElement(`${ddsPrefix}-region-item`)
class DDSRegionItem extends HostListenerMixin(DDSLink) {
  /**
   * Handles 'click' event on this element.
   *
   * @param event The event.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  // eslint-disable-next-line class-methods-use-this
  private _handleClick(event: MouseEvent) {
    event.preventDefault();
  }

  /**
   * The link href.
   */
  @property({ reflect: true })
  href = '#';

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
      <div id="link" class="${classes}">${this._renderInner()}</div>
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
            ${(invalid ? Error20 : ArrowRight20)({ class: `${prefix}--card__cta` })}
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
