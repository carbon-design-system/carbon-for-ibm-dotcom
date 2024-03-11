/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import CaretLeft16 from '@carbon/icons/lib/caret--left/16';
import CaretRight16 from '@carbon/icons/lib/caret--right/16';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './menu.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { string } from 'prop-types';
import { boolean } from '@storybook/addon-knobs';

enum kinds {
  'default',
  'danger',
}
/**
 * Menu Item.
 *
 * @element cds-menu-item
 * @csspart dialog The dialog.
 */
@customElement(`${prefix}-menu-item`)
class CDSMenuItem extends HostListenerMixin(LitElement) {
  /**
   * A collection of MenuItems to be rendered within this Menu.
   */
  @property({ type: HTMLElement })
  children;

  /**
   * Additional CSS class names.
   */
  @property({ type: string })
  className;

  /**
   * Specify whether the MenuItem is disabled or not.
   */
  @property({ type: boolean })
  disabled;

  /**
   * Specify the kind of the MenuItem.
   */
  @property({ type: kinds })
  kind;

  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: string })
  label;
  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: boolean })
  hasChildren;
  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: boolean })
  isDisabled;
  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: boolean })
  isDanger;
  /**
   * sub menu is open.
   */
  @property({ type: boolean })
  submenuOpen = false;
  /**
   * sub menu is open.
   */
  @property({ type: string })
  shortcut;
  /**
   * sub menu is open.
   */
  @property()
  boundaries = {
    x: -1 as number | [number, number],
    y: -1 as number | [number, number],
  };

  hoverIntentDelay = 150;
  hoverIntentTimeout;
  _handleClick() {
    if (!this.isDisabled) {
      if (this.hasChildren) {
        this._openSubMenu();
      }
    }
  }
  _openSubMenu() {
    const { x, y, width, height } = this.getBoundingClientRect();
    const isRtl = getComputedStyle(this).direction === 'rtl';
    if (isRtl) {
      this.boundaries.x = [-x, x - width];
      this.boundaries.y = [y, y + height];
    } else {
      this.boundaries.x = [x, x + width];
      this.boundaries.y = [y, y + height];
    }
    this.submenuOpen = true;
  }
  _closeSubmenu() {
    this.submenuOpen = false;
    this.boundaries.x = -1;
    this.boundaries.y = -1;
  }
  _handleMouseEnter() {
    this.hoverIntentTimeout = setTimeout(() => {
      this._openSubMenu();
    }, this.hoverIntentDelay);
  }

  _handleMouseLeave() {
    if (this.hoverIntentTimeout) {
      clearTimeout(this.hoverIntentTimeout);
      this._closeSubmenu();
      this.focus();
    }
  }
  _handleKeyDown(e: KeyboardEvent) {

    if (this.hasChildren && e.key === 'ArrowRight') {
      this._openSubMenu();
      e.stopPropagation();
    }

    if (e.key === 'Enter' || e.key === ' ') {
      this._handleClick();
    }

    // if (rest.onKeyDown) {
    //   rest.onKeyDown(e);
    // }
  }

  updated() {
    this.hasChildren = this.childNodes.length > 1;
    this.isDisabled = this.disabled && !this.hasChildren;
    this.isDanger = this.kind === 'danger' && !this.hasChildren;
  }

  // firstUpdated() {
  //   this.staticNode = this.renderRoot.querySelector('#static-node');
  // }
  render() {
    const {
      isDisabled,
      isDanger,
      submenuOpen,
      hasChildren,
      shortcut,
      label,
      boundaries,
      _handleMouseEnter: handleMouseEnter,
      _handleMouseLeave: handleMouseLeave,
      _handleKeyDown: handleKeyDown,
      _handleClick: handleClick,
      _closeSubmenu: closeSubmenu,
    } = this;
    const classes = classMap({
      [`${prefix}--menu-item--disabled`]: isDisabled,
      [`${prefix}--menu-item--danger`]: isDanger,
    });
    const isRtl = getComputedStyle(this).direction === 'rtl';
    return html`
      <li
        role="menuitem"
        class="${classes}"
        tabindex="-1"
        aria-disabled="${isDisabled ?? undefined}"
        aria-expanded=${hasChildren ? submenuOpen : undefined}
        @click=${handleClick}
        @mouseenter=${hasChildren ? handleMouseEnter : undefined}
        @mouseleave=${hasChildren ? handleMouseLeave : undefined}
        @keydown="${handleKeyDown}">
        <Text as="div" class="${prefix}--menu-item__label" title="${label}">
          ${label}
        </Text>
        ${shortcut &&
        !hasChildren &&
        html`<div class="${prefix}--menu-item__shortcut">${shortcut}</div>`}
        ${hasChildren &&
        html`<div class="${prefix}--menu-item__shortcut">
            ${isRtl
              ? html`${CaretRight16({ slot: 'icon' })}`
              : html`${CaretLeft16({ slot: 'icon' })}`}
          </div>
          <menu
            label="${label}"
            open="${submenuOpen}"
            close="${closeSubmenu}"
            x=${boundaries.x}
            y=${boundaries.y}>
            <slot></slot>
          </menu> `}
      </li>
    `;
  }
  static styles = styles; 
}

export default CDSMenuItem;
