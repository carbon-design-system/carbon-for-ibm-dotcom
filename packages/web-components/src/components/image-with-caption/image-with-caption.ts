/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import '../image/image';
import '../lightbox-media-viewer/lightbox-image-viewer';
import '../button/button';
import '../modal/modal';
import 'carbon-web-components/es/components/modal/modal-close-button';
// import ZoomIn20 from 'carbon-web-components/es/zoom--in/20';
import styles from './image-with-caption.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;


/**
 * Image With Caption
 * @element dds-image-with-caption
 */

@customElement(`${ddsPrefix}-image-with-caption`)
class DDSImageWithCaption extends LitElement {

  lightbox = false;

  _handleClick () {
    this.lightbox = true;
    this.querySelector('.modaltest').open = true;
  }
  render() {

    return html`
    <dds-modal class="modaltest"><bx-modal-close-button/><dds-lightbox-image-viewer id="test" alt="lorum ipsum" default-src="https://lorempixel.com/400/200" description="lorum ipsum" title="lorem ipsum"/></dds-modal>
    <dds-image @click="${this._handleClick}" default-src="https://lorempixel.com/400/200"></dds-image>
    <p class="${prefix}--image__caption">
    <slot name="heading"></slot>
    </p>
    `;
  }
  static styles = styles;
}


export default DDSImageWithCaption;

