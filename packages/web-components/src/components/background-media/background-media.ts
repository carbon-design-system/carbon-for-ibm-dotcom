/**
 * @license
 *
 * Copyright IBM Corp.  2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement, css } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSImage from '../image/image';
import styles from './background-media.scss';
import { GRADIENT_DIRECTION, MOBILE_POSITION } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Background Media.
 *
 * @element dds-background-media
 * @slot long-description - The long description content.
 * @slot icon - The icon content.
 */
@customElement(`${ddsPrefix}-background-media`)
class DDSBackgroundMedia extends DDSImage {

  @property({ attribute: 'source' })
  source = ''; 

  @property({ attribute: 'gradient-direction', reflect: true })
  gradient_direction = GRADIENT_DIRECTION.RIGHT;

  @property({ attribute: 'mobile-position', reflect: true })
  mobile_position = MOBILE_POSITION.TOP;

  render() {
    
    return html`
      <div class="${prefix}--background-media-container">
      <slot></slot>
        <div class="${prefix}--background-media-gradient">
          <img class="${prefix}--background-media-image" src="${this.source}">
        </div>

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