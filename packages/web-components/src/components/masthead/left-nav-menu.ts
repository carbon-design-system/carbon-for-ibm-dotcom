/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ChevronDown16 from '../../internal/vendor/@carbon/web-components/icons/chevron--down/16.js';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Masthead left nav submenu.
 *
 * @element c4d-left-nav-menu
 * @fires c4d-left-nav-menu-beingtoggled
 *   The custom event fired before this side nav menu is being toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of toggling this side nav menu.
 * @fires c4d-left-nav-menu-toggled The custom event fired after this side nav menu is toggled upon a user gesture.
 * @csspart side-nav-item-button - The button for the side navigation item. Usage: `c4d-left-nav-menu::part(side-nav-item-button)`
 * @csspart side-nav-submenu-content - The content of the side navigation submenu. Usage: `c4d-left-nav-menu::part(side-nav-submenu-content)`
 * @csspart side-nav-submenu-title - The title of the side navigation submenu. Usage: `c4d-left-nav-menu::part(side-nav-submenu-title)`
 * @csspart side-nav-icon - The icon of the side navigation submenu. Usage: `c4d-left-nav-menu::part(side-nav-icon)`
 */
@customElement(`${c4dPrefix}-left-nav-menu`)
class C4DLeftNavMenu extends FocusMixin(LitElement) {
  /**
   * Handles user-initiated toggle request of this side nav menu.
   *
   * @param expanded The new expanded state.
   */
  private _handleUserInitiatedToggle(
    expanded = !this.expanded,
    panelId = this.panelId
  ) {
    const { eventBeforeToggle, eventToggle } = this
      .constructor as typeof C4DLeftNavMenu;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        expanded,
        panelId,
      },
    };
    if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
      this.expanded = expanded;
      this.dispatchEvent(new CustomEvent(eventToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * `true` if the menu should be in its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * `true` if the menu should be open.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * `true` if the menu should be open.
   */
  @property({ type: String, attribute: 'panel-id' })
  panelId = '';

  /**
   * The title text.
   */
  @property()
  title = '';

  connectedCallback() {
    super.connectedCallback();

    if (document.dir) {
      this.dir = document.dir;
    }
  }

  render() {
    const {
      active,
      expanded,
      title,
      _handleClickExpando: handleClickExpando,
    } = this;
    const buttonClasses = classMap({
      [`${prefix}--side-nav__submenu`]: true,
      [`${prefix}--masthead__side-nav--submemu--selected`]: active,
    });

    const isSubitem = this.parentElement?.hasAttribute('is-submenu') || false;

    return html`
      <div class="${prefix}--side-nav__item">
        <button
          part="side-nav-item-button"
          type="button"
          aria-haspopup="true"
          aria-expanded="${expanded}"
          class="${buttonClasses}"
          @click=${handleClickExpando}
          data-attribute1="headerNav"
          data-attribute2="${isSubitem ? 'TabHdline' : 'L0'}"
          data-attribute3="${title}">
          <div
            part="side-nav-submenu-content"
            class="${prefix}--side-nav__submenu-content">
            <span
              part="side-nav-submenu-title"
              class="${prefix}--side-nav__submenu-title"
              >${title}</span
            >
            <div
              part="side-nav-icon"
              class="${prefix}--side-nav__icon ${prefix}--side-nav__icon--small ${prefix}--side-nav__submenu-chevron">
              ${ChevronDown16()}
            </div>
          </div>
        </button>
      </div>
    `;
  }

  /**
   * The name of the custom event fired before this side nav menu is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this side nav menu.
   */
  static get eventBeforeToggle() {
    return `${c4dPrefix}-left-nav-menu-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${c4dPrefix}-left-nav-menu-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DLeftNavMenu;
