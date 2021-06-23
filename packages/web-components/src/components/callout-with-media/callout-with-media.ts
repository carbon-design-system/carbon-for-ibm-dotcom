/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-with-media.scss';
import DDSCalloutMixin from '../../component-mixins/callout/callout';
import DDSContentBlock from '../content-block/content-block';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSCalloutMixin(StableSelectorMixin(DDSContentBlock)) {
  static get stableSelector() {
    return `${ddsPrefix}--callout-with-media`;
  }

  static styles = styles;
}

export default DDSCalloutWithMedia;
