/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import store from '@carbon/ibmdotcom-services-store/es/store.js';
import { LocaleAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/localeAPI';
import { TranslateAPIActions } from '@carbon/ibmdotcom-services-store/es/actions/translateAPI';
import ConnectMixin from '../../globals/mixins/connect';
import {
  mapStateToProps,
  mapDispatchToProps,
  LeavingIbmContainerState,
  LeavingIbmContainerStateProps,
  LeavingIbmContainerActions,
} from './leaving-ibm-connect';
import C4DLeavingIbmComposite from './leaving-ibm-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Container component for masthead search.
 *
 * @element c4d-leaving-ibm-container
 */
@customElement(`${c4dPrefix}-leaving-ibm-container`)
class C4DLeavingIbmContainer extends ConnectMixin<
  LeavingIbmContainerState,
  LocaleAPIActions | TranslateAPIActions,
  LeavingIbmContainerStateProps,
  ActionCreatorsMapObject<LeavingIbmContainerActions>
>(
  store as Store<
    LeavingIbmContainerState,
    LocaleAPIActions | TranslateAPIActions
  >,
  mapStateToProps,
  mapDispatchToProps
)(C4DLeavingIbmComposite) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeavingIbmContainer;
