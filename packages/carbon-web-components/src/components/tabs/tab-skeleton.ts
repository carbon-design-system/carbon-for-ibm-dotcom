/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './tabs.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of tab.
 * @element cds-tab-skeleton
 *
 * @csspart nav-link - The tabs navigation links. Usage `cds-tab-skeleton::part(nav-link)`
 */
@customElement(`${prefix}-tab-skeleton`)
export default class CDSTabSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--tabs__nav-link" part="nav-link"></div>
    `;
  }

  static styles = styles;
}
