/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSImage from '../image/image';
import styles from './background-media.scss';
import { GRADIENT_DIRECTION, MOBILE_POSITION } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Background media.
 *
 * @element dds-background-media
 */

@customElement(`${ddsPrefix}-background-media`)
class DDSBackgroundMedia extends DDSImage {
  /**
   * Returns a class-name based on the Gradient Direction type
   */
  protected _getGradientClass() {
    return classMap({
      [`${prefix}--background-media--gradient`]: true,
      [`${prefix}--background-media--gradient--left-to-right`]: this.gradientDirection === GRADIENT_DIRECTION.LEFT_TO_RIGHT,
      [`${prefix}--background-media--gradient--top-to-bottom`]: this.gradientDirection === GRADIENT_DIRECTION.TOP_TO_BOTTOM,
    });
  }

  /**
   * Returns a class-name based on the Mobile Position type
   */
  protected _getMobilePositionClass() {
    return classMap({
      [`${prefix}--background-media--mobile-position`]: true,
      [`${prefix}--background-media--mobile-position--top`]: this.mobilePosition === MOBILE_POSITION.TOP,
      [`${prefix}--background-media--mobile-position--bottom`]: this.mobilePosition === MOBILE_POSITION.BOTTOM,
    });
  }

  /**
   * Gradient Direction (left-to-right (default) | top-to-bottom)
   */
  @property({ attribute: 'gradient-direction', reflect: true })
  gradientDirection = GRADIENT_DIRECTION.LEFT_TO_RIGHT;

  /**
   * Mobile Position (bottom (default) | top)
   */
  @property({ attribute: 'mobile-position', reflect: true })
  mobilePosition = MOBILE_POSITION.BOTTOM;

  /**
   * Append the dds-background-media to the parent element where this component is being used.
   */
  updated() {
    if (this.mobilePosition === MOBILE_POSITION.TOP) {
      this.parentElement?.shadowRoot?.prepend(this);
    }
  }

  render() {
    return html`
      <div class="${this._getMobilePositionClass()}">
        <div class="${this._getGradientClass()}"></div>
        ${super.render()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--background-media`;
  }

  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSBackgroundMedia;
