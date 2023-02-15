/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { classMap } from 'lit-html/directives/class-map';
import {
  html,
  svg,
  property,
  query,
  customElement,
  LitElement,
} from 'lit-element';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import CheckboxCheckedFilled16 from '@carbon/icons/lib/checkbox--checked--filled/16';

import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';

/**
 * Multi-selectable tile.
 *
 * @element cds-selectable-tile
 */
@customElement(`${prefix}-selectable-tile`)
class BXSelectableTile extends FocusMixin(LitElement) {
  @query('input')
  protected _inputNode!: HTMLInputElement;

  /**
   * The `type` attribute of the `<input>`.
   */
  protected _inputType = 'checkbox';

  /**
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    this.selected = this._inputNode.checked;
  }

  /**
   * Handles the rendering of the icon.
   */
  protected _renderIcon() {
    const { selected, checkmarkLabel } = this;

    return html` ${selected
      ? CheckboxCheckedFilled16({
          children: !checkmarkLabel
            ? undefined
            : svg`<title>${checkmarkLabel}</title>`,
        })
      : Checkbox16({
          children: !checkmarkLabel
            ? undefined
            : svg`<title>${checkmarkLabel}</title>`,
        })}`;
  }

  /**
   * The a11y text for the checkmark icon of the selected state.
   */
  @property({ attribute: 'checkmark-label' })
  checkmarkLabel!: string;

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  /**
   * The form name.
   */
  @property()
  name!: string;

  /**
   * `true` to show the selected state.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The form value.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const {
      colorScheme,
      name,
      selected,
      value,
      _inputType: inputType,
      _handleChange: handleChange,
    } = this;
    const classes = classMap({
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--selectable`]: true,
      [`${prefix}--tile--is-selected`]: selected,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
    });
    return html`
      <input
        type="${inputType}"
        id="input"
        class="${prefix}--tile-input"
        tabindex="-1"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        .checked=${selected}
        @change=${handleChange} />
      <label for="input" class="${classes}" tabindex="0">
        <div
          class="${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent">
          ${this._renderIcon()}
        </div>
        <div class="${prefix}--tile-content"><slot></slot></div>
      </label>
    `;
  }

  static styles = styles;
}

export default BXSelectableTile;
