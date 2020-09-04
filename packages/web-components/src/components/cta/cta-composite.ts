/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, internalProperty, customElement, LitElement } from 'lit-element';
import on from 'carbon-components/es/globals/js/misc/on';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import 'carbon-web-components/es/components/modal/modal-close-button';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import { VideoData } from '../../globals/services-store/types/videoPlayerAPI';
import Handle from '../../globals/internal/handle';
import '../image/image';
import '../modal/modal';
import '../modal/modal-header';
import '../lightbox-media-viewer/lightbox-media-viewer-body';
/* eslint-disable import/no-duplicates */
import DDSLightboxVideoPlayerComposite from '../lightbox-media-viewer/lightbox-video-player-composite';
// Above import is interface-only ref and thus code won't be brought into the build
import '../lightbox-media-viewer/lightbox-video-player-composite';
/* eslint-enable import/no-duplicates */
import './text-cta';
import './card-cta';
import './card-cta-markdown';
import './card-cta-footer';
import './feature-cta';
import './feature-cta-footer';
import { CTA_STYLE, CTA_TYPE } from './shared-enums';
import styles from './cta-composite.scss';

export { CTA_STYLE, CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Base CTA data item.
 */
export interface BASE_CTA_ITEM {
  /**
   * The copy text.
   */
  copy: string;
}

/**
 * Base CTA data item with `type`.
 */
interface TYPED_CTA_ITEM extends BASE_CTA_ITEM {
  /**
   * The default file name for downloading, should be used only with `CTA_TYPE.DOWNLOAD`.
   */
  download: string;

  /**
   * The href. For video CTA type, the video ID should be given.
   */
  href: string;

  /**
   * The CTA type.
   */
  type: CTA_TYPE;
}

/**
 * CTA data item for text CTA style.
 */
export type TEXT_CTA_ITEM = TYPED_CTA_ITEM;

/**
 * The resopnsive image item in feature CTA.
 */
export interface CARD_CTA_IMAGE_ITEM {
  /**
   * The media query.
   */
  media: string;

  /**
   * The source set.
   */
  srcset: string;
}

/**
 * Image data in feature CTA style.
 */
export interface CARD_CTA_IMAGE {
  /**
   * The alternate text.
   */
  alt: string;

  /**
   * The default image source.
   */
  defaultSrc: string;

  /**
   * The responsive image items.
   */
  items?: CARD_CTA_IMAGE_ITEM[];
}

/**
 * CTA data item for the footer in card CTA style.
 */
export type CARD_CTA_FOOTER = BASE_CTA_ITEM;

/**
 * CTA data item for card CTA style.
 */
export interface CARD_CTA_ITEM extends TYPED_CTA_ITEM {
  /**
   * The image content.
   */
  image?: CARD_CTA_IMAGE;

  /**
   * The footer content.
   */
  footer: CARD_CTA_FOOTER;
}

/**
 * CTA data item for feature CTA style.
 */
export type FEATURE_CTA_ITEM = CARD_CTA_ITEM;

/**
 * Component that rendres CTA from links, etc. data.
 *
 * @element dds-cta-composite
 */
@customElement(`${ddsPrefix}-cta-composite`)
class DDSCTAComposite extends ModalRenderMixin(HybridRenderMixin(HostListenerMixin(LitElement))) {
  /**
   * The placeholder for `_embedVideo()` action that may be mixed in.
   *
   * @internal
   */
  @internalProperty()
  _embedVideo?: (videoId: string) => Promise<any>;

  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadVideoData?: (videoId: string) => Promise<VideoData>;

  /**
   * `true` to show the video player.
   */
  private _currentVideoId?: string;

  /**
   * The handle for the listener of `${ddsPrefix}-modal-closed` event.
   */
  private _hCloseModal: Handle | null = null;

  /**
   * Handles the user gesture of closing video player modal.
   */
  private _handleCloseVideoPlayer = () => {
    this._currentVideoId = undefined;
    this.requestUpdate();
  };

  /**
   * Handles `${ddsPrefix}-cta-run-action` event.
   *
   * @param event The event.
   */
  @HostListener('eventRunAction')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleRunAction(event: CustomEvent) {
    const { href, type } = event.detail;
    if (type === CTA_TYPE.VIDEO) {
      this._currentVideoId = href;
      this.requestUpdate();
    }
  }

  /**
   * @param text The text data to render.
   * @returns The rendered version of the given data.
   */
  // eslint-disable-next-line class-methods-use-this
  private _renderText(text: TEXT_CTA_ITEM) {
    const { videoData } = this;
    const { copy, download, href, type } = text;
    const { [href]: currentVideoData = {} as VideoData } = videoData ?? {};
    const { duration: videoDuration, name: videoName } = currentVideoData ?? {};
    // Lets the copy text surrounded by `<span>`
    // so change in copy text yields to a DOM structure change that `<dds-text-cta>` can detect
    return html`
      <dds-text-cta
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        type="${ifNonNull(type)}"
        video-duration="${ifNonNull(videoDuration)}"
        video-name="${ifNonNull(videoName)}"
      >
        ${!copy
          ? undefined
          : html`
              <span>${copy}</span>
            `}
      </dds-text-cta>
    `;
  }

  /**
   * @param image The image data to render.
   * @returns The rendered version of the given data.
   */
  // eslint-disable-next-line class-methods-use-this
  private _renderImage(image?: CARD_CTA_IMAGE) {
    const { alt, defaultSrc, items } = image ?? {};
    return !image
      ? undefined
      : html`
          <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
            ${items?.map(
              ({ media, srcset }) => html`
                <dds-image-item media="${ifNonNull(media)}" srcset="${ifNonNull(srcset)}"></dds-image-item>
              `
            )}
          </dds-image>
        `;
  }

  /**
   * @param card The card data to render.
   * @returns The rendered version of the given data.
   */
  private _renderCard(card: CARD_CTA_ITEM) {
    const {
      formatVideoCaption: formatVideoCaptionInEffect,
      formatVideoDuration: formatVideoDurationInEffect,
      videoData = {},
    } = this;
    const { copy, download, footer, href, image, type } = card;
    const { [href]: currentVideoData = {} as VideoData } = videoData;
    const { duration: videoDuration, name: videoName } = currentVideoData;
    const { copy: footerCopy } = footer;
    const videoThumbnailUrl =
      type !== CTA_TYPE.VIDEO
        ? undefined
        : VideoPlayerAPI.getThumbnailUrl({
            videoId: href,
            width: '320',
          });
    // Lets the footer copy text surrounded by `<span>`
    // so change in copy text yields to a DOM structure change that `<dds-card-cta-footer>` can detect
    return html`
      <dds-card-cta
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        type="${ifNonNull(type)}"
        video-duration="${ifNonNull(videoDuration)}"
        video-name="${ifNonNull(videoName)}"
        video-thumbnail-url="${ifNonNull(videoThumbnailUrl)}"
        .formatVideoCaption="${ifNonNull(formatVideoCaptionInEffect)}"
        .formatVideoDuration="${ifNonNull(formatVideoDurationInEffect)}"
      >
        ${!copy
          ? undefined
          : html`
              <dds-card-cta-markdown .content="${copy}"></dds-card-cta-markdown>
            `}
        ${this._renderImage(image)}
        <dds-card-cta-footer>
          ${!footerCopy
            ? undefined
            : html`
                <span>${footerCopy}</span>
              `}
        </dds-card-cta-footer>
      </dds-card-cta>
    `;
  }

  /**
   * @param feature The feature data to render.
   * @returns The rendered version of the given data.
   */
  private _renderFeature(feature: FEATURE_CTA_ITEM) {
    const {
      formatVideoCaption: formatVideoCaptionInEffect,
      formatVideoDuration: formatVideoDurationInEffect,
      videoData = {},
    } = this;
    const { copy, download, footer, href, image, type } = feature;
    const { [href]: currentVideoData = {} as VideoData } = videoData;
    const { duration: videoDuration, name: videoName } = currentVideoData;
    const { copy: footerCopy } = footer;
    const videoThumbnailUrl =
      type !== CTA_TYPE.VIDEO
        ? undefined
        : VideoPlayerAPI.getThumbnailUrl({
            videoId: href,
            width: '320',
          });
    return html`
      <dds-feature-cta
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        type="${ifNonNull(type)}"
        video-duration="${ifNonNull(videoDuration)}"
        video-name="${ifNonNull(videoName)}"
        video-thumbnail-url="${ifNonNull(videoThumbnailUrl)}"
        .formatVideoCaption="${ifNonNull(formatVideoCaptionInEffect)}"
        .formatVideoDuration="${ifNonNull(formatVideoDurationInEffect)}"
      >
        ${!copy
          ? undefined
          : html`
              <dds-card-cta-markdown .content="${copy}"></dds-card-cta-markdown>
            `}
        ${this._renderImage(image)}
        <dds-feature-cta-footer>
          ${footerCopy}
        </dds-feature-cta-footer>
      </dds-feature-cta>
    `;
  }

  /**
   * The video player.
   */
  protected get _videoPlayer() {
    const { selectorVideoPlayer, selectorLightboxVideoPlayerComposite } = this.constructor as typeof DDSCTAComposite;
    const lightbox = (this.modalRenderRoot as Element)?.querySelector(selectorLightboxVideoPlayerComposite);
    return ((lightbox as DDSLightboxVideoPlayerComposite)?.modalRenderRoot as Element)?.querySelector(selectorVideoPlayer);
  }

  /**
   * CTA style.
   */
  @property({ attribute: 'cta-style' })
  ctaStyle = CTA_STYLE.TEXT;

  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  @property({ attribute: false })
  embeddedVideos?: { [videoId: string]: any };

  /**
   * CTA item.
   */
  @property({ type: Object })
  item?: TEXT_CTA_ITEM | CARD_CTA_ITEM | FEATURE_CTA_ITEM;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoCaption?: typeof formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoDuration?: typeof formatVideoDuration;

  /**
   * The video data, keyed by the video ID.
   */
  @property({ attribute: false })
  videoData?: { [videoId: string]: VideoData };

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('item') && this.item) {
      const { href, type } = this.item;
      if (href && type === CTA_TYPE.VIDEO) {
        this._loadVideoData?.(href);
      }
    }
    if (!this._hCloseModal) {
      const { selectorLightboxVideoPlayerComposite } = this.constructor as typeof DDSCTAComposite;
      const videoPlayerComposite = (this.modalRenderRoot as Element).querySelector(
        selectorLightboxVideoPlayerComposite
      ) as DDSLightboxVideoPlayerComposite;
      // Manually hooks the event listeners on the modal render root to make the event names configurable
      this._hCloseModal = on(
        videoPlayerComposite.modalRenderRoot,
        (this.constructor as typeof DDSCTAComposite).eventCloseLightbox,
        this._handleCloseVideoPlayer as EventListener
      );
    }
  }

  /**
   * @returns The media viewer lightbox for `type="video"`.
   */
  renderModal() {
    const { embeddedVideos, videoData, _currentVideoId: currentVideoId, _embedVideo: embedVideo } = this;
    return html`
      <dds-lightbox-video-player-composite
        ?open="${Boolean(currentVideoId)}"
        video-id="${ifNonNull(currentVideoId)}"
        .embeddedVideos="${ifNonNull(embeddedVideos)}"
        .videoData="${ifNonNull(videoData)}"
        ._embedVideo="${ifNonNull(embedVideo)}"
      >
      </dds-lightbox-video-player-composite>
    `;
  }

  renderLightDOM() {
    const { ctaStyle, item } = this;
    switch (ctaStyle) {
      case CTA_STYLE.TEXT:
        return this._renderText(item as TEXT_CTA_ITEM);
      case CTA_STYLE.CARD:
        return this._renderCard(item as CARD_CTA_ITEM);
      case CTA_STYLE.FEATURE:
        return this._renderFeature(item as FEATURE_CTA_ITEM);
      default:
        return undefined;
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
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
    return `${ddsPrefix}-modal-closed`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRunAction() {
    return `${ddsPrefix}-cta-run-action`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCTAComposite;
