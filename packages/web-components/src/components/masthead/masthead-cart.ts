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
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import ShoppingCart20 from '@carbon/web-components/es/icons/shopping--cart/20.js';
import styles from './masthead.scss';

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
   * @todo flesh out the logic for reading the cookie
   */
  @property({ attribute: 'has-active-cart', reflect: true, type: Boolean })
  hasActiveCart = true;

  connectedCallback() {
    super.connectedCallback();
    // @todo flesh out the logic for reading the cookie
  }

  render() {
    const { linkLabel, hasActiveCart } = this;

    // @todo vary link by locale
    return hasActiveCart
      ? html`
          <a
            part="cart-link"
            href="/store/en/US/checkout"
            class="${prefix}--header__menu-item ${prefix}--header__menu-title"
            aria-label="${linkLabel}"
            >${ShoppingCart20()}</a
          >
        `
      : undefined;
  }

  static get stableSelector() {
    return `${c4dPrefix}--masthead-cart`;
  }

  static styles = styles;
}
