/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Dispatch, Store } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../globals/services-store/store';
import { LocaleAPIActions } from '../../globals/services-store/actions/localeAPI';
import { TranslateAPIActions } from '../../globals/services-store/actions/translateAPI';
import { ProfileAPIActions } from '../../globals/services-store/actions/profileAPI';
import {
  FooterActions,
  FooterContainerState,
  FooterContainerStateProps,
  mapStateToProps as mapStateToPropsFooter,
  mapDispatchToProps as mapDispatchToPropsFooter,
} from '../footer/footer-container';
import {
  MastheadActions,
  MastheadContainerState,
  MastheadContainerStateProps,
  DDSMastheadSearchContainerMixin,
  mapStateToProps as mapStateToPropsMasthead,
  mapDispatchToProps as mapDispatchToPropsMasthead,
} from '../masthead/masthead-container';
import DDSDotcomShellComposite from './dotcom-shell-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * @param state The Redux state for dotcom shell.
 * @returns The converted version of the given state, tailored for `<dds-dotcomshell-container>`.
 */
export function mapStateToProps(
  state: MastheadContainerState & FooterContainerState
): MastheadContainerStateProps & FooterContainerStateProps {
  return {
    ...mapStateToPropsMasthead(state),
    ...mapStateToPropsFooter(state),
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-dotcomshell-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>) {
  return {
    ...mapDispatchToPropsMasthead(dispatch),
    ...mapDispatchToPropsFooter(dispatch),
  };
}

/**
 * Container component for dotcom shell.
 *
 * @element dds-dotcom-shell-container
 */
@customElement(`${ddsPrefix}-dotcom-shell-container`)
class DDSDotcomShellContainer extends ConnectMixin<
  MastheadContainerState | FooterContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions,
  MastheadContainerStateProps | FooterContainerStateProps,
  ActionCreatorsMapObject<MastheadActions | FooterActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadSearchContainerMixin(DDSDotcomShellComposite)) {}

export default DDSDotcomShellContainer;
