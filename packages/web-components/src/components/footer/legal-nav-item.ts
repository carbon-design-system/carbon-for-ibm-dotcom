/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSFooterNavItem from './footer-nav-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Legal nav item.
 *
 * @element dds-legal-nav-item
 */
@customElement(`${ddsPrefix}-legal-nav-item`)
class DDSLegalNavItem extends DDSFooterNavItem {
  /**
   * autoid text.
   */
  @property()
  autoid = '';

  updated() {
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      const dataTitle = this.autoid
        ?.replace(/[^-a-zA-Z0-9_ ]/g, '')
        .replace(/ +/g, '-')
        .toLowerCase();
      linkNode.classList.add(`${prefix}--footer__link`);
      linkNode.setAttribute('data-autoid', `${ddsPrefix}--footer-legal-nav__link-${dataTitle}`);
    }
  }
}

export default DDSLegalNavItem;
