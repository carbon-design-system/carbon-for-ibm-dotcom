/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import removeHtmlTagEntities from '@carbon/ibmdotcom-utilities/es/utilities/removeHtmlTagEntities/removeHtmlTagEntities.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import C4DLightboxMediaViewerBody from './lightbox-media-viewer-body';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The video content of lightbox media viewer.
 *
 * @element c4d-lightbox-video-player
 * @slot title - The title content.
 * @slot description - The description content.
 * @csspart container - The wrapper around the lightbox media. Usage: `c4d-lightbox-video-player::part(container)`
 * @csspart row - The wrapper around the row. Usage: `c4d-lightbox-video-player::part(row)`
 * @csspart media - The wrapper around media. Usage: `c4d-lightbox-video-player::part(media)`
 * @csspart content-wrapper - The wrapper around content. Usage: `c4d-lightbox-video-player::part(content-wrapper)`
 * @csspart content - The inner wrapper around content. Usage: `c4d-lightbox-video-player::part(content)`
 * @csspart title - The title of the media. Usage: `c4d-lightbox-video-player::part(title)`
 * @csspart description - The description of the media. Usage: `c4d-lightbox-video-player::part(description)`
 * @csspart video-player - The wrapper around the video player. Usage: `c4d-lightbox-video-player::part(video-player)`
 * @csspart video-container - The inner wrapper around the slotted video player. Usage: `c4d-lightbox-video-player::part(video-container)`
 * @csspart h2 - The h2 element that holds the title. Usage: `c4d-lightbox-video-player::part(h2)`
 */
@customElement(`${c4dPrefix}-lightbox-video-player`)
class C4DLightboxVideoPlayer extends C4DLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html`
      <slot name="description">${removeHtmlTagEntities(description)}</slot>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    return html`
      <div class="${c4dPrefix}--video-player" part="video-player">
        <div
          class="${c4dPrefix}--video-player__video-container"
          part="video-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  _renderTitle() {
    const { duration, formatCaption, formatDuration, name } = this;
    return html`
      <slot name="title">
        <h2 style="all: inherit;" part="h2">
          ${formatCaption({
            duration: formatDuration({
              duration: !duration ? duration : duration * 1000,
            }),
            name,
          })}
        </h2>
      </slot>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('name')) {
      this.setAttribute('aria-label', this.name);
    }
  }

  connectedCallback() {
    this.setAttribute('role', 'dialog');
    super.connectedCallback();
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
  formatCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration = formatVideoDuration;

  /**
   * The video name.
   */
  @property()
  name = '';
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLightboxVideoPlayer;
