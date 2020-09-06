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
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSLightboxMediaViewerBody from './lightbox-media-viewer-body';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The video content of lightbox media viewer.
 *
 * @element dds-lightbox-video-player
 */
@customElement(`${ddsPrefix}-lightbox-video-player`)
class DDSLightboxVideoPlayer extends DDSLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html`
      <slot name="description">${description}</slot>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    return html`
      <div class="${prefix}--video-player">
        <div class="${prefix}--video-player__video-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  _renderTitle() {
    const { duration, formatCaption, name } = this;
    return html`
      <slot name="title">${formatCaption({ duration, name })}</slot>
    `;
  }

  /**
   * The media description.
   */
  @property()
  description = '';

  /**
   * The video duration.
   */
  @property({ type: Number })
  duration?: number;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption = ({ duration, name }: { duration?: number; name: string }) => {
    const minutes = Math.floor((duration ?? 0) / 60);
    const seconds = Math.floor((duration ?? 0) % 60);
    const fillSeconds = Array.from({ length: 2 - String(seconds).length + 1 }).join('0');
    return !name || typeof duration === 'undefined' ? name : `${name} (${minutes}:${fillSeconds}${seconds})`;
  };

  /**
   * The video name.
   */
  @property()
  name = '';
}

export default DDSLightboxVideoPlayer;
