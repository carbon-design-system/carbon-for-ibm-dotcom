/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Dispatch, Store } from 'redux';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { ProfileAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI.d';
import { SearchAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
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
import C4DMastheadComposite from '../masthead/masthead-composite';
import C4DDotcomShellComposite from './dotcom-shell-composite';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux state used for `<c4d-dotcom-shell-container>`.
 */
export interface DotcomShellContainerState
  extends MastheadContainerState,
    FooterContainerState {}

/**
 * The properties for `<c4d-dotcom-shell-container>` from Redux state.
 */
export interface DotcomShellContainerStateProps
  extends MastheadContainerStateProps,
    FooterContainerStateProps {}

/**
 * The Redux actions used for `<c4d-dotcom-shell-container>`.
 */
export type DotcomShellContainerActions =
  | MastheadContainerActions
  | FooterContainerActions;

/**
 * @param state The Redux state for dotcom shell.
 * @returns The converted version of the given state, tailored for `<c4d-dotcomshell-container>`.
 */
export function mapStateToProps(
  state: MastheadContainerState & FooterContainerState,
  self: C4DMastheadComposite
): MastheadContainerStateProps & FooterContainerStateProps {
  const footerProps = mapStateToPropsFooter(state);
  return {
    ...mapStateToPropsMasthead(state, self),
    ...Object.keys(footerProps).reduce((acc, key) => {
      acc[key !== 'links' ? key : 'footerLinks'] = footerProps[key];
      return acc;
    }, {}),
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<c4d-dotcomshell-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(
  dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | ProfileAPIActions>
) {
  return {
    ...mapDispatchToPropsMasthead(dispatch),
    ...mapDispatchToPropsFooter(dispatch),
  };
}

/**
 * Container component for dotcom shell.
 *
 * @element c4d-dotcom-shell-container
 */
@customElement(`${c4dPrefix}-dotcom-shell-container`)
class C4DDotcomShellContainer extends ConnectMixin<
  DotcomShellContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions,
  DotcomShellContainerStateProps,
  ActionCreatorsMapObject<DotcomShellContainerActions>
>(
  store as Store<
    MastheadContainerState,
    | LocaleAPIActions
    | TranslateAPIActions
    | ProfileAPIActions
    | SearchAPIActions
  >,
  mapStateToProps,
  mapDispatchToProps
)(C4DDotcomShellComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DDotcomShellContainer;
