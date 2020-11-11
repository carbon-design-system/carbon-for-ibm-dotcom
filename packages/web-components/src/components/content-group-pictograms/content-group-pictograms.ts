/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentGroup from '../content-group/content-group';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content group with pictograms
 *
 * @element dds-content-group-simple
 * @slot media - The media content.
 */

@customElement(`${ddsPrefix}-content-group-pictograms`)
class DDSContentGroupPictograms extends StableSelectorMixin(DDSContentGroup) {
  // eslint-disable-next-line class-methods-use-this
  protected _renderContent() {
    return html`
      <div class="${prefix}--content-group__children ${prefix}--content-group__col"></div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-group-pictograms`;
  }
}

export default DDSContentGroupPictograms;
