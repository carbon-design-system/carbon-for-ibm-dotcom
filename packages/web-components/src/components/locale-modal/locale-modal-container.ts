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
import {
  loadLanguage,
  setLanguage,
  loadLangDisplay,
  setLangDisplay,
  loadLocaleList,
} from '../../globals/services-store/actions/localeAPI';
import DDSLocaleModalComposite from './locale-modal-composite';

export { store };
export { default as reducers } from '../../globals/services-store/reducers';

const { stablePrefix: ddsPrefix } = ddsSettings;

type LocaleModalActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadLangDisplay>
  | ReturnType<typeof setLangDisplay>
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
interface LocaleModalContainerStateProps {
  /**
   * The locale list.
   */
  localeList?: LocaleList;
}

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-locale-modal-container>`.
 */
export function mapStateToProps(state: LocaleModalContainerState): LocaleModalContainerStateProps {
  const { localeAPI } = state;
  const { language, localeLists } = localeAPI ?? {};
  return {
    localeList: !language ? undefined : localeLists?.[language],
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-locale-modal-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators<LocaleModalActions, ActionCreatorsMapObject<LocaleModalActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadLangDisplay: loadLangDisplay,
      _setLangDisplay: setLangDisplay,
      _loadLocaleList: loadLocaleList,
    },
    dispatch
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
  LocaleModalContainerStateProps,
  ActionCreatorsMapObject<LocaleModalActions>
>(
  store as Store<LocaleModalContainerState>,
  mapStateToProps,
  mapDispatchToProps
)(DDSLocaleModalComposite) {}

export default DDSLocaleModalContainer;
