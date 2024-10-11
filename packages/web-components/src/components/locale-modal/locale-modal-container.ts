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
import store from '@carbon/ibmdotcom-services-store/es/store.js';
import {
  LocaleList,
  LocaleAPIState,
} from '@carbon/ibmdotcom-services-store/es/types/localeAPI';
import {
  loadLanguage,
  setLanguage,
  loadLocaleList,
} from '@carbon/ibmdotcom-services-store/es/actions/localeAPI.js';
import { LocaleAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/localeAPI';
import C4DLocaleModalComposite from './locale-modal-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux actions used for `<c4d-locale-modal-container>`.
 */
export type LocaleModalContainerActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadLocaleList>;

/**
 * The Redux state used for `<c4d-locale-modal-container>`.
 */
export interface LocaleModalContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;
}

/**
 * The properties for `<c4d-locale-modal-container>` from Redux state.
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
 * @returns The converted version of the given state, tailored for `<c4d-locale-modal-container>`.
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
 * @returns The methods in `<c4d-locale-modal-container>` to dispatch Redux actions.
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
 * @element c4d-locale-modal-container
 */
@customElement(`${c4dPrefix}-locale-modal-container`)
class C4DLocaleModalContainer extends ConnectMixin<
  LocaleModalContainerState,
  LocaleAPIActions,
  LocaleModalContainerStateProps,
  ActionCreatorsMapObject<LocaleModalContainerActions>
>(
  store as Store<LocaleModalContainerState, LocaleAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(C4DLocaleModalComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLocaleModalContainer;
