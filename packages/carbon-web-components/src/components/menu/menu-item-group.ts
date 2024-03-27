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

@customElement(`${prefix}-menu-item-group`)
class CDSMenuItemGroup extends HostListenerMixin(LitElement) {
  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: String })
  label;

  render() {
    const { label } = this;
    return html`
      <li class="${prefix}--menu-item-group" role="none">
        <ul role="group" aria-label="${label}">
          <slot></slot>
        </ul>
      </li>
    `;
  }
}
export default CDSMenuItemGroup;
