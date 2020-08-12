/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import './video-player';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for video player.
 *
 * @element dds-video-player-container
 */
@customElement(`${ddsPrefix}-video-player-container`)
class DDSVideoPlayerContainer extends HybridRenderMixin(LitElement) {
  /**
   * The promises for loading video.
   */
  private _loadVideoPromises: Map<string, Promise<[any, any]>> = new Map();

  /**
   * Unique ID used for putting video UI.
   */
  private _playerId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * The video description.
   */
  protected _description = '';

  /**
   * The video duration.
   */
  protected _duration = '';

  /**
   * The Kaltura video player element.
   */
  protected _kWidget = '';

  /**
   * The video name.
   */
  protected _name = '';

  /**
   * Loads the video.
   */
  private async _loadVideo() {
    const { videoId, _loadVideoPromises: loadVideoPromises } = this;
    const loadVideoPromise =
      loadVideoPromises.get(videoId) ??
      (() => {
        const promise = Promise.all([
          VideoPlayerAPI.api(videoId),
          (() => {
            const { selectorVideoPlayer } = this.constructor as typeof DDSVideoPlayerContainer;
            const { ownerDocument: doc, _playerId: playerId } = this;
            if (!doc!.getElementById(playerId)) {
              // Given Kaltura replaces the `<div>` here with `<iframe>` with the video player,
              // rendering this `<div>` in `renderLightDOM()` will cause the video player being clobbered
              const div = doc!.createElement('div');
              div.id = playerId;
              div.className = `${prefix}--video-player__video`;
              const target = this.querySelector(selectorVideoPlayer);
              if (!target) {
                throw new TypeError('Cannot find the video player component to put the video content into.');
              }
              target.appendChild(div);
            }
            return VideoPlayerAPI.embedVideo(videoId, playerId, true);
          })(),
        ]);
        loadVideoPromises.set(videoId, promise);
        return promise;
      })();
    const [videoData, embedVideoHandle] = await loadVideoPromise;
    const { name: videoName, description: videoDescription, msDuration: videoDuration } = videoData;
    if (videoId === this.videoId) {
      this._name = videoName;
      this._description = videoDescription;
      this._duration = videoDuration;
      this.requestUpdate();
    }
    const kWidget = await embedVideoHandle.kWidget();
    if (videoId === this.videoId) {
      this._kWidget = kWidget;
    }
  }

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption?: ({ duration, name }: { duration: number; name: string }) => string;

  /**
   * `true` to hide the caption.
   */
  @property({ type: Boolean, attribute: 'hide-caption' })
  hideCaption = false;

  /**
   * The video ID.
   */
  @property({ attribute: 'video-id' })
  videoId = '';

  updated(changedProperties) {
    if (changedProperties.has('videoId') && this.videoId) {
      this._loadVideo();
    }
    return true;
  }

  renderLightDOM() {
    const { formatCaption, hideCaption, _duration: videoDuration, _name: videoName } = this;
    return html`
      <dds-video-player
        duration="${ifNonNull(videoDuration)}"
        ?hide-caption=${hideCaption}
        name="${ifNonNull(videoName)}"
        .formatCaption="${ifNonNull(formatCaption)}"
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
}

export default DDSVideoPlayerContainer;
