/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import pickBy from 'lodash-es/pickBy.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import cloudLoginStatusCookie from '@carbon/ibmdotcom-utilities/es/utilities/cloudLoginStatusCookie/cloudLoginStatusCookie';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import store from '../../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { TranslateAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { SearchAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
import ConnectMixin from '../../../globals/mixins/connect';
import { loadTranslation } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { loadLanguage, setLanguage } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { loadSearchResults } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI';
import { MastheadContainerState, MastheadContainerStateProps, MastheadContainerActions } from '../masthead-container';
import DDSCloudMastheadComposite from './cloud-masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
export function mapStateToProps(state: MastheadContainerState): MastheadContainerStateProps {
  const { localeAPI, translateAPI, searchAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  const { currentSearchQueryString, searchResults } = searchAPI ?? {};
  let currentSearchResults;
  for (let { length = 0 } = currentSearchQueryString ?? {}; !currentSearchResults && length > 0; --length) {
    currentSearchResults = searchResults?.[currentSearchQueryString!.substr(0, length)]?.[language!];
  }
  return pickBy(
    {
      authenticatedProfileItems: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedin.links,
      authenticatedCtaButtons: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedin.ctaButtons,
      contactUsButton: !language ? undefined : translations?.[language]?.masthead?.contact,
      navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
      unauthenticatedProfileItems: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedout.links,
      unauthenticatedCtaButtons: !language ? undefined : translations?.[language]?.masthead?.profileMenu.signedout.ctaButtons,
      userStatus: cloudLoginStatusCookie.get(),
      currentSearchResults: currentSearchResults ?? [],
    },
    value => value !== undefined
  );
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-cloud-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<LocaleAPIActions | TranslateAPIActions>) {
  return bindActionCreators<MastheadContainerActions, ActionCreatorsMapObject<MastheadContainerActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
      _loadSearchResults: loadSearchResults,
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
  MastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | SearchAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadContainerActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSCloudMastheadComposite) {}

export default DDSCloudMastheadContainer;
