/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import ConnectMixin from '../../globals/mixins/connect';
import {
  mapStateToProps,
  mapDispatchToProps,
  LeavingIbmContainerState,
  LeavingIbmContainerStateProps,
  LeavingIbmContainerActions,
} from './leaving-ibm-connect';
import DDSLeavingIbmComposite from './leaving-ibm-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for masthead search.
 *
 * @element dds-leaving-ibm-container
 */
@customElement(`${ddsPrefix}-leaving-ibm-container`)
class DDSLeavingIbmContainer extends ConnectMixin<
  LeavingIbmContainerState,
  LocaleAPIActions | TranslateAPIActions,
  LeavingIbmContainerStateProps,
  ActionCreatorsMapObject<LeavingIbmContainerActions>
>(
  store as Store<LeavingIbmContainerState, LocaleAPIActions | TranslateAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSLeavingIbmComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLeavingIbmContainer;
