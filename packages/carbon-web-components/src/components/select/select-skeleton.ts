/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './select.scss';

/**
 * Skeleton of number input.
 * @csspart label - The label skeleton. Usage `cds-select-skeleton::part(label)`
 * @csspart select - The select skeleton. Usage `cds-select-skeleton::part(select)`
 */
@customElement(`${prefix}-select-skeleton`)
class CDSSelectSkeleton extends LitElement {
  /**
   * `true` if the label should be hidden. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  render() {
    const { hideLabel } = this;
    return html`
      ${!hideLabel &&
      html`
        <span part="label" class="${prefix}--label ${prefix}--skeleton"></span>
      `}
      <div part="select" class="${prefix}--select ${prefix}--skeleton"></div>
    `;
  }

  static styles = styles;
}

export default CDSSelectSkeleton;
