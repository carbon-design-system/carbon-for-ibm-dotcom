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
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../globals/services-store/store';
import { LocaleAPIActions } from '../../globals/services-store/actions/localeAPI';
import { TranslateAPIActions } from '../../globals/services-store/actions/translateAPI';
import { ProfileAPIActions } from '../../globals/services-store/actions/profileAPI';
import { SearchAPIActions } from '../../globals/services-store/actions/searchAPI';
import {
  FooterContainerActions,
  FooterContainerState,
  FooterContainerStateProps,
  mapStateToProps as mapStateToPropsFooter,
  mapDispatchToProps as mapDispatchToPropsFooter,
} from '../footer/footer-container';
import {
  MastheadContainerActions,
  MastheadContainerState,
  MastheadContainerStateProps,
  mapStateToProps as mapStateToPropsMasthead,
  mapDispatchToProps as mapDispatchToPropsMasthead,
} from '../masthead/masthead-container';
import DDSDotcomShellComposite from './dotcom-shell-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-dotcom-shell-container>`.
 */
export interface DotcomShellContainerState extends MastheadContainerState, FooterContainerState {}

/**
 * The properties for `<dds-dotcom-shell-container>` from Redux state.
 */
export interface DotcomShellContainerStateProps extends MastheadContainerStateProps, FooterContainerStateProps {}

/**
 * The Redux actions used for `<dds-dotcom-shell-container>`.
 */
export type DotcomShellContainerActions = MastheadContainerActions | FooterContainerActions;

/**
 * @param state The Redux state for dotcom shell.
 * @returns The converted version of the given state, tailored for `<dds-dotcomshell-container>`.
 */
export function mapStateToProps(
  state: MastheadContainerState & FooterContainerState
): MastheadContainerStateProps & FooterContainerStateProps {
  const footerProps = mapStateToPropsFooter(state);
  return {
    ...mapStateToPropsMasthead(state),
    ...Object.keys(footerProps).reduce((acc, key) => {
      acc[key !== 'links' ? key : 'footerLinks'] = footerProps[key];
      return acc;
    }, {}),
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
  DotcomShellContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions,
  DotcomShellContainerStateProps,
  ActionCreatorsMapObject<DotcomShellContainerActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSDotcomShellComposite) {}

export default DDSDotcomShellContainer;
