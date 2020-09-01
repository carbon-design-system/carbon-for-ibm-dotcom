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
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * @param options The options, with a video name and a formatted video duration.
 * @returns The formatted video caption.
 */
export function formatCaption({ duration, name }: { duration?: string; name?: string }) {
  return !name || typeof duration === 'undefined' ? name || duration || '' : `${name} (${duration})`;
}

/**
 * @param options The options, with a video duration.
 * @returns The formatted video duration.
 */
export function formatDuration({ duration }: { duration?: number }) {
  const minutes = Math.floor((duration ?? 0) / 60);
  const seconds = Math.floor((duration ?? 0) % 60);
  const fillSeconds = Array.from({ length: 2 - String(seconds).length + 1 }).join('0');
  return typeof duration === 'undefined' ? undefined : `${minutes}:${fillSeconds}${seconds}`;
}

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
  formatCaption = formatCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration = formatDuration;

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
    const { duration, formatCaption: formatCaptionInEffect, formatDuration: formatDurationInEffect, hideCaption, name } = this;
    return html`
      <div class="${prefix}--video-player__video-container">
        <slot></slot>
      </div>
      ${hideCaption
        ? undefined
        : html`
            <div class="${prefix}--video-player__video-caption">
              ${formatCaptionInEffect({ duration: formatDurationInEffect({ duration }), name })}
            </div>
          `}
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('duration') || changedProperties.has('formatCaption') || changedProperties.has('name')) {
      const { duration, formatCaption: formatCaptionInEffect, formatDuration: formatDurationInEffect, name } = this;
      const caption = formatCaptionInEffect({ duration: formatDurationInEffect({ duration }), name });
      if (caption) {
        this.setAttribute('aria-label', caption);
      }
    }
  }
}

export default DDSVideoPlayer;
