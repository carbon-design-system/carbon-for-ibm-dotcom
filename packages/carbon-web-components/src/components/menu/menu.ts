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
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './menu.scss';
import { selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { string } from 'prop-types';
import { boolean } from '@storybook/addon-knobs';

enum modes {
  'full',
  'basic',
}
enum sizes {
  'xs',
  'sm',
  'md',
  'lg',
}
/**
 * Menu.
 *
 * @element cds-menu
 * @csspart dialog The dialog.
 */
@customElement(`${prefix}-menu`)
class CDSMenu extends HostListenerMixin(LitElement) {
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
   * A label describing the Menu.
   */
  @property({ type: string })
  label;

  /**
   * Specify how the menu should align with the button element
   */
  @property({ type: string })
  menuAlignment;

  /**
   * The mode of this menu. Defaults to full.
   * `full` supports nesting and selectable menu items, but no icons.
   * `basic` supports icons but no nesting or selectable menu items.
   *
   * **This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).**
   */
  @property({ type: modes })
  mode;

  /**
   * Whether the Menu is open or not.
   */
  @property({ type: boolean })
  open;

  /**
   * Specify the size of the Menu.
   */
  @property({ type: sizes })
  size;

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  @property({ type: HTMLElement })
  target;

  /**
   * Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2])
   */
  private x?: number | [number, number];

  /**
   * Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])
   */
  private y?: number | [number, number];

  render() {
    return html`
      <h1>Menu</h1>
      <slot></slot>
    `;
  }
}

export default CDSMenu;
