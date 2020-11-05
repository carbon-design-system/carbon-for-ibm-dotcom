/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-with-media.scss';
import DDSCalloutMixin from '../../component-mixins/callout/callout';
import DDSContentBlockSimple from '../content-block-simple/content-block-simple';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSCalloutMixin(DDSContentBlockSimple) {
  static styles = styles;
}

export default DDSCalloutWithMedia;
