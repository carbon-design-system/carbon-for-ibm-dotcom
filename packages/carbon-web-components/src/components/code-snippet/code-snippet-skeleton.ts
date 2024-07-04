/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { CODE_SNIPPET_TYPE } from './code-snippet';
import styles from './code-snippet.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of code snippet.
 * @element cds-code-snippet-skeleton
 * @csspart container - The container. Usage: `cds-code-snippet-skeleton::part(container)`
 * @csspart item - The item. Usage: `cds-code-snippet-skeleton::part(item)`
 */
@customElement(`${prefix}-code-snippet-skeleton`)
class CDSCodeSnippetSkeleton extends LitElement {
  /**
   * The type of code snippet. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  type = CODE_SNIPPET_TYPE.SINGLE;

  render() {
    return html`
      <div class="${prefix}--snippet-container" part="container">
        ${this.type !== CODE_SNIPPET_TYPE.MULTI
          ? html` <span part="item"></span> `
          : html`
              <span part="item"></span><span part="item"></span
              ><span part="item"></span>
            `}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSCodeSnippetSkeleton;
