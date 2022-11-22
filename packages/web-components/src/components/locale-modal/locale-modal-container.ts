/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import {
  LocaleList,
  LocaleAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  loadLanguage,
  setLanguage,
  loadLocaleList,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import DDSLocaleModalComposite from './locale-modal-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux actions used for `<dds-locale-modal-container>`.
 */
export type LocaleModalContainerActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadLocaleList>;

/**
 * The Redux state used for `<dds-locale-modal-container>`.
 */
export interface LocaleModalContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;
}

/**
 * The properties for `<dds-locale-modal-container>` from Redux state.
 */
export interface LocaleModalContainerStateProps {
  /**
   * The display language.
   */
  langDisplay?: string;

  /**
   * The locale list.
   */
  localeList?: LocaleList;
}

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-locale-modal-container>`.
 */
export function mapStateToProps(
  state: LocaleModalContainerState
): LocaleModalContainerStateProps {
  const { localeAPI } = state;
  const { language, localeLists } = localeAPI ?? {};
  return pickBy(
    {
      localeList: !language ? undefined : localeLists?.[language],
    },
    (value) => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-locale-modal-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions>) {
  return bindActionCreators<
    LocaleModalContainerActions,
    ActionCreatorsMapObject<LocaleModalContainerActions>
  >(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadLocaleList: loadLocaleList,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * Container component for masthead.
 *
 * @element dds-locale-modal-container
 */
@customElement(`${ddsPrefix}-locale-modal-container`)
class DDSLocaleModalContainer extends ConnectMixin<
  LocaleModalContainerState,
  LocaleAPIActions,
  LocaleModalContainerStateProps,
  ActionCreatorsMapObject<LocaleModalContainerActions>
>(
  store as Store<LocaleModalContainerState, LocaleAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSLocaleModalComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLocaleModalContainer;
