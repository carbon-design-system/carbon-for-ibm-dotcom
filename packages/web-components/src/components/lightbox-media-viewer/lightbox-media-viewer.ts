/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSLightboxMediaViewerBody from './lightbox-media-viewer-body';
import '../video-player/video-player';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import styles from './lightbox-video-player-composite.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The image content of lightbox media viewer.
 *
 * @element dds-lightbox-image-viewer
 * @slot title - The title content.
 * @slot description - The description content.
 */
@customElement(`${ddsPrefix}-lightbox-media-viewer`)
class DDSLightboxMediaViewer extends DDSLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html`
      <slot name="description">${description}</slot>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    // const { videoId } = this;
    // if (videoId) {
    //   return this._renderVideoMedia();
    // }

    // return this._renderImageMedia();
    return html`
      <slot name="media"></slot>
    `;
  }

  _renderImageMedia() {
    const { alt, defaultSrc } = this;
    return html`
      <img class="${prefix}--image__img" alt="${ifNonNull(alt)}" src="${ifNonNull(defaultSrc)}" loading="lazy" />
    `;
  }

  _renderVideoMedia() {
    const { videoId, caption, hideCaption, thumbnail } = this;
    return html`
      <dds-video-player-container
        playing-mode="inline"
        video-id=${videoId}
        caption=${caption}
        ?hide-caption=${hideCaption}
        thumbnail=${thumbnail}
      ></dds-video-player-container>
    `;
  }

  _renderTitle() {
    const { title } = this;
    return html`
      <slot name="title">${title}</slot>
    `;
  }

  update(changedProperties) {
    if (this.videoId) {
      const { videoId, caption, hideCaption, thumbnail } = this;
      this.innerHTML = `
        <dds-video-player-container
          playing-mode="inline"
          video-id="${videoId}"
          caption="${caption}"
          ?hide-caption="${hideCaption}"
          thumbnail="${thumbnail}"
          slot="media"
        ></dds-video-player-container>
      `;
    } else {
      const { alt, defaultSrc } = this;
      this.innerHTML = `
        <img
          class="${prefix}--image__img"
          alt="${alt}"
          src="${defaultSrc}"
          loading="lazy"
          slot="media"
          style="max-width:100%;max-height:100%"
        />
      `;
    }
    super.update(changedProperties);
  }

  /**
   * The alternate text.
   */
  @property()
  alt = '';

  /**
   * The image source.
   */
  @property({ attribute: 'default-src' })
  defaultSrc = '';

  /**
   * The media description.
   */
  @property()
  description = '';

  /**
   * The media title.
   */
  @property()
  title = '';

  @property({ attribute: 'video-id' })
  videoId = '';

  @property()
  caption = '';

  @property()
  hideCaption = false;

  @property()
  thumbnail = '';
}

export default DDSLightboxMediaViewer;
