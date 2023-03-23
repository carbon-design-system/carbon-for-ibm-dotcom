/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-with-media.scss';
import DDSCalloutMixin from '../../component-mixins/callout/callout';
import DDSContentBlock from '../content-block/content-block';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSCalloutMixin(
  StableSelectorMixin(DDSContentBlock)
) {
  static get stableSelector() {
    return `${ddsPrefix}--callout-with-media`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCalloutWithMedia;
