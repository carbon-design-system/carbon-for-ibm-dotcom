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
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Video player.
 *
 * @element dds-video-player
 */
@customElement(`${ddsPrefix}-video-player`)
class DDSVideoPlayer extends FocusMixin(LitElement) {
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
  formatCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration = formatVideoDuration;

  /**
   * `true` to hide the caption.
   */
  @property({ type: Boolean, attribute: 'hide-caption' })
  hideCaption = false;

  /**
   * The video name.
   */
  @property()
  name = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { duration, formatCaption, formatDuration, hideCaption, name } = this;
    return html`
      <div class="${prefix}--video-player__video-container">
        <slot></slot>
      </div>
      ${hideCaption
        ? undefined
        : html`
            <div class="${prefix}--video-player__video-caption">
              ${formatCaption({ duration: formatDuration({ duration: !duration ? duration : duration * 1000 }), name })}
            </div>
          `}
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('duration') || changedProperties.has('formatCaption') || changedProperties.has('name')) {
      const { duration, formatCaption, formatDuration, name } = this;
      const caption = formatCaption({ duration: formatDuration({ duration: !duration ? duration : duration * 1000 }), name });
      if (caption) {
        this.setAttribute('aria-label', caption);
      }
    }
  }
}

export default DDSVideoPlayer;
