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
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store.js';
import { LocaleAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI';
import {
  BasicLink,
  BasicLinkSet,
  TranslateAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI';
import {
  loadLanguage,
  setLanguage,
  loadLocaleList,
  setLocaleList,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.js';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import {
  loadTranslation,
  setTranslation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.js';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import {
  LocaleModalContainerState,
  LocaleModalContainerStateProps,
  LocaleModalContainerActions,
} from '../locale-modal/locale-modal-container';
import C4DFooterComposite from './footer-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux actions used for `<c4d-footer-container>`.
 */
export type FooterContainerActions =
  | LocaleModalContainerActions
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof setTranslation>;

/**
 * The Redux state used for `<c4d-footer-container>`.
 */
export interface FooterContainerState extends LocaleModalContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;

  /**
   * The Redux state for `TranslateAPI`.
   */
  translateAPI?: TranslateAPIState;
}

/**
 * The properties for `<c4d-footer-container>` from Redux state.
 */
export interface FooterContainerStateProps
  extends LocaleModalContainerStateProps {
  /**
   * The footer links.
   */
  links?: BasicLinkSet[];

  /**
   * The legal nav links.
   */
  legalLinks?: BasicLink[];
}

/**
 * @param state The Redux state for footer
 * @param ownProps The current component props
 * @returns The converted version of the given state, tailored for `<c4d-footer-container>`.
 */
export function mapStateToProps(
  state: FooterContainerState,
  ownProps?: FooterContainerStateProps
): FooterContainerStateProps {
  const { localeAPI, translateAPI } = state;
  const { language, localeLists } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};

  const hasUserLinks = ownProps?.links !== undefined;
  const hasUserLegalLinks = ownProps?.legalLinks !== undefined;

  return pickBy(
    {
      localeList: !language ? undefined : localeLists?.[language],
      links:
        hasUserLinks || !language
          ? undefined
          : translations?.[language]?.footerMenu,
      legalLinks:
        hasUserLegalLinks || !language
          ? undefined
          : translations?.[language]?.footerThin,
    },
    (value) => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<c4d-footer-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(
  dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions>
) {
  return bindActionCreators<
    FooterContainerActions,
    ActionCreatorsMapObject<FooterContainerActions>
  >(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadLocaleList: loadLocaleList,
      _setLocaleList: setLocaleList,
      _loadTranslation: loadTranslation,
      _setTranslation: setTranslation,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for footer.
 *
 * @element c4d-footer-container
 */
@customElement(`${c4dPrefix}-footer-container`)
class C4DFooterContainer extends ConnectMixin<
  FooterContainerState,
  LocaleAPIActions | TranslateAPIActions,
  FooterContainerStateProps,
  ActionCreatorsMapObject<FooterContainerActions>
>(
  store as Store<FooterContainerState, LocaleAPIActions | TranslateAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(C4DFooterComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFooterContainer;
