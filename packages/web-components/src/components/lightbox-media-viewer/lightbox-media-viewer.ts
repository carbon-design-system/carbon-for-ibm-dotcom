/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
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
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The image content of lightbox media viewer.
 *
 * @element c4d-lightbox-image-viewer
 * @slot title - The title content.
 * @slot description - The description content.
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
      <slot name="title"><h2 style="all: inherit;">${title}</h2></slot>
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

  /**
   * Detect the presence of a URL fragment meant to trigger the parent modal.
   */
  firstUpdated() {
    // Without a video id, there is nothing to do here.
    if (!this.videoId) {
      return;
    }
    const { eventOpen } = this.constructor as typeof C4DLightboxMediaViewer;
    const hash = window.location.hash;
    const lightboxOpenToken = `lightbox-video-${this.videoId}`;

    if (hash.includes(lightboxOpenToken)) {
      this.dispatchEvent(
        new CustomEvent(eventOpen, {
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
    }
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

  /**
   * The name of the custom event fired on request to open the modal.
   */
  static get eventOpen() {
    return `${c4dPrefix}-expressive-modal-opened`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLightboxMediaViewer;
