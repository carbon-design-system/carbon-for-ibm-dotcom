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
import { MastheadLink, TranslateAPIState } from '../../globals/services-store/types/translateAPI';
import { USER_AUTHENTICATION_STATUS, ProfileAPIState } from '../../globals/services-store/types/profileAPI';
import store from '../../globals/services-store/store';
import { loadLanguage, setLanguage, LocaleAPIActions } from '../../globals/services-store/actions/localeAPI';
import { loadTranslation, TranslateAPIActions } from '../../globals/services-store/actions/translateAPI';
import { monitorUserStatus, ProfileAPIActions } from '../../globals/services-store/actions/profileAPI';
import { loadSearchResults, SearchAPIActions } from '../../globals/services-store/actions/searchAPI';
import ConnectMixin from '../../globals/mixins/connect';
import DDSMastheadComposite from './masthead-composite';
import { SearchAPIState } from '../../globals/services-store/types/searchAPI';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * An profile item in masthead.
 */
export interface MastheadProfileItem {
  /**
   * `true` if this profile item is for logging in.
   */
  isLoginItem?: boolean;

  /**
   * The key identifying this profile item within the menu.
   */
  key: string;

  /**
   * The title text.
   */
  title: string;

  /**
   * The link URL.
   */
  url?: string;
}

/**
 * The Redux state used for `<dds-masthead-container>`.
 */
export interface MastheadContainerState {
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
 * The Redux state used for the search container.
 */
export interface SearchContainerState {
  searchAPI?: SearchAPIState;
}

/**
 * The properties for `<dds-masthead-container>` from Redux state.
 */
export interface MastheadContainerStateProps {
  /**
   * The nav links.
   */
  navLinks?: MastheadLink[];

  /**
   * The user authentication status.
   */
  userStatus?: USER_AUTHENTICATION_STATUS;
}

/**
 * The properties for search container from Redux state.
 */
export interface SearchContainerStateProps {
  /**
   * The current search results;
   */
  currentSearchResults?: string[];

  /**
   * `true` to open the search dropdown.
   */
  openSearchDropdown?: boolean;
}

export type MastheadActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof monitorUserStatus>
  | ReturnType<typeof loadSearchResults>;

/**
 * @param props A key/value pair.
 * @returns The modified version of the given `props` with all properties with `undefined` value removed.
 */
function cleanProps(props: { [key: string]: unknown }) {
  return Object.keys(props).reduce(
    (acc, prop) =>
      typeof props[prop] === 'undefined'
        ? acc
        : {
            ...acc,
            [prop]: props[prop],
          },
    {}
  );
}

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
export function mapStateToProps(
  state: MastheadContainerState & SearchContainerState
): MastheadContainerStateProps & SearchContainerStateProps {
  const { localeAPI, translateAPI, profileAPI, searchAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { status } = profileAPI ?? {};
  const { currentSearchQueryString, searchResults } = searchAPI ?? {};
  let currentSearchResults;
  for (let { length = 0 } = currentSearchQueryString ?? {}; !currentSearchResults && length > 0; --length) {
    currentSearchResults = searchResults?.[currentSearchQueryString!.substr(0, length)]?.[language!];
  }
  return cleanProps({
    navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
    userStatus: status?.user,
    currentSearchResults: currentSearchResults ?? [],
  });
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>) {
  return bindActionCreators<MastheadActions, ActionCreatorsMapObject<MastheadActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
      _monitorUserStatus: monitorUserStatus,
      _loadSearchResults: loadSearchResults,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for masthead.
 *
 * @element dds-masthead-container
 */
@customElement(`${ddsPrefix}-masthead-container`)
class DDSMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadComposite) {}

export default DDSMastheadContainer;
