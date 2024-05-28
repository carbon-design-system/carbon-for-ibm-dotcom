/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit/directives/class-map.js';
import Checkmark16 from '@carbon/icons/lib/checkmark/16';
import { consume, provide } from '@lit/context';
import { MenuContext } from './menu-context';

/**
 * Menu Item.
 *
 * @element cds-menu-item
 */
@customElement(`${prefix}-menu-item`)
class CDSmenuItem extends LitElement {
  @provide({ context: MenuContext })
  @consume({ context: MenuContext })
  context;
  // @provide({ context: MenuContext })
  // @consume({ context: MenuContext, subscribe: true })
  // contextChild;

  readonly hoverIntentDelay = 150; // in ms
  hoverIntentTimeout;
  /**
   * Label for the menu item.
   */
  @property({ type: String })
  label;
  /**
   * Children - Sub menu items.
   */
  @property({ type: Array })
  childElements: Element[] | undefined;
  /**
   * Child context.
   */
  @property()
  childContext;
  /**
   * Shortcut for the menu item.
   */
  @property({ type: String })
  shortcut;
  /**
   * ICON type to be rendered for the menu item.
   */
  @property({ type: String })
  renderIcon;
  /**
   * Disabled property for the menu item.
   */
  @property({ type: Boolean })
  disabled;
  /**
   * Whether the menu item is disabled or not.
   */
  @property({ type: Boolean })
  isDisabled;
  /**
   * Whether the menu submen for an item is open or not.
   */
  @property({ type: Boolean })
  submenuOpen = false;
  /**
   * Whether the menu submen for an item is open or not.
   */
  @property({ type: Array })
  submenuList: HTMLLIElement[] = [];
  /**
   * Document direction.
   */
  @property({ type: String })
  direction = 'ltr';
  /**
   * Checks if document direction is rtl.
   */
  @property({ type: Boolean })
  isRtl = false;
  /**
   * Checks if document direction is rtl.
   */
  @property()
  kind: 'default' | 'danger' = 'default';
  /**
   * check if the menu item has children or not.
   */
  @property({ type: String })
  hasChildren;
  /**
   * check if the menu item kind is Danger.
   */
  @property({ type: Boolean })
  isDanger;

  /**
   * Menu boundaries.
   */
  @property()
  boundaries: {
    x: number | [number, number];
    y: number | [number, number];
  } = { x: -1, y: -1 };
  firstUpdated() {
    this.hasChildren = this.childNodes.length > 0;
    this.isDisabled = this.disabled && !this.hasChildren;
    this.direction = document.dir;
    this.isRtl = this.direction === 'rtl';
    this.isDanger = this.kind === 'danger';
    setTimeout(() => {
      this.childElements = Object.values(this.children);
    }, 100);
    this._registerSubMenuItems();
  }
  render() {
    const {
      label,
      shortcut,
      renderIcon,
      _iconRender: iconRender,
      isDisabled,
      hasChildren,
      submenuOpen,
      _handleClick: handleClick,
      _handleMouseEnter: handleMouseEnter,
      _handleMouseLeave: handleMouseLeave,
      _handleKeyDown: handleKeyDown,
      _closeSubmenu: closeSubmenu,
      isDanger,
      boundaries,
      childElements,
    } = this;
    const menuItemClasses = classMap({
      [`${prefix}--menu-item`]: true,
      [`${prefix}--menu-item--disabled`]: isDisabled,
      [`${prefix}--menu-item--danger`]: isDanger,
    });
    return html`
      <li
        role="menuitem"
        tabindex="0"
        class="${menuItemClasses}"
        aria-disabled="${isDisabled ?? undefined}"
        aria-haspopup="${hasChildren ?? undefined}"
        aria-expanded="${hasChildren ? submenuOpen : undefined}"
        @click="${handleClick}"
        @mouseenter="${hasChildren ? handleMouseEnter : undefined}"
        @mouseleave="${hasChildren ? handleMouseLeave : undefined}"
        @keydown="${handleKeyDown}">
        <div class="${prefix}--menu-item__icon">
          ${renderIcon ? iconRender() : undefined}
        </div>
        <div class="${prefix}--menu-item__label">${label}</div>
        <div class="${prefix}--menu-item__shortcut">${shortcut}</div>
        ${hasChildren
          ? html`
              <cds-menu
                .isChild="${hasChildren}"
                label="${label}"
                .open="${submenuOpen}"
                .onClose="${closeSubmenu}"
                .x="${boundaries.x}"
                .y="${boundaries.y}">
                ${childElements}
              </cds-menu>
            `
          : html``}
      </li>
    `;
  }

  _iconRender = () => {
    if (this.renderIcon) {
      let iconRendered;
      switch (this.renderIcon) {
        case 'checkMark':
          iconRendered = Checkmark16();
          break;
      }
      return iconRendered;
    }
  };
  _handleClick = (e: MouseEvent | KeyboardEvent): void => {
    if (!this.isDisabled) {
      if (this.hasChildren) {
        this._openSubmenu();
      } else {
        if (this.onclick) {
          this.onclick(e);
        }
      }
    }
  };
  _handleMouseEnter = () => {
    this.hoverIntentTimeout = setTimeout(() => {
      this._openSubmenu();
    }, this.hoverIntentDelay);
  };
  _handleMouseLeave = () => {
    if (this.hoverIntentTimeout) {
      clearTimeout(this.hoverIntentTimeout);
      this._closeSubmenu();
      this.focus();
    }
  };
  _openSubmenu = () => {
    const { x, y, width, height } = this.getBoundingClientRect();
    if (this.isRtl) {
      this.boundaries = {
        x: [-x, x - width],
        y: [y, y + height],
      };
    } else {
      this.boundaries = {
        x: [x, x + width],
        y: [y, y + height],
      };
    }
    this.submenuOpen = true;
  };
  _registerSubMenuItems = () => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.submenuList = this.childElements?.map((item) => {
            return item.shadowRoot?.querySelector('li');
          });
        }
      }
    });
    observer.observe(this.shadowRoot as Node, {
      childList: true,
      subtree: true,
    });
  };
  _closeSubmenu = () => {
    this.boundaries = {
      x: -1,
      y: -1,
    };
    this.submenuOpen = false;
    (
      this.shadowRoot?.querySelector('.cds--menu-item') as HTMLLIElement
    )?.focus();
  };
  _handleKeyDown = (e: KeyboardEvent) => {
    if (this.hasChildren && e.key === 'ArrowRight') {
      this._openSubmenu();
      setTimeout(() => {
        this.submenuList[0].focus();
      });
      e.stopPropagation();
    }
    if (e.key === 'Enter' || e.key === 'Space') {
      this._handleClick(e);
    }
  };

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}
export default CDSmenuItem;
