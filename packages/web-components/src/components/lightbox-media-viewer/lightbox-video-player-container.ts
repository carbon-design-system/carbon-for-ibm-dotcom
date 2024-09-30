/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import store from '@carbon/ibmdotcom-services-store/es/store.js';
import { MediaPlayerAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/kalturaPlayerAPI';
import ConnectMixin from '../../globals/mixins/connect';
import {
  VideoPlayerContainerState,
  VideoPlayerContainerStateProps,
  VideoPlayerActions,
  C4DVideoPlayerContainerMixin,
  mapStateToProps,
  mapDispatchToProps,
} from '../video-player/video-player-container';
import C4DLightboxVideoPlayerComposite from './lightbox-video-player-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Container component for lightbox media viewer, works with video data.
 *
 * @element c4d-lightbox-video-player-container
 */
@customElement(`${c4dPrefix}-lightbox-video-player-container`)
class C4DLightboxVideoPlayerContainer extends ConnectMixin<
  VideoPlayerContainerState,
  MediaPlayerAPIActions,
  VideoPlayerContainerStateProps,
  ActionCreatorsMapObject<VideoPlayerActions>
>(
  store as Store<VideoPlayerContainerState, MediaPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(C4DVideoPlayerContainerMixin(C4DLightboxVideoPlayerComposite)) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLightboxVideoPlayerContainer;
