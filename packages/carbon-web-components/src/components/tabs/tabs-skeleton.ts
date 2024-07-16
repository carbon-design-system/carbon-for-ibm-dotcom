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
 * Skeleton of tabs.
 * @element cds-tabs-skeleton
 *
 * @csspart trigger - The tabs skeleton trigger. Usage `cds-tabs-skeleton::part(trigger)`
 * @csspart trigger-text - The tabs skeleton trigger text. Usage `cds-tabs-skeleton::part(trigger-text)`
 * @csspart nav - The tabs skeleton navigation. Usage `cds-tabs-skeleton::part(nav)`
 */
@customElement(`${prefix}-tabs-skeleton`)
export default class CDSTabsSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--tabs-trigger" part="trigger">
        <span class="${prefix}--tabs-trigger-text" part="trigger-text"></span>
      </div>
      <ul class="${prefix}--tabs__nav" part="nav">
        <slot></slot>
      </ul>
    `;
  }

  static styles = styles;
}
