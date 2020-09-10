/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { forEach } from '../../globals/internal/collection-helpers';
import { VideoData } from '../../globals/services-store/types/videoPlayerAPI';
/* eslint-disable import/no-duplicates */
import { VIDEO_PLAYER_CONTENT_STATE } from './video-player';
// Above import is interface-only ref and thus code won't be brought into the build
import './video-player';
/* eslint-enable import/no-duplicates */

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that renders video player from its metadata, etc.
 *
 * @element dds-video-player-composite
 */
@customElement(`${ddsPrefix}-video-player-composite`)
class DDSVideoPlayerComposite extends HybridRenderMixin(HostListenerMixin(LitElement)) {
  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadVideoData?: (videoId: string) => Promise<VideoData>;

  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _embedVideo?: (videoId: string) => Promise<any>;

  /**
   * Activate the DOM nodes for the embedded video of the given video ID, and deactivates others.
   *
   * @param videoId The video ID to activate.
   */
  private _activateEmbeddedVideo(videoId: string) {
    const { selectorEmbeddedVideoContainer } = this.constructor as typeof DDSVideoPlayerComposite;
    const { embeddedVideos = {} } = this;
    Object.keys(embeddedVideos)
      .filter(key => key !== videoId)
      .forEach(key => {
        embeddedVideos[key].sendNotification('doStop');
      });
    forEach(this.querySelectorAll(selectorEmbeddedVideoContainer), element => {
      element.toggleAttribute('hidden', (element as HTMLElement).dataset.videoId !== videoId);
    });
  }

  /**
   * The video player.
   */
  protected get _videoPlayer() {
    const { selectorVideoPlayer } = this.constructor as typeof DDSVideoPlayerComposite;
    return this.querySelector(selectorVideoPlayer);
  }

  /**
   * Handles `dds-video-player-content-state-changed` event.
   * Such event is fired when user changes video content state, e.g. from thumbnail to video player.
   *
   * @param event The event.
   */
  @HostListener('eventContentStateChange')
  protected _handleContentStateChange(event: CustomEvent) {
    const { contentState, videoId } = event.detail;
    if (contentState === VIDEO_PLAYER_CONTENT_STATE.VIDEO && videoId) {
      this._embedVideo?.(videoId);
    }
  }

  /**
   * `true` to autoplay the videos.
   */
  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = false;

  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  @property({ attribute: false })
  embeddedVideos?: { [videoId: string]: any };

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption?: ({ duration, name }: { duration?: string; name?: string }) => string;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration?: ({ duration }: { duration?: number }) => string;

  /**
   * `true` to hide the caption.
   */
  @property({ type: Boolean, attribute: 'hide-caption' })
  hideCaption = false;

  /**
   * The video data, keyed by the video ID.
   */
  @property({ attribute: false })
  videoData?: { [videoId: string]: VideoData };

  /**
   * The video ID.
   */
  @property({ attribute: 'video-id' })
  videoId = '';

  /**
   * The video thumbnail width.
   */
  @property({ type: Number, attribute: 'video-thumbnail-width' })
  videoThumbnailWidth = 655;

  updated(changedProperties) {
    if (changedProperties.has('videoId')) {
      const { autoPlay, videoId } = this;
      this._activateEmbeddedVideo(videoId);
      if (videoId) {
        this._loadVideoData?.(videoId);
        if (autoPlay) {
          this._embedVideo?.(videoId);
        }
      }
    }
  }

  renderLightDOM() {
    const { formatCaption, formatDuration, hideCaption, videoData = {}, videoId, videoThumbnailWidth } = this;
    const { [videoId]: currentVideoData = {} as VideoData } = videoData;
    const { duration, name } = currentVideoData;
    const thumbnailUrl = VideoPlayerAPI.getThumbnailUrl({
      videoId,
      width: String(videoThumbnailWidth),
    });
    return html`
      <dds-video-player
        duration="${ifNonNull(duration)}"
        ?hide-caption=${hideCaption}
        name="${ifNonNull(name)}"
        thumbnail-url="${ifNonNull(thumbnailUrl)}"
        video-id="${ifNonNull(videoId)}"
        .formatCaption="${ifNonNull(formatCaption)}"
        .formatDuration="${ifNonNull(formatDuration)}"
      >
      </dds-video-player>
    `;
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
    return `${ddsPrefix}-video-player`;
  }

  /**
   * A selector selecting the container DOM elements for embedding video.
   */
  static get selectorEmbeddedVideoContainer() {
    return '[data-video-id]';
  }

  /**
   * The name of the custom event fired after video content state is changed upon a user gesture.
   */
  static get eventContentStateChange() {
    return `${ddsPrefix}-video-player-content-state-changed`;
  }
}

export default DDSVideoPlayerComposite;
