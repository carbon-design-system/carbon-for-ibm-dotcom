/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ChevronLeft20 from 'carbon-web-components/es/icons/chevron--left/20.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import { selectorTabbable } from 'carbon-web-components/es/globals/settings.js';
import { forEach, find } from '../../globals/internal/collection-helpers';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead left nav menu section.
 *
 * @element dds-left-nav-menu-section
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
  @property({ type: String, attribute: 'aria-hidden', reflect: true })
  ariaHidden = 'true';

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
      this.ariaHidden = 'false';
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
      this.ariaHidden = 'true';
    }
  };

  firstUpdated() {
    if (this.sectionId === '-1, -1') {
      this.expanded = true;
      this.ariaHidden = 'false';
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      const { selectorNavMenu, selectorNavItem } = this.constructor as typeof DDSLeftNavMenuSection;
      const { selectorTabbable: selectorTabbableForLeftNavMenuSection } = this.constructor as typeof DDSLeftNavMenuSection;
      const { expanded, isSubmenu } = this;

      if (expanded) {
        if (isSubmenu) {
          const backBtn = this.shadowRoot?.querySelector('button');
          if (backBtn) {
            backBtn.tabIndex = 0;
          }
        }
        forEach(this.querySelectorAll(selectorNavMenu), elem => {
          const item = (elem as HTMLElement).shadowRoot?.querySelector('button');
          if (item) {
            item.tabIndex = 0;
          }
        });
        forEach(this.querySelectorAll(selectorNavItem), elem => {
          const item = (elem as HTMLElement).shadowRoot?.querySelector('a');
          if (item) {
            item.tabIndex = 0;
          }
        });

        // set focus to first element of menu panel to allow for tabbing through the menu
        let tabbable;
        if (isSubmenu) {
          // set focus to back button
          tabbable = this.shadowRoot?.querySelector('button');
        } else {
          // set focus to first menu item of section
          tabbable = find(this.querySelectorAll(selectorTabbableForLeftNavMenuSection), elem =>
            Boolean((elem as HTMLElement).offsetParent)
          );
        }

        if (tabbable) {
          document.addEventListener('transitionend', () => {
            (tabbable as HTMLElement).focus();
          });
        }
      } else {
        forEach(this.querySelectorAll(selectorNavMenu), elem => {
          const item = (elem as HTMLElement).shadowRoot?.querySelector('button');
          if (item) {
            item.tabIndex = -1;
          }
        });
        forEach(this.querySelectorAll(selectorNavItem), elem => {
          const item = (elem as HTMLElement).shadowRoot?.querySelector('a');
          if (item) {
            item.tabIndex = -1;
          }
        });
        if (isSubmenu) {
          const backBtn = this.shadowRoot?.querySelector('button');
          if (backBtn) {
            backBtn.tabIndex = -1;
          }
        }
      }
    }
  }

  render() {
    const { backButtonText, title, _handleClickBack: handleClickBack, showBackBtn } = this;
    return html`
      <ul>
        ${showBackBtn
          ? html`
              <li class="${prefix}--side-nav__menu-item ${prefix}--masthead__side-nav--submemu-back" role="none">
                <button class="${prefix}--side-nav__link" tabindex="-1" role="menuitem" @click="${handleClickBack}">
                  <span class="${prefix}--side-nav__link-text">${ChevronLeft20()}${backButtonText}</span>
                </button>
              </li>
            `
          : undefined}
        ${title
          ? html`
              <li class="${prefix}--masthead__side-nav--submemu-title">${title}</li>
            `
          : undefined}
        <slot></slot>
      </ul>
    `;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-left-nav-menu-toggled`;
  }

  /**
   * A selector that will return the nav menus.
   */
  static get selectorNavMenu() {
    return `${ddsPrefix}-left-nav-menu`;
  }

  /**
   * A selector that will return the menu items.
   */
  static get selectorNavItem() {
    return `${ddsPrefix}-left-nav-menu-item`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return [selectorTabbable, `${ddsPrefix}-left-nav-item`, `${ddsPrefix}-left-nav-menu`, `${ddsPrefix}-left-nav-menu-item`].join(
      ','
    );
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenuSection;
