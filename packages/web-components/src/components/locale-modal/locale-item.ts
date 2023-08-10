/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import CDSLink from '../../internal/vendor/@carbon/web-components/components/link/link.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ipcinfoCookie from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/ipcinfoCookie/ipcinfoCookie';
import styles from './locale-modal.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Locale item.
 *
 * @element dds-locale-item
 */
@customElement(`${ddsPrefix}-locale-item`)
class DDSLocaleItem extends CDSLink {
  /**
   * The country.
   */
  @property({ reflect: true })
  country = '';

  /**
   * The language.
   */
  @property({ reflect: true })
  language = '';

  /**
   * The locale ID.
   */
  @property({ reflect: true })
  locale = '';

  /**
   * The region the country is in.
   */
  @property({ reflect: true })
  region = '';

  /**
   * Element's role for assistive technologies
   */
  @property({ reflect: true })
  role = 'listitem';

  /**
   * method to handle when country/region has been selected
   * sets the ipcInfo cookie with selected locale
   */
  _handleClick() {
    const { locale } = this;

    const localeSplit = locale.split('-');
    const localeObj = {
      cc: localeSplit[1],
      lc: localeSplit[0],
    };
    ipcinfoCookie.set(localeObj);
  }

  /**
   * @returns The inner content.
   */
  _renderInner() {
    const { country, language } = this;
    return html`
      <div class="${prefix}--locale-modal__locales__name">${country}</div>
      <div class="${prefix}--locale-modal__locales__name">${language}</div>
    `;
  }

  static styles = styles;
}

export default DDSLocaleItem;
