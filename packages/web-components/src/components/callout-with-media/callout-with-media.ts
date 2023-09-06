/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-with-media.scss';
import C4DCalloutMixin from '../../component-mixins/callout/callout';
import C4DContentBlock from '../content-block/content-block';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Callout Data.
 *
 * @element c4d-callout-data
 */
@customElement(`${c4dPrefix}-callout-with-media`)
class C4DCalloutWithMedia extends C4DCalloutMixin(
  StableSelectorMixin(C4DContentBlock)
) {
  static get stableSelector() {
    return `${c4dPrefix}--callout-with-media`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCalloutWithMedia;
