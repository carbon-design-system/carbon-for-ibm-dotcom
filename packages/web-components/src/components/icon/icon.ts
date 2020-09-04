/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement, LitElement } from 'lit-element';
import IBM8BarLogoH23 from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The IBM Logo
 *
 * @element dds-masthead-logo
 */
@customElement(`${ddsPrefix}-icon`)
class DDSIcon extends FocusMixin(LitElement) {
  /**
   * Link `href`.
   */
  @property()
  href = 'https://www.ibm.com/';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { href } = this;
    return html`
      <a aria-label="IBM logo" href="${ifDefined(href)}">${IBM8BarLogoH23()}</a>
    `;
  }
}

export default DDSIcon;
