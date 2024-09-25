/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DLightboxMediaViewerBody from './lightbox-media-viewer-body';
import C4DVideoPlayerContainer from '../video-player/video-player-container';
import C4DCarousel from '../carousel/carousel';
import C4DExpressiveModal from '../expressive-modal/expressive-modal';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The image content of lightbox media viewer.
 *
 * @element c4d-lightbox-media-viewer
 * @slot title - The title content.
 * @slot description - The description content.
 * @csspart container - The wrapper around the lightbox media. Usage: `c4d-lightbox-video-player::part(container)`
 * @csspart row - The wrapper around the row. Usage: `c4d-lightbox-video-player::part(row)`
 * @csspart media - The wrapper around media. Usage: `c4d-lightbox-video-player::part(media)`
 * @csspart content-wrapper - The wrapper around content. Usage: `c4d-lightbox-video-player::part(content-wrapper)`
 * @csspart content - The inner wrapper around content. Usage: `c4d-lightbox-video-player::part(content)`
 * @csspart title - The title of the media. Usage: `c4d-lightbox-video-player::part(title)`
 * @csspart description - The description of the media. Usage: `c4d-lightbox-video-player::part(description)`
 * @csspart h2 - The h2 element that holds the title. Usage: `c4d-lightbox-video-player::part(h2)`
 */
@customElement(`${c4dPrefix}-lightbox-media-viewer`)
class C4DLightboxMediaViewer extends C4DLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html` <slot name="description">${description}</slot> `;
  }

  _renderMedia() {
    return html`
      <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  _renderTitle() {
    const { title } = this;
    return html`
      <slot name="title"
        ><h2 part="h2" style="all: inherit;">${title}</h2></slot
      >
    `;
  }

  private _mediaItem?: HTMLElement;

  @query(`.${c4dPrefix}--lightbox-media-viewer__media`)
  private _mediaWindow!: HTMLDivElement;

  private _containingCarousel?: C4DCarousel;

  private _containingModal?: C4DExpressiveModal;

  private _handleSlotChange(event: Event) {
    const { _containingModal: containingModal } = this;
    const [media] = (event.target as HTMLSlotElement).assignedNodes();
    this._mediaItem = media as HTMLImageElement | C4DVideoPlayerContainer;

    // Disconnect & delete intersection observer
    if (this._intersectionObserver instanceof IntersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = undefined;
    }

    // Remove modal closed listeners from the containing modal
    if (containingModal && this._boundModalClosedHandler) {
      containingModal.removeEventListener(
        C4DExpressiveModal.eventBeforeClose,
        this._boundModalClosedHandler
      );
      this._boundModalClosedHandler = undefined;
    }

    if (media instanceof C4DVideoPlayerContainer) {
      const {
        _mediaWindow: mediaWindow,
        _containingCarousel: containingCarousel,
      } = this;

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

        containingModal.addEventListener(
          C4DExpressiveModal.eventBeforeClose,
          this._boundModalClosedHandler
        );
      }
    }
  }

  private _intersectionObserver?: IntersectionObserver;

  private _handleOutOfCarouselView(entries) {
    entries.forEach((entry) => {
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

    if (mediaItem instanceof C4DVideoPlayerContainer) {
      mediaItem.pauseAllVideos();
    }
  }

  _boundModalClosedHandler?: EventListenerOrEventListenerObject;

  connectedCallback() {
    super.connectedCallback();

    this._containingCarousel =
      (this.closest(`${c4dPrefix}-carousel`) as C4DCarousel) || undefined;
    this._containingModal =
      (this.closest(`${c4dPrefix}-expressive-modal`) as C4DExpressiveModal) ||
      undefined;
  }

  update(changedProperties) {
    if (this.videoId) {
      const { videoId, caption, hideCaption, thumbnail } = this;
      this.innerHTML = `
        <c4d-video-player-container
          playing-mode="inline"
          video-id="${videoId}"
          caption="${caption}"
          ?hide-caption="${hideCaption}"
          thumbnail="${thumbnail}"
          slot="media"
        ></c4d-video-player-container>
      `;
    } else {
      const { alt, defaultSrc } = this;
      this.innerHTML = `
        <img
          class="${c4dPrefix}--image__img"
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

  /**
   * The name of the custom event fired before this modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this modal.
   */
  static get eventBeforeModalClose() {
    return `${c4dPrefix}-expressive-modal-beingclosed`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLightboxMediaViewer;
