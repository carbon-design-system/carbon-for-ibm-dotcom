/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import {
  MediaData,
  MediaPlayerAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { loadMediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI';
import { MediaPlayerAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI.d';
import {
  C4DVideoPlayerContainerMixin,
  mapStateToProps,
  mapDispatchToProps,
} from '../video-player/video-player-container';
import ConnectMixin from '../../globals/mixins/connect';
import C4DVideoCTAComposite from './video-cta-composite';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux state used for `<c4d-cta-container>`.
 */
export interface VideoCTAContainerState {
  /**
   * The Redux state for `KalturaPlayerAPI`.
   */
  kalturaPlayerAPI?: MediaPlayerAPIState;
}

/**
 * The properties for `<c4d-cta-container>` from Redux state.
 */
export interface VideoCTAContainerStateProps {
  /**
   * The video data, keyed by the video ID.
   */
  mediaData?: { [videoId: string]: MediaData };
}

/**
 * The Redux actions used for `<c4d-cta-container>.
 */
export type CTAContainerActions = ReturnType<typeof loadMediaData>;

/**
 * Container component for CTA.
 *
 * @element c4d-cta-container
 */
@customElement(`${c4dPrefix}-video-cta-container`)
class C4DVideoCTAContainer extends ConnectMixin<
  VideoCTAContainerState,
  MediaPlayerAPIActions,
  VideoCTAContainerStateProps,
  ActionCreatorsMapObject<CTAContainerActions>
>(
  store as Store<VideoCTAContainerState, MediaPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(C4DVideoPlayerContainerMixin(C4DVideoCTAComposite)) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DVideoCTAContainer;
