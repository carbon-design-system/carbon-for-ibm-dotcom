/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-quote.scss';
import C4DCalloutMixin from '../../component-mixins/callout/callout';
import C4DQuote from '../quote/quote';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Callout Data.
 *
 * @element c4d-callout-data
 */
@customElement(`${ddsPrefix}-callout-quote`)
class C4DCalloutQuote extends C4DCalloutMixin(C4DQuote) {
  static get stableSelector() {
    return `${ddsPrefix}--callout-quote`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCalloutQuote;
