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
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../globals/services-store/store';
import { LocaleList, LocaleAPIState } from '../../globals/services-store/types/localeAPI';
import { BasicLink, BasicLinkSet, TranslateAPIState } from '../../globals/services-store/types/translateAPI';
import {
  loadLanguage,
  setLanguage,
  loadLangDisplay,
  setLangDisplay,
  loadLocaleList,
  setLocaleList,
} from '../../globals/services-store/actions/localeAPI';
import { loadTranslation, setTranslation } from '../../globals/services-store/actions/translateAPI';
import DDSFooterComposite from './footer-composite';

export { store };
export { default as reducers } from '../../globals/services-store/reducers';

const { stablePrefix: ddsPrefix } = ddsSettings;

type FooterActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadLangDisplay>
  | ReturnType<typeof setLangDisplay>
  | ReturnType<typeof loadLocaleList>
  | ReturnType<typeof setLocaleList>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof setTranslation>;

/**
 * The Redux state used for `<dds-footer-container>`.
 */
export interface FooterContainerState {
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
interface FooterContainerStateProps {
  /**
   * The language to show in the UI.
   */
  langDisplay?: string;

  /**
   * The locale list.
   */
  localeList?: LocaleList;

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
 * @returns The converted version of the given state, tailored for `<dds-footer-container>`.
 */
export function mapStateToProps(state: FooterContainerState): FooterContainerStateProps {
  const { localeAPI, translateAPI } = state;
  const { langDisplay, language, localeLists } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  return cleanProps({
    langDisplay,
    localeList: !language ? undefined : localeLists?.[language],
    links: !language ? undefined : translations?.[language]?.footerMenu,
    legalLinks: !language ? undefined : translations?.[language]?.footerThin,
  });
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-footer-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators<FooterActions, ActionCreatorsMapObject<FooterActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadLangDisplay: loadLangDisplay,
      _setLangDisplay: setLangDisplay,
      _loadLocaleList: loadLocaleList,
      _setLocaleList: setLocaleList,
      _loadTranslation: loadTranslation,
      _setTranslation: setTranslation,
    },
    dispatch
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
  FooterContainerStateProps,
  ActionCreatorsMapObject<FooterActions>
>(
  store as Store<FooterContainerState>,
  mapStateToProps,
  mapDispatchToProps
)(DDSFooterComposite) {}

export default DDSFooterContainer;
