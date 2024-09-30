/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import C4DFooterNavItem from './footer-nav-item';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Legal nav item.
 *
 * @element c4d-legal-nav-item
 */
@customElement(`${c4dPrefix}-legal-nav-item`)
class C4DLegalNavItem extends C4DFooterNavItem {
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
      linkNode.setAttribute(
        'data-autoid',
        `${c4dPrefix}--footer-legal-nav__link-${dataTitle}`
      );
    }
  }
}

export default C4DLegalNavItem;
