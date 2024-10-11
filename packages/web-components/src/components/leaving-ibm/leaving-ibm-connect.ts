/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from 'redux';
import { LocaleAPIState } from '@carbon/ibmdotcom-services-store/es/types/localeAPI';
import {
  LeavingIBMLabels,
  MiscLabels,
  TranslateAPIState,
} from '@carbon/ibmdotcom-services-store/es/types/translateAPI';
import { loadTranslation } from '@carbon/ibmdotcom-services-store/es/actions/translateAPI.js';
import { TranslateAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/translateAPI';
import { setLanguage } from '@carbon/ibmdotcom-services-store/es/actions/localeAPI.js';

/**
 * The Redux state used for `<c4d-leaving-ibm-container>`.
 */
export interface LeavingIbmContainerState {
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
 * The properties for `<c4d-leaving-ibm-container>` from Redux state.
 */
export interface LeavingIbmContainerStateProps {
  /**
   * Leaving IBM modal copy
   */
  leavingIbmCopy?: LeavingIBMLabels;

  /**
   * Leaving IBM modal button label
   */
  leavingIbmButtonLabel?: MiscLabels['continueText'];
}

/**
 * The Redux actions used for `<c4d-leaving-ibm-container>`.
 */
export type LeavingIbmContainerActions =
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>;

/**
 * @param state The Redux state for leaving ibm component.
 * @returns The converted version of the given state, tailored for `<c4d-leaving-ibm-container>`.
 */
export function mapStateToProps(
  state: LeavingIbmContainerState
): LeavingIbmContainerStateProps {
  const { localeAPI, translateAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  return {
    leavingIbmCopy: !language ? undefined : translations?.[language]?.leaving,
    leavingIbmButtonLabel: !language
      ? undefined
      : translations?.[language]?.misc?.continueText,
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<c4d-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<TranslateAPIActions>) {
  return bindActionCreators<
    LeavingIbmContainerActions,
    ActionCreatorsMapObject<LeavingIbmContainerActions>
  >(
    {
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}
