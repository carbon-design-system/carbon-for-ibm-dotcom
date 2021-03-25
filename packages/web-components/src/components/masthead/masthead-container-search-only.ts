/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LocaleAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import { TranslateAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { ProfileAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI.d';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { loadSearchResults } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI';
import { SearchAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
import ConnectMixin from '../../globals/mixins/connect';
import { MastheadSearchContainerState } from './masthead-search-container';
import DDSMastheadComposite from './masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-masthead-container>`.
 */
export interface MastheadContainerState extends MastheadSearchContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;

  /**
   * The Redux state for `TranslateAPI`.
   */
  translateAPI?: TranslateAPIState;

  /**
   * The Redux state for `ProfileAPI`.
   */
  profileAPI?: ProfileAPIState;
}

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
export function mapStateToProps(state: MastheadContainerState) {
  const { localeAPI, searchAPI } = state;
  const { language } = localeAPI ?? {};
  const { currentSearchQueryString, searchResults } = searchAPI ?? {};
  let currentSearchResults;
  for (let { length = 0 } = currentSearchQueryString ?? {}; !currentSearchResults && length > 0; --length) {
    currentSearchResults = searchResults?.[currentSearchQueryString!.substr(0, length)]?.[language!];
  }
  return pickBy(
    {
      currentSearchResults: currentSearchResults ?? [],
    },
    value => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<SearchAPIActions>) {
  return bindActionCreators(
    {
      _loadSearchResults: loadSearchResults,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for masthead
 *
 * @element dds-masthead-container-with-search
 */
@customElement(`${ddsPrefix}-masthead-container-search-only`)
class DDSMastheadContainerSearchOnly extends ConnectMixin<MastheadContainerState, SearchAPIActions>(
  store as Store<MastheadContainerState, SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadComposite) {}

export default DDSMastheadContainerSearchOnly;
