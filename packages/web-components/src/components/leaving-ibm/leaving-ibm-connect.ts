/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from 'redux';
import { LocaleAPIState } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  LeavingIBMLabels,
  MiscLabels,
  TranslateAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { loadTranslation } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { setLanguage } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';

/**
 * The Redux state used for `<dds-leaving-ibm-container>`.
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
 * The properties for `<dds-leaving-ibm-container>` from Redux state.
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
 * The Redux actions used for `<dds-leaving-ibm-container>`.
 */
export type LeavingIbmContainerActions =
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>;

/**
 * @param state The Redux state for leaving ibm component.
 * @returns The converted version of the given state, tailored for `<dds-leaving-ibm-container>`.
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
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
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
