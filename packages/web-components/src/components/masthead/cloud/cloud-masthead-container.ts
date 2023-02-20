/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import pickBy from 'lodash-es/pickBy.js';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { CloudAccountAuthAPIState } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/cloudAccountAuthAPI.d';
import store from '../../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { TranslateAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { loadUserStatus } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/cloudAccountAuthAPI';
// eslint-disable-next-line max-len
import { CloudAccountAuthAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/cloudAccountAuthAPI.d';
import ConnectMixin from '../../../globals/mixins/connect';
import { loadTranslation } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { loadLanguage, setLanguage } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { MastheadContainerState, MastheadContainerStateProps } from '../masthead-container';
import DDSCloudMastheadComposite from './cloud-masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Redux state used for `<dds-cloud-masthead-container>`
 */
export interface CloudMastheadContainerState extends Omit<MastheadContainerState, 'profileAPI'> {
  /**
   * The Redux state for `CloudAccountAuthAPI`
   */
  cloudAccountAuthAPI?: CloudAccountAuthAPIState;
}

/**
 * The Redux actions used for `<dds-cloud-masthead-container>.
 */
export type CloudMastheadContainerActions =
  | ReturnType<typeof loadLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof loadTranslation>
  | ReturnType<typeof loadUserStatus>;

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-cloud-masthead-container>`.
 */
export function mapStateToProps(state: CloudMastheadContainerState): MastheadContainerStateProps {
  const { localeAPI, translateAPI, cloudAccountAuthAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { request } = cloudAccountAuthAPI ?? {};
  return pickBy(
    {
      authenticatedProfileItems: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedin.links,
      authenticatedCtaButtons: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedin.ctaButtons,
      contactUsButton: !language ? undefined : translations?.[language]?.masthead?.contact,
      navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
      unauthenticatedProfileItems: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedout.links,
      unauthenticatedCtaButtons: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedout.ctaButtons,
      userStatus: request?.user,
      language,
    },
    value => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-cloud-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions | CloudAccountAuthAPIActions>) {
  return bindActionCreators<CloudMastheadContainerActions, ActionCreatorsMapObject<CloudMastheadContainerActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
      _loadUserStatus: loadUserStatus,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}
/**
 * Container component for Cloud masthead.
 *
 * @element dds-cloud-masthead-container
 */
@customElement(`${ddsPrefix}-cloud-masthead-container`)
class DDSCloudMastheadContainer extends ConnectMixin<
  CloudMastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | CloudAccountAuthAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<CloudMastheadContainerActions>
>(
  store as Store<CloudMastheadContainerState, LocaleAPIActions | TranslateAPIActions | CloudAccountAuthAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSCloudMastheadComposite) {}

export default DDSCloudMastheadContainer;
