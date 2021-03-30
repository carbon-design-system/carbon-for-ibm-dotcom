/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import store from '../../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { TranslateAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { SearchAPIActions } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
import ConnectMixin from '../../../globals/mixins/connect';
import { loadTranslation } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI';
import { loadLanguage, setLanguage } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI';
import { loadSearchResults } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI';
import {
  MastheadContainerState,
  MastheadContainerStateProps,
  MastheadContainerActions,
  mapStateToProps,
} from '../masthead-container';
import DDSCloudMastheadComposite from './cloud-masthead-composite';
import { DDS_CLOUD_MASTHEAD } from '../../../globals/internal/feature-flags';

const { stablePrefix: ddsPrefix } = ddsSettings;
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
 * EXPERIMENTAL: Container component for Cloud masthead.
 *
 * @element dds-cloud-masthead-container
 */
class DDSCloudMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | SearchAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadContainerActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore: Behind feature flag
)(DDSCloudMastheadComposite) {}

if (DDS_CLOUD_MASTHEAD) {
  customElements.define(`${ddsPrefix}-cloud-masthead-container`, DDSCloudMastheadContainer);
}

export default !DDS_CLOUD_MASTHEAD ? undefined : DDSCloudMastheadContainer;
