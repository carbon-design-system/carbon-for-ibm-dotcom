/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import ChevronLeft16 from '../../internal/vendor/@carbon/web-components/icons/chevron--left/16.js';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import { selectorTabbable } from '../../internal/vendor/@carbon/web-components/globals/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import styles from './masthead.scss';
import DDSLeftNav from './left-nav';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

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
   * The title url.
   */
  @property()
  titleUrl = '';

  private async _requestLeftNavMenuSectionUpdate() {
    const { eventToggle } = this.constructor as typeof DDSLeftNavMenuSection;
    return new Promise((resolve: Function): void => {
      this.dispatchEvent(
        new CustomEvent(eventToggle, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            active: this.expanded,
            resolveFn: resolve,
          },
        })
      );

      setTimeout(() => {
        resolve();
      }, 0);
    });
  }

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

  @HostListener('transitionend')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleTransitionEnd() {
    setTimeout(() => {
      if (this.expanded) {
        // Allow active section to scroll
        this.style.overflow = '';
      } else {
        // Hide previous section & restrict size
        this.style.visibility = 'hidden';
        this.style.height = '0';
        this.style.overflow = 'hidden';
      }
    }, 0);
  }

  firstUpdated() {
    if (this.sectionId === '-1, -1') {
      this.expanded = true;
      this.ariaHidden = 'false';
    } else {
      this.expanded = false;
      this.ariaHidden = 'true';
      // Hide all submenus, and restrict their height/overflow.
      this.style.visibility = 'hidden';
      this.style.height = '0';
      this.style.overflow = 'hidden';
    }
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('expanded')) {
      // Allow incoming menu section to show before transition.
      if (this.expanded) {
        this.style.visibility = '';
        this.style.height = '';
      }
    }
    return true;
  }

  async updated(changedProperties) {
    // make sure leftNavMenuSection updates before setting the tabIndex's per item
    await this._requestLeftNavMenuSectionUpdate();

    if (changedProperties.has('expanded')) {
      const { selectorNavMenu, selectorNavItem } = this
        .constructor as typeof DDSLeftNavMenuSection;
      const { expanded, isSubmenu } = this;

      if (expanded) {
        if (isSubmenu) {
          const backBtn = this.shadowRoot?.querySelector('button');
          if (backBtn) {
            backBtn.tabIndex = 0;
          }
        }
        forEach(this.querySelectorAll(selectorNavMenu), (elem) => {
          const item = (elem as HTMLElement).shadowRoot?.querySelector(
            'button'
          );
          if (item) {
            item.tabIndex = 0;
          }
        });
        forEach(this.querySelectorAll(selectorNavItem), (elem) => {
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
          tabbable = (this.getRootNode() as ShadowRoot).querySelector(
            DDSLeftNav.selectorNavItems
          );
        }

        if (tabbable) {
          document.addEventListener(
            'transitionend',
            () => {
              (tabbable as HTMLElement).focus();
            },
            { once: true }
          );
        }
      } else {
        forEach(this.querySelectorAll(selectorNavMenu), (elem) => {
          const item = (elem as HTMLElement).shadowRoot?.querySelector(
            'button'
          );
          if (item) {
            item.tabIndex = -1;
          }
        });
        forEach(this.querySelectorAll(selectorNavItem), (elem) => {
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

  connectedCallback() {
    super.connectedCallback();

    if (document.dir) {
      this.dir = document.dir;
    }
  }

  render() {
    const {
      backButtonText,
      _handleClickBack: handleClickBack,
      showBackBtn,
    } = this;
    return html`
      <ul>
        ${showBackBtn
          ? html`
              <li
                class="${prefix}--side-nav__menu-item ${prefix}--masthead__side-nav--submemu-back"
                role="none">
                <button
                  class="${prefix}--side-nav__link"
                  tabindex="-1"
                  @click="${handleClickBack}">
                  <span class="${prefix}--side-nav__link-text"
                    >${ChevronLeft16()}${backButtonText}</span
                  >
                </button>
              </li>
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
    return [
      selectorTabbable,
      `${ddsPrefix}-left-nav-item`,
      `${ddsPrefix}-left-nav-menu`,
      `${ddsPrefix}-left-nav-menu-item`,
    ].join(',');
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenuSection;
