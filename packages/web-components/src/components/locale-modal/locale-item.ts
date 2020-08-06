/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSLink from '../link/link';
import styles from './locale-modal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Locale item.
 *
 * @element dds-locale-item
 */
@customElement(`${ddsPrefix}-locale-item`)
class DDSLocaleItem extends DDSLink {
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
   * @returns The inner content.
   */
  _renderInner() {
    const { country, language } = this;
    return html`
      <div class="${prefix}--locale-modal__locales__name">
        ${country}
      </div>
      <div class="${prefix}--locale-modal__locales__name">
        ${language}
      </div>
    `;
  }

  static styles = styles;
}

export default DDSLocaleItem;
