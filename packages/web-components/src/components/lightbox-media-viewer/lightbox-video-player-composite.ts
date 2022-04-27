/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { MediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import Handle from '../../globals/internal/handle';
import DDSVideoPlayerComposite from '../video-player/video-player-composite';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import { VIDEO_PLAYER_CONTENT_STATE, VIDEO_PLAYER_PLAYING_MODE } from '../video-player/video-player';
import './lightbox-video-player';
import styles from './lightbox-video-player-composite.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that renders lightbox media viewer for video from its metadata, etc.
 *
 * @element dds-lightbox-video-player-composite
 */
@customElement(`${ddsPrefix}-lightbox-video-player-composite`)
class DDSLightboxVideoPlayerComposite extends ModalRenderMixin(DDSVideoPlayerComposite) {
  /**
   * The handle for the listener of `${ddsPrefix}-expressive-modal-closed` event.
   */
  private _hCloseModal: Handle | null = null;

  /**
   * Handles aria state depending on the modal's state.
   */
  private _handleAriaAndHiddenState = () => {
    const iFrame = this._videoPlayer?.querySelector('iframe');

    // Handles edge case where screen reader still reads video title within iFrame
    try {
      if (this.open) {
        iFrame?.contentWindow?.document.querySelector('.topBarContainer')?.removeAttribute('aria-hidden');
      } else {
        iFrame?.contentWindow?.document.querySelector('.topBarContainer')?.setAttribute('aria-hidden', 'true');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Failed to access element in iframe');
      throw error;
    }

    const { selectorEmbeddedVideoContainer } = this.constructor as typeof DDSLightboxVideoPlayerComposite;

    const elems = Array.prototype.slice.call(
      document.querySelector('dds-lightbox-video-player')?.querySelectorAll(selectorEmbeddedVideoContainer)
    );

    elems.forEach(element => {
      element.toggleAttribute('hidden', (element as HTMLElement).dataset.videoId !== this.videoId);
    });
  };

  /**
   * The handler of `${ddsPrefix}-expressive-modal-closed` event from `<dds-expressive-modal>`.
   */
  private _handleCloseModal = () => {
    const { embeddedVideos = {}, videoId } = this;
    const { [videoId]: currentEmbeddedVideo } = embeddedVideos;
    if (currentEmbeddedVideo) {
      currentEmbeddedVideo.sendNotification('doStop');
    }
    this.open = false;
    this._handleAriaAndHiddenState();
  };

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleContentStateChange(_: CustomEvent) {}

  @HostListener('document:eventContentStateChange')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { contentState, playingMode, videoId: requestedVideoId, name, customVideoDescription } = event.detail;
    if (this.videoCtaLightBox === false) {
      this.videoId = requestedVideoId;
      const { videoId } = this;
      if (
        contentState === VIDEO_PLAYER_CONTENT_STATE.VIDEO &&
        videoId === requestedVideoId &&
        playingMode === VIDEO_PLAYER_PLAYING_MODE.LIGHTBOX
      ) {
        this.customVideoName = name;
        this.open = true;
        this.customVideoDescription = customVideoDescription;
      }
    }
  };

  /**
   * The video player.
   */
  protected get _videoPlayer() {
    const { selectorVideoPlayer } = this.constructor as typeof DDSLightboxVideoPlayerComposite;
    return (this.modalRenderRoot as Element)?.querySelector?.(selectorVideoPlayer);
  }

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   *
   */
  @property({ attribute: 'custom-video-name' })
  customVideoName?: string;

  /**
   *
   */
  @property({ attribute: 'custom-video-description' })
  customVideoDescription?: string;

  /**
   * `true` if the modal is rendered for video cta component.
   */
  @property({ type: Boolean, attribute: 'video-cta-lightbox' })
  videoCtaLightBox = false;

  connectedCallback() {
    super.connectedCallback();
    this.modalRenderRoot = this.createModalRenderRoot(); // Creates modal render root up-front to hook the event listener
    // Manually hooks the event listeners on the modal render root to make the event names configurable
    this._hCloseModal = on(
      this.modalRenderRoot,
      (this.constructor as typeof DDSLightboxVideoPlayerComposite).eventCloseModal,
      this._handleCloseModal as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('open') || changedProperties.has('videoId')) {
      const { open, videoId } = this;
      this._activateEmbeddedVideo(!open ? '' : videoId);
      if (videoId) {
        this._loadVideoData?.(videoId);
        if (open) {
          this._embedMedia?.(videoId, false);
          this._handleAriaAndHiddenState();
        }
      }
    }
  }

  renderLightDOM() {
    // In this class we render that in modal instead of in light DOM.
    // Overriding `.renderLightDOM()` here
    // to prevent the parent `<dds-video-player-composite>` from rendering `<dds-video-player>` in light DOM.
    return html``;
  }

  renderModal() {
    const {
      formatCaption,
      formatDuration,
      customVideoName,
      hideCaption,
      open,
      mediaData = {},
      videoId,
      customVideoDescription,
    } = this;
    const { [videoId]: currentVideoData = {} as MediaData } = mediaData;
    const { description, duration, name } = currentVideoData;
    const videoName = customVideoName || name;
    const videoDescription = customVideoDescription || description;
    return html`
      <dds-expressive-modal ?open="${open}" expressive-size="full-width" mode="lightbox">
        <dds-expressive-modal-close-button></dds-expressive-modal-close-button>
        <dds-lightbox-video-player
          description="${ifNonNull(videoDescription)}"
          duration="${ifNonNull(duration)}"
          name="${ifNonNull(videoName)}"
          ?hide-caption="${hideCaption}"
          .formatCaption="${ifNonNull(formatCaption)}"
          .formatDuration="${ifNonNull(formatDuration)}"
        >
        </dds-lightbox-video-player>
      </dds-expressive-modal>
    `;
  }

  /**
   * A selector selecting the video player component.
   */
  static get selectorVideoPlayer() {
    return `${ddsPrefix}-lightbox-video-player`;
  }

  /**
   * The name of the custom event fired after the modal is closed upon a user gesture.
   */
  static get eventCloseModal() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }

  /**
   * A selector selecting the container DOM elements for embedding video.
   */
  static get selectorEmbeddedVideoContainer() {
    return '[data-video-id]';
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLightboxVideoPlayerComposite;
