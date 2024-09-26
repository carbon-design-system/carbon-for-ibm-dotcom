/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import {
  ActionCreatorsMapObject,
  Dispatch,
  Store,
  bindActionCreators,
} from 'redux';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LocaleAPIState } from '@carbon/ibmdotcom-services-store/es/types/localeAPI';
import {
  L0MenuItem,
  TranslateAPIState,
} from '@carbon/ibmdotcom-services-store/es/types/translateAPI';
import { ProfileAPIState } from '@carbon/ibmdotcom-services-store/es/types/profileAPI';
import store from '@carbon/ibmdotcom-services-store/es/store.js';
import {
  loadLanguage,
  setLanguage,
} from '@carbon/ibmdotcom-services-store/es/actions/localeAPI.js';
import { LocaleAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/localeAPI';
import { loadTranslation } from '@carbon/ibmdotcom-services-store/es/actions/translateAPI.js';
import { TranslateAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/translateAPI';
import { loadUserStatus } from '@carbon/ibmdotcom-services-store/es/actions/profileAPI.js';
import { ProfileAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/profileAPI';
import ConnectMixin from '../../globals/mixins/connect';

import C4DMastheadComposite from './masthead-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux state used for `<c4d-masthead-container>`.
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
 * The properties for `<c4d-masthead-container>` from Redux state.
 */
export interface MastheadContainerStateProps {
  /**
   * The L0 data.
   */
  l0Data?: L0MenuItem[];

  /**
   * The user authentication status.
   */
  userStatus?: string;
}

/**
 * The Redux actions used for `<c4d-masthead-container>.
 */
export type MastheadContainerActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof loadUserStatus>;

/**
 * @param state The Redux state for masthead.
 * @param self A reference to the masthead composite instance.
 * @returns The converted version of the given state, tailored for `<c4d-masthead-container>`.
 */
export function mapStateToProps(
  state: MastheadContainerState,
  self: C4DMastheadComposite
): MastheadContainerStateProps {
  const { localeAPI, translateAPI, profileAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { request } = profileAPI ?? {};
  const getUserL0Data = self.getL0Data.bind(self);

  // Attempt to collect data from current/new and deprecated locations.
  let endpointl0Data;
  let profileItems;
  if (language) {
    endpointl0Data = {
      current: translations?.[language]?.masthead?.nav,
      deprecated: translations?.[language]?.mastheadNav?.links,
    };

    profileItems = {
      authenticated: {
        current: translations?.[language]?.masthead?.profileMenu?.authenticated,
        deprecated: translations?.[language]?.profileMenu?.signedin,
      },
      unauthenticated: {
        current:
          translations?.[language]?.masthead?.profileMenu?.unauthenticated,
        deprecated: translations?.[language]?.profileMenu?.signedout,
      },
    };
  }

  return pickBy(
    {
      // Respect user-set L0 data. Otherwise, progressively enhance to new shape.
      l0Data:
        !language || getUserL0Data()
          ? undefined
          : endpointl0Data.current || endpointl0Data.deprecated,
      // Progressively enhance to new profile items shape.
      authenticatedProfileItems: !language
        ? undefined
        : profileItems.authenticated.current ||
          profileItems.authenticated.deprecated,
      unauthenticatedProfileItems: !language
        ? undefined
        : profileItems.unauthenticated.current ||
          profileItems.unauthenticated.deprecated,
      contactUsButton: !language
        ? undefined
        : translations?.[language]?.masthead?.contact,
      logoData: !language
        ? undefined
        : translations?.[language]?.masthead?.logo,
      userStatus: request?.user,
      language,
    },
    (value) => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<c4d-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(
  dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>
) {
  return bindActionCreators<
    MastheadContainerActions,
    ActionCreatorsMapObject<MastheadContainerActions>
  >(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
      _loadUserStatus: loadUserStatus,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for masthead.
 *
 * @element c4d-masthead-container
 */
@customElement(`${c4dPrefix}-masthead-container`)
class C4DMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadContainerActions>
>(
  store as Store<
    MastheadContainerState,
    LocaleAPIActions | TranslateAPIActions | ProfileAPIActions
  >,
  mapStateToProps,
  mapDispatchToProps
)(C4DMastheadComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DMastheadContainer;
