/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import BXLink from '../../internal/vendor/@carbon/web-components/components/link/link.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './locale-modal.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Locale item.
 *
 * @element dds-locale-item
 */
@customElement(`${ddsPrefix}-locale-item`)
class DDSLocaleItem extends BXLink {
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
