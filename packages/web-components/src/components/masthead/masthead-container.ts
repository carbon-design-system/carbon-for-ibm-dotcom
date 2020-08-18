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
import ConnectMixin from '../../globals/mixins/connect';
import DDSMastheadComposite from './masthead-composite';

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

export type MastheadActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof monitorUserStatus>;

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
export function mapStateToProps(state: MastheadContainerState): MastheadContainerStateProps {
  const { localeAPI, translateAPI, profileAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { status } = profileAPI ?? {};
  return cleanProps({
    navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
    userStatus: status?.user,
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
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * A mixin for search container, TEMPORARY PURPOSE until we move this portion to Redux store.
 */
export const DDSMastheadSearchContainerMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  class DDSMastheadSearchContainerMixinImpl extends Base {
    /**
     * The search results to show in the UI.
     */
    _currentSearchResults!: string[];

    /**
     * `true` to open the search dropdown.
     */
    _openSearchDropdown!: boolean;

    /**
     * The query string in the search box.
     */
    _searchQueryString!: string;

    /**
     * The placeholder for `loadLanguage()` Redux action that will be mixed in.
     */
    _loadLanguage!: () => Promise<string>;

    /**
     * The query results.
     */
    _searchResults!: Map<string, string[]>;

    /**
     * `true` to stop further fetch operations. Should be set when this is detached from render tree.
     */
    _shouldPreventFetch = false;

    /**
     * @returns The endpoint to process the search query.
     */
    async _getSearchEndpoint() {
      const { _searchQueryString: searchQueryString } = this;
      const language = await this._loadLanguage();
      const [primary, country] = language!.split('-');
      return `https://www-api.ibm.com/search/typeahead/v1?lang=${primary}&cc=${country}&query=${searchQueryString}`;
    }

    /**
     * Fetches results for the current search query string.
     */
    async _fetchResults() {
      const { _searchQueryString: searchQueryString, _searchResults: searchResults } = this;
      const endpoint = await this._getSearchEndpoint();
      if (this._shouldPreventFetch) {
        return;
      }
      const items = (await (await fetch(endpoint)).json()).response.map(([result]) => result);
      searchResults.set(searchQueryString, items);
      this._setCurrentSearchResults();
    }

    /**
     * Updates the search results to show in the UI.
     */
    _setCurrentSearchResults() {
      const { _searchQueryString: searchQueryString, _searchResults: searchResults } = this;
      for (let { length } = searchQueryString; length > 0; --length) {
        const items = searchResults.get(searchQueryString.slice(0, length));
        if (items) {
          this._currentSearchResults = items;
          this._openSearchDropdown = true;
          // TODO: Figure out how to make this mix-in type-defined as `LitElement` inheritance
          (this as any).requestUpdate();
          return;
        }
      }
    }

    /**
     * Throttled version of `_handleInput()`.
     */
    async _handleInputImpl() {
      const { _searchQueryString: searchQueryString, _searchResults: searchResults } = this;
      const cachedSearchResults = searchResults.get(searchQueryString);
      if (!cachedSearchResults) {
        this._fetchResults().catch(() => {}); // The error is logged in the Redux store
      }
      // While we fetch the search results, we see if there is a cached search results for partial search query string.
      // If so, updates the UI with the cached search results.
      this._setCurrentSearchResults();
    }

    connectedCallback() {
      this._shouldPreventFetch = false;
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.connectedCallback();
    }

    disconnectedCallback() {
      this._shouldPreventFetch = true;
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.disconnectedCallback();
    }
  }

  return DDSMastheadSearchContainerMixinImpl;
};

/**
 * Container component for masthead.
 *
 * @element dds-masthead-container
 */
@customElement(`${ddsPrefix}-masthead-container`)
class DDSMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadSearchContainerMixin(DDSMastheadComposite)) {}

export default DDSMastheadContainer;
