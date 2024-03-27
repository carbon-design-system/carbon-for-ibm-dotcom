/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

@customElement(`${prefix}-menu-item`)
class CDMenuItemDivider extends HostListenerMixin(LitElement) {
  render() {
    return html`
      <li class="${prefix}--menu-item-divider" role="separator"></li>
    `;
  }
}
export default CDMenuItemDivider;
