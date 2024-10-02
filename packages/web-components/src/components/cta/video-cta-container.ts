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
import {
  MediaData,
  MediaPlayerAPIState,
} from '@carbon/ibmdotcom-services-store/es/types/kalturaPlayerAPI';
import store from '@carbon/ibmdotcom-services-store/es/store.js';
import { loadMediaData } from '@carbon/ibmdotcom-services-store/es/actions/kalturaPlayerAPI.js';
import { MediaPlayerAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/kalturaPlayerAPI';
import {
  C4DVideoPlayerContainerMixin,
  mapStateToProps,
  mapDispatchToProps,
} from '../video-player/video-player-container';
import ConnectMixin from '../../globals/mixins/connect';
import C4DVideoCTAComposite from './video-cta-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

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
