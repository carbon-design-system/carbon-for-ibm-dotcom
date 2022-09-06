/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  BasicLink,
  BasicLinkSet,
  TranslateAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import {
  loadLanguage,
  setLanguage,
  loadLocaleList,
  setLocaleList,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { loadTranslation, setTranslation } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import {
  LocaleModalContainerState,
  LocaleModalContainerStateProps,
  LocaleModalContainerActions,
} from '../locale-modal/locale-modal-container';
import DDSFooterComposite from './footer-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux actions used for `<dds-footer-container>`.
 */
export type FooterContainerActions =
  | LocaleModalContainerActions
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof setTranslation>;

/**
 * The Redux state used for `<dds-footer-container>`.
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
 * The properties for `<dds-footer-container>` from Redux state.
 */
export interface FooterContainerStateProps extends LocaleModalContainerStateProps {
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
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-footer-container>`.
 */
export function mapStateToProps(state: FooterContainerState): FooterContainerStateProps {
  const { localeAPI, translateAPI } = state;
  const { language, localeLists } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  return pickBy(
    {
      localeList: !language ? undefined : localeLists?.[language],
      links: !language ? undefined : translations?.[language]?.footerMenu,
      legalLinks: !language ? undefined : translations?.[language]?.footerThin,
    },
    value => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-footer-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions>) {
  return bindActionCreators<FooterContainerActions, ActionCreatorsMapObject<FooterContainerActions>>(
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
 * Container component for masthead.
 *
 * @element dds-footer-container
 */
@customElement(`${ddsPrefix}-footer-container`)
class DDSFooterContainer extends ConnectMixin<
  FooterContainerState,
  LocaleAPIActions | TranslateAPIActions,
  FooterContainerStateProps,
  ActionCreatorsMapObject<FooterContainerActions>
>(
  store as Store<FooterContainerState, LocaleAPIActions | TranslateAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSFooterComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFooterContainer;
