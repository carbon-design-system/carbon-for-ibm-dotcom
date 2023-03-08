/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './tabs.scss';

/**
 * Skeleton of tab.
 */
@customElement(`${prefix}-tab-skeleton`)
class BXTabSkeleton extends LitElement {
  render() {
    return html` <div class="${prefix}--tabs__nav-link"></div> `;
  }

  static styles = styles;
}

export default BXTabSkeleton;
