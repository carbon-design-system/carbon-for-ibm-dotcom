/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-quote.scss';
import DDSCalloutMixin from '../../component-mixins/callout/callout';
import DDSQuote from '../quote/quote';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-quote`)
class DDSCalloutQuote extends DDSCalloutMixin(DDSQuote) {
  static get stableSelector() {
    return `${ddsPrefix}--callout-quote`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCalloutQuote;
