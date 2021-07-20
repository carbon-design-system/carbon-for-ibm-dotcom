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
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { VideoPlayerAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/videoPlayerAPI.d';
import ConnectMixin from '../../globals/mixins/connect';
import {
  VideoPlayerContainerState,
  VideoPlayerContainerStateProps,
  VideoPlayerActions,
  DDSVideoPlayerContainerMixin,
  mapStateToProps,
  mapDispatchToProps,
} from '../video-player/video-player-container';
import DDSLightboxVideoPlayerComposite from './lightbox-video-player-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for lightbox media viewer, works with video data.
 *
 * @element dds-lightbox-video-player-container
 */
@customElement(`${ddsPrefix}-lightbox-video-player-container`)
class DDSLightboxVideoPlayerContainer extends ConnectMixin<
  VideoPlayerContainerState,
  VideoPlayerAPIActions,
  VideoPlayerContainerStateProps,
  ActionCreatorsMapObject<VideoPlayerActions>
>(
  store as Store<VideoPlayerContainerState, VideoPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSVideoPlayerContainerMixin(DDSLightboxVideoPlayerComposite)) {}

export default DDSLightboxVideoPlayerContainer;
