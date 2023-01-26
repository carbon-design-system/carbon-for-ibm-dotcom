/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import on from 'carbon-components/es/globals/js/misc/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import { MediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
import Handle from '../../globals/internal/handle';
import DDSLightboxVideoPlayerComposite from '../lightbox-media-viewer/lightbox-video-player-composite';
// Above import is interface-only ref and thus code won't be brought into the build
import '../lightbox-media-viewer/lightbox-video-player-composite';
import { CTA_TYPE } from './defs';
import { VideoCTAMixinImpl } from '../../component-mixins/cta/video';
import styles from './video-cta-composite.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that handles video CTAs in app.
 *
 * @element dds-video-cta-composite
 */
@customElement(`${ddsPrefix}-video-cta-composite`)
class DDSVideoCTAComposite extends ModalRenderMixin(
  HostListenerMixin(LitElement)
) {
  /**
   * The placeholder for `_embedMedia()` action that may be mixed in.
   *
   * @internal
   */
  @state()
  _embedMedia?: (videoId: string) => Promise<any>;

  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadVideoData?: (videoId: string) => Promise<MediaData>;

  /**
   * `true` to show the video player.
   */
  @state()
  private _activeVideoId?: string;

  /**
   * The video custom name.
   */
  @state()
  private _videoName?: string;

  /**
   * The video custom description.
   */
  @state()
  private _videoDescription?: string;

  /**
   * The handle for the listener of `${ddsPrefix}-expressive-modal-closed` event.
   */
  private _hCloseModal: Handle | null = null;

  /**
   * Handles the user gesture of closing video player modal.
   */
  private _handleCloseVideoPlayer = () => {
    this._activeVideoId = undefined;
  };

  /**
   * Handles `${ddsPrefix}-cta-request-video-data` event.
   *
   * @param event The event.
   */
  @HostListener('eventRequestVideoData')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private async _handleRequestVideoData(event: CustomEvent) {
    const { href, videoName: customVideoName, videoDescription } = event.detail;
    (event.target as VideoCTAMixinImpl).videoThumbnailUrl =
      KalturaPlayerAPI.getThumbnailUrl({
        mediaId: href,
        width: (event?.target as HTMLElement)?.offsetWidth,
      });
    const videoData = await this._loadVideoData?.(href);
    if (videoData) {
      const { duration, name } = videoData;
      const videoName = customVideoName || name;

      (event.target as VideoCTAMixinImpl).videoName = videoName;
      (event.target as VideoCTAMixinImpl).videoDescription = videoDescription;
      (event.target as VideoCTAMixinImpl).videoDuration = duration;
    }
  }

  /**
   * Handles `${ddsPrefix}-cta-run-action` event.
   *
   * @param event The event.
   */
  @HostListener('eventRunAction')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleRunAction(event: CustomEvent) {
    const { ctaType, href, videoName, videoDescription } = event.detail;
    if (ctaType === CTA_TYPE.VIDEO) {
      this._activeVideoId = href;
      this._videoName = videoName;
      this._videoDescription = videoDescription;
    }
  }

  /**
   * The video player.
   */
  protected get _videoPlayer() {
    const { selectorVideoPlayer, selectorLightboxVideoPlayerComposite } = this
      .constructor as typeof DDSVideoCTAComposite;
    const lightbox = (this.modalRenderRoot as Element)?.querySelector(
      selectorLightboxVideoPlayerComposite
    );
    return (
      (lightbox as DDSLightboxVideoPlayerComposite)?.modalRenderRoot as Element
    )?.querySelector(selectorVideoPlayer);
  }

  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  @property({ attribute: false })
  embeddedVideos?: { [videoId: string]: any };

  /**
   * The video data, keyed by the video ID.
   */
  @property({ attribute: false })
  mediaData?: { [videoId: string]: MediaData };

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (!this._hCloseModal) {
      const { selectorLightboxVideoPlayerComposite } = this
        .constructor as typeof DDSVideoCTAComposite;
      const videoPlayerComposite = (
        this.modalRenderRoot as Element
      ).querySelector(
        selectorLightboxVideoPlayerComposite
      ) as DDSLightboxVideoPlayerComposite;
      // Manually hooks the event listeners on the modal render root to make the event names configurable
      this._hCloseModal = on(
        videoPlayerComposite.modalRenderRoot,
        (this.constructor as typeof DDSVideoCTAComposite).eventCloseLightbox,
        this._handleCloseVideoPlayer as EventListener
      );
    }
  }

  /**
   * @returns The media viewer lightbox for `type="video"`.
   */
  renderModal() {
    const {
      embeddedVideos,
      mediaData,
      _videoName: videoName,
      _activeVideoId: activeVideoId,
      _embedMedia: embedMedia,
      _videoDescription: videoDescription,
    } = this;
    return html`
      <dds-lightbox-video-player-composite
        ?open="${Boolean(activeVideoId)}"
        video-cta-lightbox="true"
        custom-video-name="${ifDefined(videoName)}"
        custom-video-description="${ifDefined(videoDescription)}"
        video-id="${ifDefined(activeVideoId)}"
        .embeddedVideos="${ifDefined(embeddedVideos)}"
        .mediaData="${ifDefined(mediaData)}"
        ._embedMedia="${ifDefined(embedMedia)}">
      </dds-lightbox-video-player-composite>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * A selector selecting the video player component.
   */
  static get selectorVideoPlayer() {
    return `${ddsPrefix}-lightbox-video-player`;
  }

  /**
   * A selector selecting the video player composite component.
   */
  static get selectorLightboxVideoPlayerComposite() {
    return `${ddsPrefix}-lightbox-video-player-composite`;
  }

  /**
   * The name of the custom event fired after the lightbox is closed upon a user gesture.
   */
  static get eventCloseLightbox() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRequestVideoData() {
    return `${ddsPrefix}-cta-request-video-data`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRunAction() {
    return `${ddsPrefix}-cta-run-action`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSVideoCTAComposite;
