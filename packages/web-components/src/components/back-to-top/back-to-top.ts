/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import UpToTop20 from 'carbon-web-components/es/icons/up-to-top/20.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
// import './back-to-top-button';
import styles from './back-to-top.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Back to top
 *
 * @element dds-back-to-top
 */
@customElement(`${ddsPrefix}-back-to-top`)
class DDSBackToTop extends StableSelectorMixin(LitElement) {
  /**
   * The document height
   */
  private _bodyHeight: any | null = null;

  /**
   * The viewport height
   */
  private _windowHeight: any | null = null;

  /**
   * Button click scrolls to top
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleOnClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Button visible when one full page length is scrolled if _showBackToTop is true
   */
  private _handleOnScroll() {
    if (this._showBackToTop()) {
      if (document.body.scrollTop > this._windowHeight || document.documentElement.scrollTop > this._windowHeight) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    }
  }

  /**
   * Show button only when document height is 3x greater than viewport
   */
  private _showBackToTop() {
    return this._bodyHeight * 3 > this._windowHeight;
  }

  firstUpdated() {
    const doc = this.getRootNode() as Document;
    this._bodyHeight = doc.documentElement.scrollHeight;
    this._windowHeight = doc.documentElement.clientHeight;
    window.onscroll = this._handleOnScroll.bind(this);
  }

  /**
   * `false` if the button should be visible
   */
  @property({ type: Boolean, reflect: true })
  hidden = true;

  render() {
    const { _handleOnClick: handleOnClick } = this;
    return html`
      <button
        class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--back-to-top__btn"
        @click="${handleOnClick}"
      >
        ${UpToTop20()}
      </button>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--back-to-top`;
  }

  static styles = styles;
}

export default DDSBackToTop;
