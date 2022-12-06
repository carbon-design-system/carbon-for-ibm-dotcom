/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import { INPUT_SIZE } from '../input/input';
import styles from './search.scss';

const { prefix } = settings;

/**
 * Skeleton of search.
 */
@customElement(`${prefix}-search-skeleton`)
class BXSearchSkeleton extends LitElement {
  /**
   * The search box size. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.REGULAR;

  render() {
    return html`
      <span class="${prefix}--label"></span>
      <div class="${prefix}--search-input"></div>
    `;
  }

  static styles = styles;
}

export default BXSearchSkeleton;
