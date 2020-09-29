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
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import DDSLeadSpaceBody from './leadspace-body';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Leadspace type
 */
export enum LEADSPACE_TYPE {
  /**
   * Left-aligned - small style of the leadspace title (default)
   */
  SMALL = 'small',

  /**
   * Left-aligned - large style of the leadspace title
   */
  LEFT = 'left',

  /**
   * Centered type of the LeadSpace
   */
  CENTERED = 'centered',
}

/**
 * Leadspace theme
 */
export enum LEADSPACE_THEME {
  /**
   * Carbon White theme (default)
   */
  WHITE = 'white',

  /**
   *  Carbon Gray 100 theme
   */
  G100 = 'g100',
}

/**
 * The LeadSpace component.
 *
 * @element dds-leadspace
 */
@customElement(`${ddsPrefix}-leadspace`)
class DDSLeadSpace extends DDSLeadSpaceBody {
  @property({ attribute: 'type', reflect: true })
  type = LEADSPACE_TYPE.LEFT;

  @property({ attribute: 'theme', reflect: true })
  theme = LEADSPACE_THEME;

  /**
   * `true` to hide the divider.
   */
  @property({ type: Boolean, reflect: true, attribute: 'gradient' })
  gradient = true;

  /**
   * `true` if there is copy content.
   */
  protected _hasCopy;

  _renderCopy() {
    const { copy } = this;
    return html`
      <div class="${prefix}--leadspace__row">
        <p data-autoid="${ddsPrefix}--leadspace__desc" class="${prefix}--leadspace__desc">
          <slot name="copy">${copy}</slot>
        </p>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    const { alt, defaultSrc } = this;
    return html`
      <img class="${prefix}--image__img" alt="${ifNonNull(alt)}" src="${ifNonNull(defaultSrc)}"></img>
    `;
  }

  _renderTitle() {
    const { title } = this;
    return html`
      <slot name="title">${title}</slot>
    `;
  }

  /**
   * The alternate text.
   */
  @property()
  alt = '';

  /**
   * The image source.
   */
  @property({ attribute: 'default-src' })
  defaultSrc = '';

  /**
   * The leadspace copy.
   */
  @property({ attribute: 'copy' })
  copy = '';

  /**
   * The leadspace title.
   */
  @property({ attribute: 'title' })
  title = '';

  static get stableSelector() {
    return `${ddsPrefix}--leadspace`;
  }
}

export default DDSLeadSpace;
