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
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { LocaleAPIState } from '../../globals/services-store/types/localeAPI';
import store from '../../globals/services-store/store';
import { setLanguage } from '../../globals/services-store/actions/localeAPI';
import { loadSearchResults, SearchAPIActions } from '../../globals/services-store/actions/searchAPI';
import ConnectMixin from '../../globals/mixins/connect';
import DDSMastheadSearchComposite from './masthead-search-composite';
import { SearchAPIState } from '../../globals/services-store/types/searchAPI';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-masthead-search-container>`.
 */
export interface MastheadSearchContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;

  /**
   * The Redux state for search APIs.
   */
  searchAPI?: SearchAPIState;
}

/**
 * The properties for `<dds-masthead-search-container>` from Redux state.
 */
export interface MastheadSearchContainerStateProps {
  /**
   * The current search results;
   */
  currentSearchResults?: string[];

  /**
   * `true` to open the search dropdown.
   */
  openSearchDropdown?: boolean;
}

/**
 * The Redux actions used for `<dds-masthead-search-container>`.
 */
export type MastheadSearchContainerActions = ReturnType<typeof setLanguage> | ReturnType<typeof loadSearchResults>;

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
export function mapStateToProps(state: MastheadSearchContainerState): MastheadSearchContainerStateProps {
  const { localeAPI, searchAPI } = state;
  const { language } = localeAPI ?? {};
  const { currentSearchQueryString, searchResults } = searchAPI ?? {};
  let currentSearchResults;
  for (let { length = 0 } = currentSearchQueryString ?? {}; !currentSearchResults && length > 0; --length) {
    currentSearchResults = searchResults?.[currentSearchQueryString!.substr(0, length)]?.[language!];
  }
  return {
    currentSearchResults: currentSearchResults ?? [],
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<SearchAPIActions>) {
  return bindActionCreators<MastheadSearchContainerActions, ActionCreatorsMapObject<MastheadSearchContainerActions>>(
    {
      _setLanguage: setLanguage,
      _loadSearchResults: loadSearchResults,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for masthead search.
 *
 * @element dds-masthead-search-container
 */
@customElement(`${ddsPrefix}-masthead-search-container`)
class DDSMastheadSearchContainer extends ConnectMixin<
  MastheadSearchContainerState,
  SearchAPIActions,
  MastheadSearchContainerStateProps,
  ActionCreatorsMapObject<MastheadSearchContainerActions>
>(
  store as Store<MastheadSearchContainerState, SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadSearchComposite) {}

export default DDSMastheadSearchContainer;
