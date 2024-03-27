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
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

// type StateType = {
//   isRoot: boolean;
//   mode: 'full' | 'basic';
//   hasIcons: boolean;
//   size: 'xs' | 'sm' | 'md' | 'lg' | null;
//   items: any[];
//   requestCloseRoot: (e: Pick<KeyboardEvent, 'type'>) => void;
// };

// const state: StateType = {
//   isRoot: true,
//   mode: 'full',
//   hasIcons: false,
//   size: null,
//   items: [],
//   requestCloseRoot: () => {},
// };

@customElement(`${prefix}-menu-item`)
class CDSMenuItem extends HostListenerMixin(LitElement) {
  /**
   * Specify whether the MenuItem is disabled or not.
   */
  @property({ type: Boolean })
  disabled;
  /**
   * Specify whether the sub menu is open or not.
   */
  @property({ type: Boolean })
  submenuOpen = false;

  /**
   * Specify boundaries.
   */
  @property()
  boundaries = {
    x: -1 as number | [number, number],
    y: -1 as number | [number, number],
  };

  /**
   * Specify the kind of the MenuItem.
   */
  kind?: 'default' | 'danger';

  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: String })
  label;

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onClick?: (event: KeyboardEvent | MouseEvent) => void;

  /**
   * Provide an optional function to be called when the typed.
   */
  onKeyDown?: (event: KeyboardEvent) => void;

  /**
   * Provide a shortcut for the action of this MenuItem. Note that the component will only render it as a hint but not actually register the shortcut.
   */
  @property({ type: String })
  shortcut;

  /**
   * Specify whether the MenuItem is disabled or not.
   */
  @property({ type: Boolean })
  isDisabled;

  /**
   * Specify whether the MenuItem has Children or not.
   */
  @property({ type: Boolean })
  hasChildren;

  hoverIntentTimeout;
  isRtl;
  readonly hoverIntentDelay = 150; // in ms

  _registerItem() {}
  _openSubmenu() {
    const { isRtl, hasChildren, _setBoundaries: setBoundaries } = this;
    if (!hasChildren) {
      return;
    }
    const x = this.offsetTop;
    const y = this.offsetLeft;
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    if (isRtl) {
      setBoundaries([-x, x - width], [y, y + height]);
    } else {
      setBoundaries([x, x + width], [y, y + height]);
    }
    this.submenuOpen = true;
  }
  _closeSubmenu() {
    const { _setBoundaries: setBoundaries } = this;
    this.submenuOpen = false;
    setBoundaries(-1, -1);
  }
  _setBoundaries(x: number | [number, number], y: number | [number, number]) {
    this.boundaries = {
      x,
      y,
    };
  }
  _handleClick(e: KeyboardEvent | MouseEvent) {
    const {
      isDisabled,
      hasChildren,
      _openSubmenu: openSubmenu,
      onClick,
    } = this;
    if (!isDisabled) {
      if (hasChildren) {
        openSubmenu();
      } else {
        if (onClick) {
          onClick(e);
        }
      }
    }
  }
  _handleMouseEnter() {
    const { hoverIntentDelay, _openSubmenu: openSubmenu } = this;
    this.hoverIntentTimeout = setTimeout(() => {
      openSubmenu();
    }, hoverIntentDelay);
  }
  _handleMouseLeave() {
    const { _closeSubmenu: closeSubmenu } = this;
    if (this.hoverIntentTimeout) {
      clearTimeout(this.hoverIntentTimeout);
      closeSubmenu();
    }
  }
  _handleKeyDown(e: KeyboardEvent) {
    const {
      hasChildren,
      _openSubmenu: openSubmenu,
      _handleClick: handleClick,
      onKeyDown,
    } = this;
    if (hasChildren && e.key === 'ArrowRight') {
      openSubmenu();
      e.stopPropagation();
    }
    if (e.key === 'Enter' || e.key === 'Space') {
      handleClick(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  firstUpdated() {
    const { disabled, hasChildren } = this;
    this.hasChildren = this.childNodes.length > 1;
    this.isDisabled = disabled && !hasChildren;
    this.isRtl = getComputedStyle(this).direction === 'rtl';
  }
  updated() {}
  render() {
    // console.log(menuContext,'menuContext');

    const {
      kind,
      submenuOpen,
      // _myData: myData,
      _handleClick: handleClick,
      _handleMouseEnter: handleMouseEnter,
      _handleMouseLeave: handleMouseLeave,
      _handleKeyDown: handleKeyDown,
      _closeSubmenu: closeSubmenu,
      shortcut,
      label,
      boundaries,
      isDisabled,
      hasChildren,
      // role,
    } = this;
    // console.log(myData,'myData');

    // const iconsAllowed =
    // state.mode === 'basic' ||
    //   role === 'menuitemcheckbox' ||
    //   role === 'menuitemradio';
    const isDanger = kind === 'danger' && !hasChildren;
    const classNames = classMap({
      [`${prefix}--menu-item--disabled`]: isDisabled,
      [`${prefix}--menu-item--danger`]: isDanger,
    });
    const isRtl = true;
    return html`
      <li
        role="menuitem"
        class="${classNames}"
        tabindex="-1"
        aria-disabled="${isDisabled ?? undefined}"
        aria-haspopup="${hasChildren ?? undefined}"
        aria-expanded="${hasChildren ? submenuOpen : undefined}"
        @click="${handleClick}"
        @mouseEnter="${hasChildren ? handleMouseEnter : undefined}"
        @mouseLeave="${hasChildren ? handleMouseLeave : undefined}"
        @keyDown="${handleKeyDown}">
        <div className="${prefix}--menu-item__label" title="${label}">
          ${label}
        </div>
        ${shortcut &&
        !hasChildren &&
        html`<div className="${prefix}--menu-item__shortcut">${shortcut}</div>`}
        ${hasChildren &&
        html`
          <div className="${prefix}--menu-item__shortcut">
            ${isRtl
              ? html`${CaretRight16({ slot: 'icon' })}`
              : html`${CaretLeft16({ slot: 'icon' })}`}
          </div>
          <cds-menu
            label="${label}"
            open="${submenuOpen}"
            onClose="${() => {
              closeSubmenu();
            }}"
            x="${boundaries.x}"
            y="${boundaries.y}">
            <slot></slot>
          </cds-menu>
        `}
      </li>
    `;
  }
}
export default CDSMenuItem;
