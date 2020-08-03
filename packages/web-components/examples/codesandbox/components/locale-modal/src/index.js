/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ConnectMixin from '@carbon/ibmdotcom-web-components/es/globals/mixins/connect';
import '@carbon/ibmdotcom-web-components/es/components/button/button';
import DDSLocaleModalComposite from '@carbon/ibmdotcom-web-components/es/components/locale-modal/locale-modal-composite';
import {
  reducers,
  store,
  mapStateToProps,
  mapDispatchToProps,
} from '@carbon/ibmdotcom-web-components/es/components/locale-modal/locale-modal-container';

store.replaceReducer(reducers);

// Wires `<dds-locale-modal-composite>` to `@carbon/ibmdotcom-servies` and creates `<app-locale-modal-container>`
customElements.define(
  'app-locale-modal-container',
  class extends ConnectMixin(store, mapStateToProps, mapDispatchToProps)(DDSLocaleModalComposite) {}
);
