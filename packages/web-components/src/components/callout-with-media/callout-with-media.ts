/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSContentBlockSimple from '../content-block-simple/content-block-simple';
import '../callout/callout';
import styles from './callout-with-media.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with Media.
 *
 * @element dds-callout-with-media
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSContentBlockSimple {
  render() {
    return html`
      <dds-callout>${super.render()}</dds-callout>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--callout-with-media`;
  }

  static styles = styles;
}

export default DDSCalloutWithMedia;
