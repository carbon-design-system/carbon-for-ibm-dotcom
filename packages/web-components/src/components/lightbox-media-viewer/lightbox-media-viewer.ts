/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSLightboxMediaViewerBody from './lightbox-media-viewer-body';
import DDSVideoPlayerContainer from '../video-player/video-player-container';
import DDSCarousel from '../carousel/carousel';
import DDSExpressiveModal from '../expressive-modal/expressive-modal';

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

  _renderMedia() {
    return html`
      <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  _renderTitle() {
    const { title } = this;
    return html`
      <slot name="title">${title}</slot>
    `;
  }

  private _mediaItem?: HTMLElement;

  @query(`.${prefix}--lightbox-media-viewer__media`)
  private _mediaWindow!: HTMLDivElement;

  private _containingCarousel?: DDSCarousel;

  private _containingModal?: DDSExpressiveModal;

  private _handleSlotChange(event: Event) {
    const { _containingModal: containingModal } = this;
    const [media] = (event.target as HTMLSlotElement).assignedNodes();
    this._mediaItem = media as HTMLImageElement | DDSVideoPlayerContainer;

    // Disconnect & delete intersection observer
    if (this._intersectionObserver instanceof IntersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = undefined;
    }

    // Remove modal closed listeners from the containing modal
    if (containingModal && this._boundModalClosedHandler) {
      containingModal.removeEventListener(DDSExpressiveModal.eventBeforeClose, this._boundModalClosedHandler);
      this._boundModalClosedHandler = undefined;
    }

    if (media instanceof DDSVideoPlayerContainer) {
      const { _mediaWindow: mediaWindow, _containingCarousel: containingCarousel } = this;

      // Watch for out-of-view if we're in a carousel
      if (mediaWindow && containingCarousel) {
        const callback = this._handleOutOfCarouselView.bind(this);
        this._intersectionObserver = new IntersectionObserver(callback, {
          root: containingCarousel,
          rootMargin: '999px 0px 999px 0px',
          threshold: 1,
        });

        this._intersectionObserver.observe(mediaWindow);
      }

      // Watch for modal close
      if (containingModal) {
        this._boundModalClosedHandler = this._handleModalClosed.bind(this);

        containingModal.addEventListener(DDSExpressiveModal.eventBeforeClose, this._boundModalClosedHandler);
      }
    }
  }

  private _intersectionObserver?: IntersectionObserver;

  private _handleOutOfCarouselView(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 1) {
        this._pauseVideo();
      }
    });
  }

  private _handleModalClosed() {
    this._pauseVideo();
  }

  private _pauseVideo() {
    const { _mediaItem: mediaItem } = this;

    if (mediaItem instanceof DDSVideoPlayerContainer) {
      mediaItem.pauseAllVideos();
    }
  }

  _boundModalClosedHandler?: EventListenerOrEventListenerObject;

  connectedCallback() {
    super.connectedCallback();

    this._containingCarousel = (this.closest(`${ddsPrefix}-carousel`) as DDSCarousel) || undefined;
    this._containingModal = (this.closest(`${ddsPrefix}-expressive-modal`) as DDSExpressiveModal) || undefined;
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

  static get eventBeforeModalClose() {
    return `${ddsPrefix}-expressive-modal-beingclosed`;
  }
}

export default DDSLightboxMediaViewer;
