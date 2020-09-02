/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import store from '../../globals/services-store/store';
import { VideoData, VideoPlayerAPIState } from '../../globals/services-store/types/videoPlayerAPI';
import { loadVideoData, VideoPlayerAPIActions } from '../../globals/services-store/actions/videoPlayerAPI';
import ConnectMixin from '../../globals/mixins/connect';
import DDSVideoPlayerComposite from './video-player-composite';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-video-player-container>`.
 */
export interface VideoPlayerContainerState {
  /**
   * The Redux state for `VideoPlayerAPI`.
   */
  videoPlayerAPI?: VideoPlayerAPIState;
}

/**
 * The properties for `<dds-video-player-container>` from Redux state.
 */
export interface VideoPlayerContainerStateProps {
  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  embeddedVideos?: { [videoId: string]: any };

  /**
   * The video data, keyed by the video ID.
   */
  videoData?: { [videoId: string]: VideoData };
}

export type VideoPlayerActions = ReturnType<typeof loadVideoData>;

/**
 * @param state The Redux state for video player.
 * @returns The converted version of the given state, tailored for `<dds-video-player-container>`.
 */
export function mapStateToProps(state: VideoPlayerContainerState): VideoPlayerContainerStateProps {
  const { videoPlayerAPI } = state;
  const { videoData } = videoPlayerAPI ?? {};
  return !videoData ? {} : { videoData };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-video-player-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<VideoPlayerAPIActions>) {
  return bindActionCreators<VideoPlayerActions, ActionCreatorsMapObject<VideoPlayerActions>>(
    {
      _loadVideoData: loadVideoData,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * @param Base The base class.
 * @returns A mix-in that implements video embedding API calls.
 */
export const DDSVideoPlayerContainerMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  /**
   * A mix-in class that sets up and cleans up event listeners defined by `@HostListener` decorator.
   */
  abstract class DDSVideoPlayerContainerMixinImpl extends Base {
    /**
     * The video player.
     */
    abstract _videoPlayer?: HTMLElement;

    /**
     * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
     */
    abstract embeddedVideos?: { [videoId: string]: any };

    /**
     * The request for the embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
     *
     * @protected
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _requestsEmbedVideo: { [videoId: string]: Promise<any> } = {};

    /**
     * Sets the state that the API call for embedding the video for the given video ID is in progress.
     *
     * @param videoId The video ID.
     * @param request The promise of the API call for embedding the video of the given video ID that is in progress.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _setRequestEmbedVideoInProgress(videoId: string, request: Promise<any>) {
      const { _requestsEmbedVideo: oldRequestsEmbedVideo } = this;
      this._requestsEmbedVideo = {
        ...oldRequestsEmbedVideo,
        [videoId]: request,
      };
    }

    /**
     * Set the state that the API call for embedding the video for the given video ID is failed.
     *
     * @param videoId The video ID.
     * @param error An error from the API call for embedding the video of the given video ID.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _setErrorRequestEmbedVideo(videoId: string, error: Error) {
      this._setRequestEmbedVideoInProgress(videoId, Promise.reject(error));
    }

    /**
     * Sets the given embedded Kaltura player element (that has `.sendNotification()`, etc. APIs) for the given video ID.
     *
     * @param videoId The video ID.
     * @param kWidget The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs).
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _setEmbeddedVideo(videoId: string, kWidget: any) {
      this._setRequestEmbedVideoInProgress(videoId, Promise.resolve(kWidget));
      const { embeddedVideos: oldEmbeddedVideos } = this;
      this.embeddedVideos = {
        ...oldEmbeddedVideos,
        [videoId]: kWidget,
      };
    }

    /**
     * Sets up and sends the API call for embedding video for the given video ID.
     *
     * @param videoId The video ID.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    async _embedVideoImpl(videoId: string) {
      const { ownerDocument: doc } = this;
      // Given Kaltura replaces the `<div>` here with `<iframe>` with the video player,
      // rendering this `<div>` in `renderLightDOM()` will cause the video player being clobbered
      const playerId = Math.random()
        .toString(36)
        .slice(2);
      const div = doc!.createElement('div');
      div.id = playerId;
      div.className = `${prefix}--video-player__video`;
      const { _videoPlayer: videoPlayer } = this;
      if (!videoPlayer) {
        throw new TypeError('Cannot find the video player component to put the video content into.');
      }
      videoPlayer.appendChild(div);
      const embedVideoHandle = await VideoPlayerAPI.embedVideo(videoId, playerId, true);
      doc.getElementById(playerId)!.dataset.videoId = videoId;
      return embedVideoHandle.kWidget();
    }

    /**
     * Sends the API call for embedding video for the given video ID, and tracks the progress and the error of the REST call.
     *
     * @param videoId The video ID.
     * @internal
     */
    _embedVideo = async (videoId: string) => {
      const { _requestsEmbedVideo: requestsEmbedVideo } = this;
      const requestEmbedVideo = requestsEmbedVideo[videoId];
      if (requestEmbedVideo) {
        return requestEmbedVideo;
      }
      const promiseEmbedVideo = this._embedVideoImpl(videoId);
      this._setRequestEmbedVideoInProgress(videoId, promiseEmbedVideo);
      try {
        this._setEmbeddedVideo(videoId, await promiseEmbedVideo);
      } catch (error) {
        this._setErrorRequestEmbedVideo(videoId, error);
      }
      return promiseEmbedVideo;
    };
  }

  return DDSVideoPlayerContainerMixinImpl;
};

/**
 * Container component for video player.
 *
 * @element dds-video-player-container
 */
@customElement(`${ddsPrefix}-video-player-container`)
class DDSVideoPlayerContainer extends ConnectMixin<
  VideoPlayerContainerState,
  VideoPlayerAPIActions,
  VideoPlayerContainerStateProps,
  ActionCreatorsMapObject<VideoPlayerActions>
>(
  store as Store<VideoPlayerContainerState, VideoPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSVideoPlayerContainerMixin(DDSVideoPlayerComposite)) {}

export default DDSVideoPlayerContainer;
