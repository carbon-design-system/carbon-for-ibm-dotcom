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
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import Checkmark16 from '@carbon/icons/lib/checkmark/16';
import { ChangeEventHandler } from 'react';

@customElement(`${prefix}-menu-item-selectable`)
class CDSMenuItemSelectable extends HostListenerMixin(LitElement) {
  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */

  @property({ type: String })
  label;
  /**
   * Indicates whether th eitem is checked or not.
   */
  @property({ type: Boolean })
  checked;
  /**
   * checks whether th eitem is selected or not.
   */
  @property({ type: Boolean })
  selected;
  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onChange?: (event: ChangeEventHandler) => void;

  _handleClick(e) {
    const { onChange } = this;
    this.checked = !this.checked;
    if (onChange) {
      onChange(e);
    }
  }

  firstUpdated() {
    this.checked = this.selected;
  }

  render() {
    const { label, checked, _handleClick: handleClick } = this;
    // if (context.state.mode === 'basic') {
    //     warning(
    //       false,
    //       'MenuItemSelectable is not supported when the menu is in "basic" mode.'
    //     );
    //   }

    return html`
      <cds-menu-item
        label="${label}"
        class="${prefix}--menu-item-selectable--selected"
        role="menuitemcheckbox"
        aria-checked="${checked}"
        renderIcon="${checked
          ? Checkmark16({
              part: 'selected-icon',
              class: `${prefix}--list-box__menu-item__selected-icon`,
            })
          : undefined}
          "
        @click="${handleClick}">
      </cds-menu-item>
    `;
  }
}
export default CDSMenuItemSelectable;
