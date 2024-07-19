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
import styles from './textarea.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of text area.
 *
 * @element cds-textarea-skeleton
 *
 * @csspart label - The label. Usage `cds-textarea-skeleton::part(label)`
 * @csspart textarea - The textarea. Usage `cds-textarea-skeleton::part(textarea)`
 */
@customElement(`${prefix}-textarea-skeleton`)
class CDSTextareaSkeleton extends LitElement {
  render() {
    return html`
      <span class="${prefix}--label ${prefix}--skeleton" part="label"></span>
      <div
        class="${prefix}--skeleton ${prefix}--text-area"
        part="textarea"></div>
    `;
  }

  static styles = styles;
}

export default CDSTextareaSkeleton;
