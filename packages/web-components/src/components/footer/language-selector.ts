/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import Close20 from 'carbon-web-components/es/icons/close/20.js';
import ChevronDown20 from 'carbon-web-components/es/icons/chevron--down/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import { FOOTER_SIZE } from './footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Language selector
 *
 * @element dds-language-selector
 */
@customElement(`${ddsPrefix}-language-selector`)
class DDSLanguageSelector extends StableSelectorMixin(FocusMixin(LitElement)) {
  /**
   * Button label for accessibility.
   */
  @property()
  buttonLabel = 'Select geographic area';

  /**
   * Property to hide close button.
   */
  @property()
  clearHidden = false;

  @property()
  index = -1;

  /**
   * Value used in search input.
   */
  @property()
  inputValue = "English";

  @property()
  langList;

  @property()
  menuOpened = false;

  @property()
  lastLang = "English";

  _test?: () => {};

  /**
   * Size property to apply different styles.
   */
  @property()
  size = FOOTER_SIZE.REGULAR;

  /**
   * The shadow slot this language-selector should be in.
   */
  @property({ reflect: true })
  slot = 'locale-button';

  connectedCallback() {
    this.langList = JSON.parse(this.langList);
    super.connectedCallback();
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  /**
   * Handles `click` event on the reset button.
   */
  private _handleClearButton() {
    if(this.menuOpened) {
      this.menuOpened = !this.menuOpened;
    }
    this.inputValue = '';
    this.clearHidden = true;

    document.addEventListener('click', this._handleOutsideClick);
  }

  /**
   * Handles `input` event while searching for a language.
   * 
   * @param event current search term
   * 
   */
  private _handleSearch(e) {
    const { value } = e.target as HTMLInputElement;
    console.log(e)

    this.inputValue = value;
    this.menuOpened = true;
    this.clearHidden = false;

    document.addEventListener('click', this._handleOutsideClick);
  }

  /**
   * Handles `click` event when choosing from menu
   * 
   * @param e current dds-language-selector-item
   * 
   */
  private _handleLanguageSelection(e) {
    console.log(e)
    this.inputValue = e.target.innerText;
    this.lastLang = this.inputValue;
    this._updateLanguage();
  }

  private _handleOutsideClick = (e) => {

    if( !e || e.srcElement != this) {
      this.clearHidden = false;
      this.menuOpened = false;
      this._updateLanguage();
      document.removeEventListener('click', this._handleOutsideClick);
    }
  }

  private _updateLanguage() {
    const found = this.langList.find(lang => lang.text.toLowerCase().includes(this.inputValue.toLowerCase()));

    if(found?.text && this.inputValue) {
      this.inputValue = found.text;
      this.lastLang = found.text;
      // callback function here
      //this._test();
    } else {
      this.inputValue = this.lastLang;
    }    
  }

  private _handleArrowNavigation(e) {
    let langMenu = this.children;
    let mod = ((this.index % langMenu.length) + langMenu.length) % langMenu.length; // TODO CHANGE
    
    if(e.key == "Enter") {
      this.inputValue = langMenu[this.index].textContent!;
      this._handleOutsideClick(null);
    }

    if(e.key == 'ArrowUp') {
      e.preventDefault();

      langMenu[mod].setAttribute('hover', 'false');

      this.index--;
      if(this.index < 0) {
        this.index = langMenu.length - 1;
      }

      console.log(langMenu[this.index].textContent, this.index)
      langMenu[this.index].setAttribute('hover', 'true');
      langMenu[this.index].shadowRoot?.children[0].scrollIntoViewIfNeeded(false);

    } else if(e.key == "ArrowDown") {
      e.preventDefault();
      
      langMenu[mod].setAttribute('hover', 'false');
      this.index++;
      if(this.index == langMenu.length || this.index < 0) {
        this.index = 0;
      }

      langMenu[this.index].setAttribute('hover', 'true');

      console.log(langMenu[this.index].textContent, this.index);
      (langMenu[this.index].shadowRoot?.children[0] as Element).scrollIntoViewIfNeeded(false);
    }
  }

  private _updateIndexOnHover(e) {
    this.index = Array.from(this.children).indexOf(e.target)
  }

  render() {
    const { 
      clearHidden, 
      inputValue,
      menuOpened, 
      _handleClearButton: handleClearButton,
      _handleSearch: handleSearch,
      _handleLanguageSelection: handleLanguageSelection,
      _handleArrowNavigation: handleArrowNavigation,
      _updateIndexOnHover: updateIndexOnHover
    } = this;
    return html`
      <input class="bx--text-input"
        list="languages"
        type="text"
        placeholder="Choose a language"
        .value="${inputValue}"
        @input="${handleSearch}"
        @click="${handleSearch}"
        @keydown="${handleArrowNavigation}"
      >
      ${clearHidden || inputValue == ""
        ? `` : 
        html`
      <div class="bx--list-box__selection" @click="${handleClearButton}">
        ${Close20()}
      </div>` } 
      <div role="button"
        class="bx--list-box__menu-icon ${menuOpened ? 'bx--list-box__menu-icon__open' : ''}"
        aria-label="Clear Selection"
        title="Clear selected item"
      >
        ${ChevronDown20()}
      </div>

      ${menuOpened ? 
        html`
        <div class="bx--list-box__menu"> 
          <slot @click="${handleLanguageSelection}" @mouseover=${updateIndexOnHover}></slot>
        </div>`
    : ''}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--language-selector`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLanguageSelector;
