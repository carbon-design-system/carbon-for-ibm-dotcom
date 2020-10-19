/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LocaleAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import { MastheadLink, TranslateAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import {
  USER_AUTHENTICATION_STATUS,
  ProfileAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI.d';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { loadLanguage, setLanguage } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { loadTranslation } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { monitorUserStatus } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI';
import { ProfileAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI.d';
import { loadSearchResults } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI';
import { SearchAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
import ConnectMixin from '../../globals/mixins/connect';
import {
  MastheadSearchContainerState,
  MastheadSearchContainerStateProps,
  MastheadSearchContainerActions,
} from './masthead-search-container';
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
 * The properties for `<dds-masthead-container>` from Redux state.
 */
export interface MastheadContainerStateProps extends MastheadSearchContainerStateProps {
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
 * The Redux actions used for `<dds-masthead-container>.
 */
export type MastheadContainerActions =
  | MastheadSearchContainerActions
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof monitorUserStatus>;

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
export function mapStateToProps(state: MastheadContainerState): MastheadContainerStateProps {
  const { localeAPI, translateAPI, profileAPI, searchAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { status } = profileAPI ?? {};
  const { currentSearchQueryString, searchResults } = searchAPI ?? {};
  let currentSearchResults;
  for (let { length = 0 } = currentSearchQueryString ?? {}; !currentSearchResults && length > 0; --length) {
    currentSearchResults = searchResults?.[currentSearchQueryString!.substr(0, length)]?.[language!];
  }
  return pickBy(
    {
      authenticatedProfileItems: !language ? undefined : translations?.[language]?.profileMenu.signedin,
      navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
      unauthenticatedProfileItems: !language ? undefined : translations?.[language]?.profileMenu.signedout,
      userStatus: status?.user,
      currentSearchResults: currentSearchResults ?? [],
    },
    value => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>) {
  return bindActionCreators<MastheadContainerActions, ActionCreatorsMapObject<MastheadContainerActions>>(
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
  ActionCreatorsMapObject<MastheadContainerActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadComposite) {}

export default DDSMastheadContainer;
