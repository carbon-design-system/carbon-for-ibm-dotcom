/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ChevronLeft20 from 'carbon-web-components/es/icons/chevron--left/20.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import { forEach } from '../../globals/internal/collection-helpers';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead left nav submenu section.
 *
 * @element dds-left-nav-menu
 * @fires dds-left-nav-menu-beingtoggled
 *   The custom event fired before this side nav menu is being toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of toggling this side nav menu.
 * @fires dds-left-nav-menu-toggled The custom event fired after this side nav menu is toggled upon a user gesture.
 */
@customElement(`${ddsPrefix}-left-nav-menu-section`)
class DDSLeftNavMenuSection extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * Set aria-hidden property.
   */
  @property({ type: Boolean, attribute: 'aria-hidden', reflect: true })
  ariaHidden = true;

  /**
   * The back button's text.
   */
  @property({ attribute: 'back-button-text' })
  backButtonText = 'Back';

  /**
   * `true` if the menu should be visible.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * id of the menu section.
   */
  @property({ type: String, attribute: 'section-id' })
  sectionId = '';

  /**
   * in transition mode.
   */
  @property({ type: Boolean, reflect: true })
  transition = false;

  /**
   * is a submenu menu section.
   */
  @property({ type: Boolean, attribute: 'is-submenu' })
  isSubmenu = false;

  /**
   * Render back button.
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-back-button' })
  showBackBtn = false;

  /**
   * The title text.
   */
  @property()
  title = '';

  /**
   * Handler for the `click` event on the back button.
   */
  private _handleClickBack() {
    const { eventToggle } = this.constructor as typeof DDSLeftNavMenuSection;
    const id = this.sectionId.split(', ');
    let panelId = '';
    /**
     * if second part of id string is '-1' that means user is on level 1 menu panel,
     * set first part of string to -1 to bring back to level 0 menu panel.
     */
    if (id[1] === '-1') {
      panelId = '-1, -1';
    } else {
      panelId = `${id[0]}, -1`;
    }
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        panelId,
      },
    };
    this.dispatchEvent(new CustomEvent(eventToggle, init));
  }

  @HostListener('parentRoot:eventToggle')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { panelId } = event.detail;
    const { sectionId } = this;
    if (sectionId === panelId) {
      this.expanded = true;
      this.ariaHidden = false;
      this.transition = false;
    } else {
      const id = panelId.split(', ');
      const section = sectionId.split(', ');

      /**
       * if next menu section expanded is a level 2 menu section and current expanded
       * menu section is a level 1 menu section, add transition attribute for proper animation
       */
      if (id[0] !== '-1' && id[1] !== '-1' && this.expanded === true && section[1] === '-1') {
        this.transition = true;
      }

      this.expanded = false;
      this.ariaHidden = true;
    }
  };

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      const { selectorItem } = this.constructor as typeof DDSLeftNavMenuSection;
      const { expanded } = this;
      forEach(this.querySelectorAll(selectorItem), elem => {
        (elem as HTMLElement).tabIndex = expanded ? 0 : -1;
      });
    }
  }

  firstUpdated() {
    if (this.sectionId === '-1, -1') {
      this.expanded = true;
      this.ariaHidden = false;
    }
  }

  render() {
    const { backButtonText, title, _handleClickBack: handleClickBack, showBackBtn } = this;
    return html`
      <ul>
        ${showBackBtn
          ? html`
              <li class="bx--side-nav__menu-item bx--masthead__side-nav--submemu-back" role="none">
                <button class="bx--side-nav__link" role="menuitem" @click="${handleClickBack}">
                  <span class="bx--side-nav__link-text">${ChevronLeft20()}${backButtonText}</span>
                </button>
              </li>
            `
          : undefined}
        ${title
          ? html`
              <li class="bx--masthead__side-nav--submemu-title">${title}</li>
            `
          : undefined}
        <slot></slot>
      </ul>
    `;
  }

  /**
   * A selector that will return the menu items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-left-nav-menu-item`;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-left-nav-menu-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenuSection;
