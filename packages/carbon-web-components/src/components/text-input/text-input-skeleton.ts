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
import styles from './text-input.scss';

/**
 * Skeleton of number input.
 * @csspart label - The text input label. Usage: `cds-text-input::part(label)`
 * @csspart input - The text input. Usage: `cds-text-input::part(input)`
 */
@customElement(`${prefix}-text-input-skeleton`)
class CDSTextInputSkeleton extends LitElement {
  /**
   * Specify whether the label should be hidden, or not
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
      <div part="input" class="${prefix}--text-input ${prefix}--skeleton"></div>
    `;
  }

  static styles = styles;
}

export default CDSTextInputSkeleton;
