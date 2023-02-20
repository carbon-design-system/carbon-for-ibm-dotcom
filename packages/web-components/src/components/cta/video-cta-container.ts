/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import {
  MediaData,
  MediaPlayerAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { loadMediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI';
import { MediaPlayerAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI.d';
import {
  DDSVideoPlayerContainerMixin,
  mapStateToProps,
  mapDispatchToProps,
} from '../video-player/video-player-container';
import ConnectMixin from '../../globals/mixins/connect';
import DDSVideoCTAComposite from './video-cta-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-cta-container>`.
 */
export interface VideoCTAContainerState {
  /**
   * The Redux state for `KalturaPlayerAPI`.
   */
  kalturaPlayerAPI?: MediaPlayerAPIState;
}

/**
 * The properties for `<dds-cta-container>` from Redux state.
 */
export interface VideoCTAContainerStateProps {
  /**
   * The video data, keyed by the video ID.
   */
  mediaData?: { [videoId: string]: MediaData };
}

/**
 * The Redux actions used for `<dds-cta-container>.
 */
export type CTAContainerActions = ReturnType<typeof loadMediaData>;

/**
 * Container component for CTA.
 *
 * @element dds-cta-container
 */
@customElement(`${ddsPrefix}-video-cta-container`)
class DDSVideoCTAContainer extends ConnectMixin<
  VideoCTAContainerState,
  MediaPlayerAPIActions,
  VideoCTAContainerStateProps,
  ActionCreatorsMapObject<CTAContainerActions>
>(
  store as Store<VideoCTAContainerState, MediaPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSVideoPlayerContainerMixin(DDSVideoCTAComposite)) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSVideoCTAContainer;
