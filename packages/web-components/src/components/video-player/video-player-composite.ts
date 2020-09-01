/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { forEach } from '../../globals/internal/collection-helpers';
import { VideoData } from '../../globals/services-store/types/videoPlayerAPI';
import './video-player';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that renders video player from its metadata, etc.
 *
 * @element dds-video-player-composite
 */
@customElement(`${ddsPrefix}-video-player-composite`)
class DDSVideoPlayerComposite extends HybridRenderMixin(LitElement) {
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

  updated(changedProperties) {
    if (changedProperties.has('videoId')) {
      const { videoId } = this;
      this._activateEmbeddedVideo(videoId);
      if (videoId) {
        this._loadVideoData?.(videoId);
        this._embedVideo?.(videoId);
      }
    }
    return true;
  }

  renderLightDOM() {
    const { formatCaption, formatDuration, hideCaption, videoData = {}, videoId } = this;
    const { [videoId]: currentVideoData = {} as VideoData } = videoData;
    const { duration, name } = currentVideoData;
    return html`
      <dds-video-player
        duration="${ifNonNull(duration)}"
        ?hide-caption=${hideCaption}
        name="${ifNonNull(name)}"
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
}

export default DDSVideoPlayerComposite;
