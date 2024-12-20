/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ShoppingCart20 from '@carbon/web-components/es/icons/shopping--cart/20.js';
import styles from './masthead.scss?lit';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import SAPCommerceAPI from '@carbon/ibmdotcom-services/es/services/SAPCommerce/SAPCommerce.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The Cart icon in the masthead.
 *
 * @element c4d-masthead-cart
 * @csspart cart-link - The masthead cart link. Usage: `c4d-masthead-cart::part(cart-link)`
 */
@customElement(`${c4dPrefix}-masthead-cart`)
class C4DMastheadCart extends StableSelectorMixin(LitElement) {
  /**
   * The `aria-label` attribute for the link.
   */
  @property({ attribute: 'link-label' })
  linkLabel = 'Cart';

  /**
   * Tracks whether the user has an active cart to control the display.
   */
  @state()
  hasActiveCart = false;

  /**
   * Store the locale. Defaults to en-us.
   */
  @state()
  locale = { lc: 'en', cc: 'us' };

  connectedCallback() {
    super.connectedCallback();
    // Check the relevant cookie for whether the user has an active cart.
    this.hasActiveCart = SAPCommerceAPI.hasActiveCart();
    // Fetch the locale for the page.
    LocaleAPI.getLocale().then((locale) => {
      this.locale = locale;
    });
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { hasActiveCart } = this;
    if (changedProperties.has('hasActiveCart')) {
      this.hidden = !hasActiveCart;
    }
  }

  render() {
    const {
      linkLabel,
      locale: { cc, lc },
    } = this;

    return html`
      <a
        part="cart-link"
        href="/store/${lc}/${cc}/checkout"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        aria-label="${linkLabel}"
        >${ShoppingCart20()}</a
      >
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--masthead-cart`;
  }

  static styles = styles;
}

export default C4DMastheadCart;
