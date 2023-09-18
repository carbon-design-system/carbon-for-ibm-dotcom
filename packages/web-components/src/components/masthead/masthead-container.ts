/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
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
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { LocaleAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  L0MenuItem,
  TranslateAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { ProfileAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI.d';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import {
  loadLanguage,
  setLanguage,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { loadTranslation } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { loadUserStatus } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI';
import { ProfileAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI.d';
import ConnectMixin from '../../globals/mixins/connect';

import C4DMastheadComposite from './masthead-composite';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

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
   * The nav links.
   */
  navLinks?: L0MenuItem[];

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
 * @returns The converted version of the given state, tailored for `<c4d-masthead-container>`.
 */
export function mapStateToProps(
  state: MastheadContainerState
): MastheadContainerStateProps {
  const { localeAPI, translateAPI, profileAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { request } = profileAPI ?? {};
  return pickBy(
    {
      navLinks: !language
        ? undefined
        : translations?.[language]?.mastheadNav?.links,
      authenticatedProfileItems: !language
        ? undefined
        : translations?.[language]?.profileMenu.signedin,
      unauthenticatedProfileItems: !language
        ? undefined
        : translations?.[language]?.profileMenu.signedout,
      authenticatedCtaButtons: !language
        ? undefined
        : translations?.[language]?.masthead?.profileMenu.signedin.ctaButtons,
      unauthenticatedCtaButtons: !language
        ? undefined
        : translations?.[language]?.masthead?.profileMenu.signedout.ctaButtons,
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
