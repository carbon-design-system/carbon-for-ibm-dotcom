/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import { customElement } from 'lit/decorators.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { MediaPlayerAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI.d';
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
  MediaPlayerAPIActions,
  VideoPlayerContainerStateProps,
  ActionCreatorsMapObject<VideoPlayerActions>
>(
  store as Store<VideoPlayerContainerState, MediaPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSVideoPlayerContainerMixin(DDSLightboxVideoPlayerComposite)) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLightboxVideoPlayerContainer;
