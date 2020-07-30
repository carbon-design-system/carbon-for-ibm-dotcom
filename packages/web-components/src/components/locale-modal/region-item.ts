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
import ArrowRight20 from 'carbon-custom-elements/es/icons/arrow--right/20';
import Error20 from 'carbon-custom-elements/es/icons/error/20';
import HostListener from 'carbon-custom-elements/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-custom-elements/es/globals/mixins/host-listener';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
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
   * @returns The inner content.
   */
  _renderInner() {
    const { invalid, name } = this;
    return html`
      <div class="${prefix}--card__wrapper">
        <h3 class="${prefix}--card__heading">
          <slot>${name}</slot>
        </h3>
        <div class="${prefix}--card__footer">
          ${(invalid ? Error20 : ArrowRight20)({ class: `${prefix}--card__cta` })}
        </div>
      </div>
    `;
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
