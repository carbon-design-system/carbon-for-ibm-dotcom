/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { VideoData, VideoPlayerAPIState } from '../../globals/services-store/types/videoPlayerAPI';
import store from '../../globals/services-store/store';
import { loadVideoData, VideoPlayerAPIActions } from '../../globals/services-store/actions/videoPlayerAPI';
import { DDSVideoPlayerContainerMixin, mapStateToProps, mapDispatchToProps } from '../video-player/video-player-container';
import ConnectMixin from '../../globals/mixins/connect';
import DDSVideoCTAComposite from './video-cta-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-cta-container>`.
 */
export interface VideoCTAContainerState {
  /**
   * The Redux state for `VideoPlayerAPI`.
   */
  videoPlayerAPI?: VideoPlayerAPIState;
}

/**
 * The properties for `<dds-cta-container>` from Redux state.
 */
export interface VideoCTAContainerStateProps {
  /**
   * The video data, keyed by the video ID.
   */
  videoData?: { [videoId: string]: VideoData };
}

/**
 * The Redux actions used for `<dds-cta-container>.
 */
export type CTAContainerActions = ReturnType<typeof loadVideoData>;

/**
 * Container component for CTA.
 *
 * @element dds-cta-container
 */
@customElement(`${ddsPrefix}-video-cta-container`)
class DDSVideoCTAContainer extends ConnectMixin<
  VideoCTAContainerState,
  VideoPlayerAPIActions,
  VideoCTAContainerStateProps,
  ActionCreatorsMapObject<CTAContainerActions>
>(
  store as Store<VideoCTAContainerState, VideoPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSVideoPlayerContainerMixin(DDSVideoCTAComposite)) {}

export default DDSVideoCTAContainer;
